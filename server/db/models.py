"""
SQLAlchemy ORM models for the UpRev database.

Tables:
  - uprev_packages  (with pgvector embedding)
  - add_ons         (with pgvector embedding)
  - customers
  - chat_threads
  - transactions
  - company_context (RAG chunks from context.txt)
"""

import enum
import uuid
from datetime import datetime, timezone

from pgvector.sqlalchemy import Vector
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import DeclarativeBase, relationship


class Base(DeclarativeBase):
    """Shared declarative base for all models."""
    pass


# ── Enums ────────────────────────────────────────────────────────────────────

class TransactionStatus(str, enum.Enum):
    PENDING = "PENDING"
    PAID = "PAID"
    FAILED = "FAILED"


# ── Models ───────────────────────────────────────────────────────────────────

class UpRevPackage(Base):
    __tablename__ = "uprev_packages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False, default="")
    build_price = Column(String(100), nullable=False, default="0")
    maintenance_price = Column(String(100), nullable=False, default="0")
    migration_price = Column(String(100), nullable=False, default="0")
    best_for = Column(ARRAY(String), nullable=False, default=list)
    selling_sentences = Column(ARRAY(String), nullable=False, default=list)
    embedding = Column(Vector(1536), nullable=True)  # text-embedding-3-small

    # Relationships
    transactions = relationship("Transaction", back_populates="package")

    def __repr__(self) -> str:
        return f"<UpRevPackage {self.name}>"


class UpRevAddOn(Base):
    __tablename__ = "add_ons"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False, default="")
    build_price = Column(String(100), nullable=False, default="0")
    maintenance_price = Column(String(100), nullable=False, default="0")
    migration_price = Column(String(100), nullable=False, default="0")
    best_for = Column(ARRAY(String), nullable=False, default=list)
    selling_sentences = Column(ARRAY(String), nullable=False, default=list)
    embedding = Column(Vector(1536), nullable=True)  # text-embedding-3-small

    def __repr__(self) -> str:
        return f"<UpRevAddOn {self.name}>"


class Customer(Base):
    __tablename__ = "customers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    preferences = Column(JSONB, nullable=False, default=dict)
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    chat_threads = relationship("ChatThread", back_populates="customer")
    transactions = relationship("Transaction", back_populates="customer")

    def __repr__(self) -> str:
        return f"<Customer {self.name}>"


class ChatThread(Base):
    __tablename__ = "chat_threads"

    thread_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    customer_id = Column(
        UUID(as_uuid=True), ForeignKey("customers.id"), nullable=True
    )
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    payment_successful = Column(Boolean, nullable=False, default=False)

    # Relationships
    customer = relationship("Customer", back_populates="chat_threads")

    def __repr__(self) -> str:
        return f"<ChatThread {self.thread_id}>"


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    customer_id = Column(
        UUID(as_uuid=True), ForeignKey("customers.id"), nullable=True
    )
    package_id = Column(
        UUID(as_uuid=True), ForeignKey("uprev_packages.id"), nullable=True
    )
    xendit_invoice_id = Column(String(255), nullable=True)
    status = Column(
        Enum(TransactionStatus),
        nullable=False,
        default=TransactionStatus.PENDING,
    )
    amount = Column(Float, nullable=False, default=0.0)
    addons = Column(JSONB, nullable=False, default=list)  # e.g. [{"name": "AI Concierge", "price": 3500000}]
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    customer = relationship("Customer", back_populates="transactions")
    package = relationship("UpRevPackage", back_populates="transactions")

    def __repr__(self) -> str:
        return f"<Transaction {self.id} status={self.status}>"


class CompanyContext(Base):
    """Chunked knowledge from context.txt for RAG retrieval."""
    __tablename__ = "company_context"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    content = Column(Text, nullable=False)
    embedding = Column(Vector(1536), nullable=True)  # text-embedding-3-small
