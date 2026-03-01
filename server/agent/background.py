"""
Background tasks:
  1. sync_scratchpad_to_db – writes customer_profile fields into the customers table.
  2. cleanup_expired_threads – APScheduler job to prune unpaid threads older than 24 hours.
"""

from __future__ import annotations

import logging
from datetime import datetime, timedelta, timezone

from sqlalchemy import delete, select, update

from db.database import async_session_factory
from db.models import ChatThread, Customer

logger = logging.getLogger(__name__)


# ── 1. Scratchpad → customers table sync ─────────────────────────────────────

async def sync_scratchpad_to_db(
    thread_id: str,
    customer_profile: dict,
) -> None:
    """Upsert customer_profile fields into the `customers` table.

    If no customer is linked to the thread yet, creates one.
    """
    if not customer_profile:
        return

    try:
        async with async_session_factory() as session:
            # Find or create customer linked to this thread
            result = await session.execute(
                select(ChatThread).where(ChatThread.thread_id == thread_id)
            )
            thread = result.scalar_one_or_none()
            if not thread:
                return

            if thread.customer_id:
                # Update existing customer
                await session.execute(
                    update(Customer)
                    .where(Customer.id == thread.customer_id)
                    .values(
                        name=customer_profile.get("name"),
                        email=customer_profile.get("email"),
                        preferences={
                            "company_name": customer_profile.get("company_name"),
                            "identified_needs": customer_profile.get("identified_needs", []),
                            "budget_range": customer_profile.get("budget_range"),
                            "recommended_package_id": customer_profile.get("recommended_package_id"),
                        },
                    )
                )
            else:
                # Create new customer and link
                customer = Customer(
                    name=customer_profile.get("name"),
                    email=customer_profile.get("email"),
                    preferences={
                        "company_name": customer_profile.get("company_name"),
                        "identified_needs": customer_profile.get("identified_needs", []),
                        "budget_range": customer_profile.get("budget_range"),
                    },
                )
                session.add(customer)
                await session.flush()
                thread.customer_id = customer.id

            await session.commit()
            logger.info("Synced scratchpad for thread %s", thread_id)

    except Exception as e:
        logger.error("sync_scratchpad_to_db failed: %s", e)


# ── 2. 24-Hour TTL Cleanup ──────────────────────────────────────────────────

async def cleanup_expired_threads() -> None:
    """Delete chat_threads older than 24 hours WHERE payment_successful = False."""
    cutoff = datetime.now(timezone.utc) - timedelta(hours=24)
    try:
        async with async_session_factory() as session:
            result = await session.execute(
                delete(ChatThread).where(
                    ChatThread.created_at < cutoff,
                    ChatThread.payment_successful == False,  # noqa: E712
                )
            )
            deleted = result.rowcount
            await session.commit()
            if deleted:
                logger.info("Cleaned up %d expired chat threads", deleted)
    except Exception as e:
        logger.error("cleanup_expired_threads failed: %s", e)
