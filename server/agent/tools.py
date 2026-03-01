"""
AI Tools available to the LangGraph Sales Agent.

Tools:
  1. search_uprev_packages  – pgvector cosine similarity RAG over packages
  2. search_addons          – pgvector cosine similarity RAG over add-ons
  3. get_context            – pgvector RAG over context.txt knowledge base
  4. generate_payment_link  – creates a Xendit invoice on-the-fly
"""

from __future__ import annotations

import logging
import uuid
from datetime import datetime, timezone

import httpx
from langchain_core.tools import tool
from langchain_openai import OpenAIEmbeddings
from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession

from core.config import settings
from db.database import async_session_factory
from db.models import CompanyContext, Transaction, TransactionStatus, UpRevAddOn, UpRevPackage

logger = logging.getLogger(__name__)

# ── Shared Embeddings Client (OpenRouter) ────────────────────────────────────

embeddings_client = OpenAIEmbeddings(
    model="openai/text-embedding-3-small",
    openai_api_key=settings.OPENROUTER_API_KEY,
    openai_api_base="https://openrouter.ai/api/v1",
)


def _format_package(pkg: UpRevPackage) -> str:
    """Format a single package for agent consumption."""
    return (
        f"📦 **{pkg.name}**\n"
        f"   Description: {pkg.description}\n"
        f"   Build Price: {pkg.build_price}\n"
        f"   Maintenance Price: {pkg.maintenance_price}/mo\n"
        f"   Migration Price: {pkg.migration_price}\n"
        f"   Best For: {', '.join(pkg.best_for) if pkg.best_for else 'General'}\n"
        f"   Selling Points: {'; '.join(pkg.selling_sentences) if pkg.selling_sentences else 'N/A'}\n"
    )


def _format_addon(addon: UpRevAddOn) -> str:
    """Format a single add-on for agent consumption."""
    return (
        f"🔌 **{addon.name}**\n"
        f"   Description: {addon.description}\n"
        f"   Build Price: {addon.build_price}\n"
        f"   Maintenance Price: {addon.maintenance_price}\n"
        f"   Best For: {', '.join(addon.best_for) if addon.best_for else 'General'}\n"
        f"   Selling Points: {'; '.join(addon.selling_sentences) if addon.selling_sentences else 'N/A'}\n"
    )


# ── Tool 1: pgvector RAG Search (Packages) ──────────────────────────────────

@tool
async def search_uprev_packages(query: str) -> str:
    """Cari paket website UpRev yang paling cocok dengan kebutuhan klien.

    Selalu mengembalikan 2 paket paling relevan beserta skor kemiripan.
    Kamu yang menentukan apakah hasilnya cocok atau tidak berdasarkan konteks percakapan.

    Args:
        query: Deskripsi kebutuhan klien dalam Bahasa Indonesia, misalnya 'website toko online untuk jualan baju'.

    Returns:
        2 paket teratas berdasarkan relevansi beserta detail lengkap.
    """
    try:
        query_vector = await embeddings_client.aembed_query(query)

        async with async_session_factory() as session:
            result = await session.execute(
                text("""
                    SELECT id, name, description, build_price, maintenance_price,
                           migration_price, best_for, selling_sentences,
                           embedding <=> :query_vec AS distance
                    FROM uprev_packages
                    WHERE embedding IS NOT NULL
                    ORDER BY distance ASC
                    LIMIT 2
                """),
                {"query_vec": str(query_vector)},
            )
            rows = result.fetchall()

            if not rows:
                return "Belum ada paket tersedia di database kami."

            lines = []
            for rank, row in enumerate(rows, 1):
                relevance = 1 - row.distance
                lines.append(
                    f"Rank #{rank} (relevansi: {relevance:.0%})\n"
                    f"ID: {row.id}\n"
                    f"📦 **{row.name}**\n"
                    f"   Deskripsi: {row.description}\n"
                    f"   Harga Pembuatan: {row.build_price}\n"
                    f"   Maintenance: {row.maintenance_price}/bulan\n"
                    f"   Migrasi: {row.migration_price}\n"
                    f"   Cocok Untuk: {', '.join(row.best_for) if row.best_for else 'Umum'}\n"
                    f"   Poin Penjualan: {'; '.join(row.selling_sentences) if row.selling_sentences else '-'}\n"
                )
            return "\n".join(lines)

    except Exception as e:
        logger.error("search_uprev_packages failed: %s", e)
        return f"Error searching packages: {e}"


# ── Tool 2: pgvector RAG Search (Add-ons) ───────────────────────────────────

@tool
async def search_addons(query: str) -> str:
    """Cari add-on UpRev yang cocok untuk upselling kepada klien.

    Args:
        query: Deskripsi kebutuhan add-on dalam Bahasa Indonesia, misalnya 'chatbot AI untuk customer service'.

    Returns:
        Daftar add-on yang cocok beserta detail dan harga.
    """
    try:
        query_vector = await embeddings_client.aembed_query(query)

        async with async_session_factory() as session:
            result = await session.execute(
                text("""
                    SELECT id, name, description, build_price, maintenance_price,
                           migration_price, best_for, selling_sentences,
                           embedding <=> :query_vec AS distance
                    FROM add_ons
                    WHERE embedding IS NOT NULL
                    ORDER BY distance ASC
                    LIMIT 3
                """),
                {"query_vec": str(query_vector)},
            )
            rows = result.fetchall()

            if not rows:
                return "Belum ada add-on yang tersedia saat ini."

            lines = []
            for row in rows:
                lines.append(
                    f"🔌 **{row.name}** (relevance: {1 - row.distance:.0%})\n"
                    f"   Description: {row.description}\n"
                    f"   Build Price: {row.build_price}\n"
                    f"   Maintenance: {row.maintenance_price}\n"
                    f"   Selling Points: {'; '.join(row.selling_sentences) if row.selling_sentences else 'N/A'}\n"
                )
            return "\n".join(lines)

    except Exception as e:
        logger.error("search_addons failed: %s", e)
        return f"Error searching add-ons: {e}"


