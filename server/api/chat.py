"""
Chat API – the main conversational endpoint.

Handles:
  - Cookie-based session management (thread_id)
  - Template anti-bloat deduplication
  - LangGraph agent invocation with AsyncPostgresSaver
  - Background scratchpad sync
"""

from __future__ import annotations

import asyncio
import logging
import uuid

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from langgraph.checkpoint.postgres.aio import AsyncPostgresSaver
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from agent.background import sync_scratchpad_to_db
from agent.graph import graph_builder
from core.config import settings
from db.database import get_db
from db.models import ChatThread
from db.schemas import ChatRequest, ChatResponse

logger = logging.getLogger(__name__)
router = APIRouter()

# In-memory cache for last template per thread (simple anti-bloat)
_last_template: dict[str, str] = {}


def _get_or_create_thread_id(request: Request, response: Response) -> str:
    """Read thread_id from cookie; create one if missing."""
    thread_id = request.cookies.get("thread_id")
    if not thread_id:
        thread_id = str(uuid.uuid4())
        response.set_cookie(
            key="thread_id",
            value=thread_id,
            httponly=True,
            samesite="lax",
            max_age=86400,  # 24 hours
        )
    return thread_id


@router.post("/chat", response_model=ChatResponse)
async def chat(
    payload: ChatRequest,
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    """Conversational endpoint for the AI Sales Agent."""

    thread_id = _get_or_create_thread_id(request, response)

    # ── 1. Ensure chat_thread exists in DB ───────────────────────────────────
    try:
        result = await db.execute(
            select(ChatThread).where(ChatThread.thread_id == thread_id)
        )
        thread = result.scalar_one_or_none()
        if not thread:
            thread = ChatThread(thread_id=uuid.UUID(thread_id))
            db.add(thread)
            await db.flush()
    except Exception as e:
        logger.error("Failed to ensure chat thread: %s", e)
        raise HTTPException(status_code=500, detail="Session error")

    # ── 2. Template anti-bloat ───────────────────────────────────────────────
    user_message = payload.message
    if payload.template_key:
        last = _last_template.get(thread_id)
        if last == payload.template_key:
            # Duplicate consecutive template – drop it, use raw message only
            logger.debug("Dropped duplicate template '%s' for thread %s", payload.template_key, thread_id)
        else:
            _last_template[thread_id] = payload.template_key

    # ── 3. Invoke LangGraph with AsyncPostgresSaver ──────────────────────────
    try:
        # Build the DB URI for the checkpointer (convert asyncpg → psycopg)
        pg_uri = settings.DATABASE_URL.replace(
            "postgresql+asyncpg://", "postgresql://"
        )

        async with AsyncPostgresSaver.from_conn_string(pg_uri) as checkpointer:
            await checkpointer.setup()

            graph = graph_builder.compile(checkpointer=checkpointer)

            config = {"configurable": {"thread_id": thread_id}}

            result = await graph.ainvoke(
                {
                    "messages": [{"role": "user", "content": user_message}],
                    "customer_profile": {},
                },
                config,
            )

            # Extract the last AI message
            ai_message = result["messages"][-1]
            reply = ai_message.content if hasattr(ai_message, "content") else str(ai_message)

            # ── 4. Background sync scratchpad → customers table ──────────
            customer_profile = result.get("customer_profile", {})
            if customer_profile:
                asyncio.create_task(
                    sync_scratchpad_to_db(thread_id, customer_profile)
                )

    except Exception as e:
        logger.error("Chat agent invocation failed: %s", e)
        raise HTTPException(status_code=500, detail="AI agent error. Please try again.")

    return ChatResponse(reply=reply, thread_id=thread_id)
