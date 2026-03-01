"""
API routes for managing transactions.
"""

from __future__ import annotations

import logging
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from db.database import get_db
from db.models import Transaction, TransactionStatus
from db.schemas import TransactionCreate, TransactionResponse

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/transactions", response_model=TransactionResponse, status_code=201)
async def create_transaction(
    payload: TransactionCreate,
    db: AsyncSession = Depends(get_db),
):
    """Manually add a transaction record."""
    try:
        tx = Transaction(
            customer_id=payload.customer_id,
            package_id=payload.package_id,
            xendit_invoice_id=payload.xendit_invoice_id,
            status=TransactionStatus(payload.status),
            amount=payload.amount,
        )
        db.add(tx)
        await db.flush()
        await db.refresh(tx)
        return tx
    except ValueError as e:
        raise HTTPException(status_code=422, detail=f"Invalid status value: {e}")
    except Exception as e:
        logger.error("Failed to create transaction: %s", e)
        raise HTTPException(status_code=500, detail="Failed to create transaction")


@router.get("/transactions", response_model=list[TransactionResponse])
async def list_transactions(db: AsyncSession = Depends(get_db)):
    """List all transactions."""
    try:
        result = await db.execute(select(Transaction))
        return result.scalars().all()
    except Exception as e:
        logger.error("Failed to list transactions: %s", e)
        raise HTTPException(status_code=500, detail="Failed to list transactions")


@router.get("/transactions/{transaction_id}", response_model=TransactionResponse)
async def get_transaction(
    transaction_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get a single transaction by ID."""
    try:
        result = await db.execute(
            select(Transaction).where(Transaction.id == transaction_id)
        )
        tx = result.scalar_one_or_none()
        if not tx:
            raise HTTPException(status_code=404, detail="Transaction not found")
        return tx
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to get transaction: %s", e)
        raise HTTPException(status_code=500, detail="Failed to get transaction")