# ── Tool 3: Context RAG ─────────────────────────────────────────────────────

@tool
async def get_context(query: str) -> str:
    """Cari jawaban dari knowledge base internal UpRev untuk pertanyaan umum.

    Gunakan tool ini ketika pengguna bertanya tentang:
    - Apa saja yang termasuk biaya maintenance?
    - Bagaimana proses kerja UpRev?
    - Berapa lama waktu pengerjaan?
    - Apa itu CRM?

    Args:
        query: Pertanyaan dalam Bahasa Indonesia untuk dicari di knowledge base UpRev.

    Returns:
        Konteks yang relevan dari knowledge base perusahaan UpRev.
    """
    try:
        query_vector = await embeddings_client.aembed_query(query)

        async with async_session_factory() as session:
            result = await session.execute(
                text("""
                    SELECT content, embedding <=> :query_vec AS distance
                    FROM company_context
                    WHERE embedding IS NOT NULL
                    ORDER BY distance ASC
                    LIMIT 3
                """),
                {"query_vec": str(query_vector)},
            )
            rows = result.fetchall()

            if not rows or rows[0].distance > 0.6:
                return "Tidak ditemukan konteks yang relevan di knowledge base kami untuk pertanyaan ini."

            chunks = []
            for row in rows:
                if row.distance < 0.6:
                    chunks.append(row.content)

            if not chunks:
                return "Tidak ditemukan konteks yang relevan di knowledge base kami untuk pertanyaan ini."

            return "\n---\n".join(chunks)

    except Exception as e:
        logger.error("get_context failed: %s", e)
        return f"Error retrieving context: {e}"


# ── Tool 4: Xendit Payment Link Generator ───────────────────────────────────

@tool
async def generate_payment_link(
    customer_email: str,
    customer_name: str,
    package_id: str,
    amount: float,
    addons: list[dict] | None = None,
    description: str = "UpRev Package Payment",
) -> str:
    """Generate a Xendit payment link for the agreed-upon package and any add-ons.

    Args:
        customer_email: Customer's email for the invoice.
        customer_name: Customer's display name.
        package_id: UUID of the selected UpRev package.
        amount: Base package amount in IDR.
        addons: Optional list of add-on dicts, e.g. [{"name": "AI Concierge", "price": 3500000}].
        description: Short description for the invoice.

    Returns:
        The Xendit invoice URL for the customer to complete payment.
    """
    try:
        # Calculate total amount including add-ons
        addon_total = sum(a.get("price", 0) for a in (addons or []))
        total_amount = amount + addon_total

        # 1. Create a PENDING transaction in DB
        async with async_session_factory() as session:
            tx = Transaction(
                customer_id=None,
                package_id=uuid.UUID(package_id),
                status=TransactionStatus.PENDING,
                amount=total_amount,
                addons=addons or [],
            )
            session.add(tx)
            await session.flush()
            tx_id = str(tx.id)
            await session.commit()

        # 2. Create Xendit invoice with redirect URLs
        import urllib.parse as _urlparse

        frontend_url = settings.APP_URL.rstrip("/")
        redirect_params = _urlparse.urlencode({
            "tx_id": tx_id,
            "pkg": description,
            "name": customer_name,
        })
        success_url = f"{frontend_url}/payment/success?{redirect_params}"
        failure_url = f"{frontend_url}/payment/failed?{redirect_params}"

        payload = {
            "external_id": tx_id,
            "amount": total_amount,
            "payer_email": customer_email,
            "description": description,
            "currency": "IDR",
            "customer": {
                "given_names": customer_name,
                "email": customer_email,
            },
            "success_redirect_url": success_url,
            "failure_redirect_url": failure_url,
        }

        async with httpx.AsyncClient() as client:
            resp = await client.post(
                "https://api.xendit.co/v2/invoices",
                json=payload,
                auth=(settings.XENDIT_SECRET_KEY, ""),
                timeout=30.0,
            )
            resp.raise_for_status()
            data = resp.json()

        invoice_url = data.get("invoice_url", "")
        xendit_invoice_id = data.get("id", "")

        # 3. Update the transaction with the Xendit invoice ID
        async with async_session_factory() as session:
            result = await session.execute(
                select(Transaction).where(Transaction.id == uuid.UUID(tx_id))
            )
            tx_record = result.scalar_one()
            tx_record.xendit_invoice_id = xendit_invoice_id
            await session.commit()

        addon_text = ""
        if addons:
            addon_names = ", ".join(a["name"] for a in addons)
            addon_text = f"\nAdd-ons included: {addon_names} (Rp {addon_total:,.0f})"

        return (
            f"✅ Payment link generated!\n"
            f"Invoice URL: {invoice_url}\n"
            f"Total Amount: Rp {total_amount:,.0f}{addon_text}\n"
            f"Please share this link with the customer."
        )

    except httpx.HTTPStatusError as e:
        logger.error("Xendit API error: %s – %s", e.response.status_code, e.response.text)
        return f"Failed to generate payment link: Xendit returned {e.response.status_code}"
    except Exception as e:
        logger.error("generate_payment_link failed: %s", e)
        return f"Error generating payment link: {e}"
