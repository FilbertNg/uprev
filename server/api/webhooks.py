"""
Xendit webhook listener.
Validates the Callback Verification Token and updates transaction + thread status.

Supports both Xendit webhook formats:
  - New (Payment Request API): event at top level, data nested under `data`
  - Legacy (Invoices API): `external_id` and `status` at top level
"""

from __future__ import annotations

import logging

from fastapi import APIRouter, Header, HTTPException, Request
from sqlalchemy import select, update

from core.config import settings
from db.database import async_session_factory
from db.models import ChatThread, Transaction, TransactionStatus

logger = logging.getLogger(__name__)
router = APIRouter()


def _parse_webhook_body(body: dict) -> tuple[str | None, str | None]:
    """Extract (reference_id, status) from either Xendit webhook format.

    New format (Payment Request API):
        { "event": "payment.succeeded", "data": { "reference_id": "...", "status": "SUCCEEDED" } }

    Legacy format (Invoices API):
        { "external_id": "...", "status": "PAID" }

    Returns:
        (reference_id, status_string) — either may be None if not found.
    """
    # ── New format: top-level `event` + nested `data` ────────────────────
    if "event" in body and "data" in body:
        data = body["data"]
        reference_id = data.get("reference_id")
        status = data.get("status", "").upper()
        return reference_id, status

    # ── Legacy format: top-level `external_id` + `status` ────────────────
    external_id = body.get("external_id")
    status = body.get("status", "").upper()
    return external_id, status


@router.post("/webhooks/xendit")
async def xendit_webhook(
    request: Request,
    x_callback_token: str = Header(None, alias="x-callback-token"),
):
    """Receive Xendit payment status callbacks.

    Security: validates `x-callback-token` header against our stored verification token.
    """
    # ── 1. Verify callback token ─────────────────────────────────────────────
    if x_callback_token != settings.XENDIT_WEBHOOK_VERIFICATION_TOKEN:
        logger.warning("Invalid Xendit callback token received")
        raise HTTPException(status_code=403, detail="Invalid callback token")

    # ── 2. Parse payload ─────────────────────────────────────────────────────
    try:
        body = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON body")

    reference_id, status_raw = _parse_webhook_body(body)

    if not reference_id:
        raise HTTPException(status_code=400, detail="Missing reference_id / external_id")

    # Map Xendit statuses (covers both old and new formats)
    if status_raw in ("PAID", "SETTLED", "SUCCEEDED"):
        new_status = TransactionStatus.PAID
    elif status_raw in ("EXPIRED", "FAILED"):
        new_status = TransactionStatus.FAILED
    else:
        # Unknown status – log but acknowledge
        logger.info("Xendit webhook unknown status '%s' for %s", status_raw, reference_id)
        return {"status": "ignored"}

    # ── 3. Update transaction ────────────────────────────────────────────────
    try:
        async with async_session_factory() as session:
            result = await session.execute(
                select(Transaction).where(Transaction.id == reference_id)
            )
            tx = result.scalar_one_or_none()
            if not tx:
                logger.warning("Transaction not found for reference_id=%s", reference_id)
                raise HTTPException(status_code=404, detail="Transaction not found")

            tx.status = new_status

            # If PAID, mark the related chat thread as payment_successful
            if new_status == TransactionStatus.PAID and tx.customer_id:
                await session.execute(
                    update(ChatThread)
                    .where(ChatThread.customer_id == tx.customer_id)
                    .values(payment_successful=True)
                )

            await session.commit()
            logger.info(
                "Transaction %s updated to %s via Xendit webhook",
                reference_id,
                new_status.value,
            )

    except HTTPException:
        raise
    except Exception as e:
        logger.error("Webhook processing failed: %s", e)
        raise HTTPException(status_code=500, detail="Webhook processing failed")

    return {"status": "ok"}
