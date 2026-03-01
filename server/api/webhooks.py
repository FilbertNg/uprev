"""
Xendit webhook listener (Invoices API).
Validates the Callback Verification Token and updates transaction + thread status.
"""

from __future__ import annotations

import logging
import uuid as _uuid

from fastapi import APIRouter, Header, HTTPException, Request
from sqlalchemy import select, update

from core.config import settings
from db.database import async_session_factory
from db.models import ChatThread, Transaction, TransactionStatus

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/webhooks/xendit")
async def xendit_webhook(
    request: Request,
    x_callback_token: str = Header(None, alias="x-callback-token"),
):
    """Receive Xendit Invoices API payment callbacks.

    Expected payload (Invoices API):
        { "external_id": "<our transaction UUID>", "status": "PAID", ... }
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

    external_id = body.get("external_id")  # Our transaction UUID
    status_raw = body.get("status", "").upper()

    if not external_id:
        raise HTTPException(status_code=400, detail="Missing external_id")

    # Validate UUID
    try:
        tx_uuid = _uuid.UUID(external_id)
    except ValueError:
        logger.warning("Invalid UUID in external_id: %s", external_id)
        raise HTTPException(status_code=400, detail="Invalid external_id (not a valid UUID)")

    # Map Xendit Invoices statuses
    if status_raw in ("PAID", "SETTLED"):
        new_status = TransactionStatus.PAID
    elif status_raw in ("EXPIRED", "FAILED"):
        new_status = TransactionStatus.FAILED
    else:
        logger.info("Xendit webhook unknown status '%s' for %s", status_raw, external_id)
        return {"status": "ignored"}

    # ── 3. Update transaction ────────────────────────────────────────────────
    try:
        async with async_session_factory() as session:
            result = await session.execute(
                select(Transaction).where(Transaction.id == tx_uuid)
            )
            tx = result.scalar_one_or_none()
            if not tx:
                logger.warning("Transaction not found for external_id=%s", external_id)
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
                external_id,
                new_status.value,
            )

    except HTTPException:
        raise
    except Exception as e:
        logger.error("Webhook processing failed: %s", e)
        raise HTTPException(status_code=500, detail="Webhook processing failed")

    return {"status": "ok"}
