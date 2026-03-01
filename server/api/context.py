"""
API endpoint for re-embedding the context.txt knowledge base.

POST /api/context/embed
  - Reads context.txt from disk
  - Splits into chunks
  - Generates embeddings via OpenRouter (text-embedding-3-small)
  - Saves to company_context table (replaces old data)
"""

from __future__ import annotations

import logging
from pathlib import Path

from fastapi import APIRouter
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sqlalchemy import delete, text

from core.config import settings
from db.database import async_session_factory
from db.models import CompanyContext

logger = logging.getLogger(__name__)

router = APIRouter()

CONTEXT_FILE = Path(__file__).resolve().parent.parent / "context.txt"

embeddings_client = OpenAIEmbeddings(
    model="openai/text-embedding-3-small",
    openai_api_key=settings.OPENROUTER_API_KEY,
    openai_api_base="https://openrouter.ai/api/v1",
)


@router.post("/context/embed")
async def embed_context():
    """Read context.txt, chunk it, embed each chunk, and save to the company_context table.
    This replaces all existing context embeddings.
    """
    if not CONTEXT_FILE.exists():
        return {"error": "context.txt not found", "path": str(CONTEXT_FILE)}

    # 1. Read the file
    content = CONTEXT_FILE.read_text(encoding="utf-8")
    if not content.strip():
        return {"error": "context.txt is empty"}

    # 2. Split into chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
        separators=["\n\n", "\n", ". ", " "],
    )
    chunks = splitter.split_text(content)
    logger.info("Split context.txt into %d chunks", len(chunks))

    # 3. Generate embeddings for all chunks
    vectors = await embeddings_client.aembed_documents(chunks)

    # 4. Replace existing data in company_context
    async with async_session_factory() as session:
        # Clear old context
        await session.execute(delete(CompanyContext))

        # Insert new chunks with embeddings
        for chunk_text, vector in zip(chunks, vectors):
            ctx = CompanyContext(content=chunk_text, embedding=vector)
            session.add(ctx)

        await session.commit()

    logger.info("✅ Embedded %d context chunks into company_context table", len(chunks))
    return {"status": "ok", "chunks_embedded": len(chunks)}
