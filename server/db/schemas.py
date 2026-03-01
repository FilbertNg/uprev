"""
Pydantic schemas for request / response validation.
"""

from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, Field


# ── Packages ─────────────────────────────────────────────────────────────────

class PackageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: str = ""
    build_price: str = "0"
    maintenance_price: str = "0"
    migration_price: str = "0"
    best_for: list[str] = []
    selling_sentences: list[str] = []


class PackageResponse(BaseModel):
    id: uuid.UUID
    name: str
    description: str
    build_price: str
    maintenance_price: str
    migration_price: str
    best_for: list[str]
    selling_sentences: list[str]

    model_config = {"from_attributes": True}


# ── Add-ons ──────────────────────────────────────────────────────────────────

class AddOnCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: str = ""
    build_price: str = "0"
    maintenance_price: str = "0"
    migration_price: str = "0"
    best_for: list[str] = []
    selling_sentences: list[str] = []


class AddOnResponse(BaseModel):
    id: uuid.UUID
    name: str
    description: str
    build_price: str
    maintenance_price: str
    migration_price: str
    best_for: list[str]
    selling_sentences: list[str]

    model_config = {"from_attributes": True}


# ── Transactions ─────────────────────────────────────────────────────────────

class TransactionCreate(BaseModel):
    customer_id: uuid.UUID | None = None
    package_id: uuid.UUID | None = None
    xendit_invoice_id: str | None = None
    status: str = "PENDING"
    amount: float = Field(..., gt=0)
    addons: list[dict] = []  # e.g. [{"name": "AI Concierge", "price": 3500000}]


class TransactionResponse(BaseModel):
    id: uuid.UUID
    customer_id: uuid.UUID | None
    package_id: uuid.UUID | None
    xendit_invoice_id: str | None
    status: str
    amount: float
    addons: list[dict]
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Chat ─────────────────────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
    template_key: str | None = None  # Optional frontend button template


class ChatResponse(BaseModel):
    reply: str
    thread_id: str


# ── Customers ────────────────────────────────────────────────────────────────

class CustomerResponse(BaseModel):
    id: uuid.UUID
    name: str | None
    email: str | None
    phone: str | None
    preferences: dict

    model_config = {"from_attributes": True}
