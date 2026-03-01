"""
Database seeding script.
Drops and recreates all tables, then loads packages.json and add-ons.json
with OpenRouter text-embedding-3-small embeddings.

Usage:
    uv run python seed_db.py
"""

import asyncio
import json
import logging

from langchain_openai import OpenAIEmbeddings
from sqlalchemy import text

from core.config import settings
from db.database import engine, async_session_factory
from db.models import Base, UpRevPackage, UpRevAddOn

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def main():
    # ── Embeddings client (OpenRouter) ───────────────────────────────────────
    embeddings = OpenAIEmbeddings(
        model="openai/text-embedding-3-small",
        openai_api_key=settings.OPENROUTER_API_KEY,
        openai_api_base="https://openrouter.ai/api/v1",
    )

    # ── Drop & recreate tables ───────────────────────────────────────────────
    logger.info("Dropping and recreating all database tables...")
    async with engine.begin() as conn:
        await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    logger.info("✅ Tables recreated.")

    # ── Load JSON files ──────────────────────────────────────────────────────
    with open("packages.json", "r", encoding="utf-8") as f:
        packages_data = json.load(f)

    with open("add-ons.json", "r", encoding="utf-8") as f:
        addons_data = json.load(f)

    # ── Seed using ORM (handles pgvector natively) ───────────────────────────
    async with async_session_factory() as session:
        # Seed Packages
        for pkg in packages_data:
            logger.info("Embedding package: %s", pkg["name"])
            content = (
                f"Name: {pkg['name']}\n"
                f"Description: {pkg['description']}\n"
                f"Best for: {', '.join(pkg['best_for'])}\n"
                f"Selling pitch: {' '.join(pkg['selling_sentences'])}"
            )
            vector = await embeddings.aembed_query(content)

            record = UpRevPackage(
                name=pkg["name"],
                description=pkg["description"],
                build_price=pkg.get("build_price", "0"),
                maintenance_price=pkg.get("maintenance_price", "0"),
                migration_price=pkg.get("migration_price", "0"),
                best_for=pkg["best_for"],
                selling_sentences=pkg["selling_sentences"],
                embedding=vector,
            )
            session.add(record)
            logger.info("  ✅ %s", pkg["name"])

        # Seed Add-ons
        for addon in addons_data:
            logger.info("Embedding add-on: %s", addon["name"])
            content = (
                f"Name: {addon['name']}\n"
                f"Description: {addon['description']}\n"
                f"Best for: {', '.join(addon['best_for'])}\n"
                f"Selling pitch: {' '.join(addon['selling_sentences'])}"
            )
            vector = await embeddings.aembed_query(content)

            record = UpRevAddOn(
                name=addon["name"],
                description=addon["description"],
                build_price=addon.get("build_price", "0"),
                maintenance_price=addon.get("maintenance_price", "0"),
                migration_price=addon.get("migration_price", "0"),
                best_for=addon["best_for"],
                selling_sentences=addon["selling_sentences"],
                embedding=vector,
            )
            session.add(record)
            logger.info("  ✅ %s", addon["name"])

        await session.commit()

    logger.info("🎉 Database seeding complete!")


if __name__ == "__main__":
    asyncio.run(main())
