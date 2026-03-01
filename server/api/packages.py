"""
API routes for managing UpRev packages.
"""

from __future__ import annotations

import logging
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from db.database import get_db
from db.models import UpRevPackage
from db.schemas import PackageCreate, PackageResponse

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/packages", response_model=PackageResponse, status_code=201)
async def create_package(
    payload: PackageCreate,
    db: AsyncSession = Depends(get_db),
):
    """Add a new package to the uprev_packages table."""
    try:
        package = UpRevPackage(
            name=payload.name,
            description=payload.description,
            build_price=payload.build_price,
            maintenance_price=payload.maintenance_price,
            migration_price=payload.migration_price,
            best_for=payload.best_for,
            upselling_sentences=payload.upselling_sentences,
        )
        db.add(package)
        await db.flush()
        await db.refresh(package)
        return package
    except Exception as e:
        logger.error("Failed to create package: %s", e)
        raise HTTPException(status_code=500, detail="Failed to create package")


@router.get("/packages", response_model=list[PackageResponse])
async def list_packages(db: AsyncSession = Depends(get_db)):
    """List all packages."""
    try:
        result = await db.execute(select(UpRevPackage))
        return result.scalars().all()
    except Exception as e:
        logger.error("Failed to list packages: %s", e)
        raise HTTPException(status_code=500, detail="Failed to list packages")


@router.get("/packages/{package_id}", response_model=PackageResponse)
async def get_package(package_id: UUID, db: AsyncSession = Depends(get_db)):
    """Get a single package by ID."""
    try:
        result = await db.execute(
            select(UpRevPackage).where(UpRevPackage.id == package_id)
        )
        package = result.scalar_one_or_none()
        if not package:
            raise HTTPException(status_code=404, detail="Package not found")
        return package
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to get package: %s", e)
        raise HTTPException(status_code=500, detail="Failed to get package")


@router.delete("/packages/{package_id}", status_code=204)
async def delete_package(package_id: UUID, db: AsyncSession = Depends(get_db)):
    """Delete a package by ID."""
    try:
        result = await db.execute(
            select(UpRevPackage).where(UpRevPackage.id == package_id)
        )
        package = result.scalar_one_or_none()
        if not package:
            raise HTTPException(status_code=404, detail="Package not found")
        await db.delete(package)
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to delete package: %s", e)
        raise HTTPException(status_code=500, detail="Failed to delete package")
