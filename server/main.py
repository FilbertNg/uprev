"""
UpRev AI Sales Agent – FastAPI Application Entry Point.

Registers:
  - CORS middleware
  - All API routers (meet, chat, packages, transactions, webhooks)
  - Custom exception handler
  - APScheduler background job for 24-hour TTL cleanup
  - Database table creation on startup
"""

from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from agent.background import cleanup_expired_threads
from api.chat import router as chat_router
from api.context import router as context_router
from api.meet import router as meet_router
from api.packages import router as packages_router
from api.transactions import router as transactions_router
from api.webhooks import router as webhooks_router
from core.config import settings
from core.exceptions import AppException, app_exception_handler
from db.database import engine
from db.models import Base

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ── APScheduler ──────────────────────────────────────────────────────────────
scheduler = AsyncIOScheduler()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup / shutdown lifecycle."""
    # ── Startup ──────────────────────────────────────────────────────────────
    try:
        async with engine.begin() as conn:
            # Enable pgvector extension if not already enabled
            await conn.execute(__import__("sqlalchemy").text('CREATE EXTENSION IF NOT EXISTS vector'))
            await conn.run_sync(Base.metadata.create_all)
        logger.info("✅ Database tables ensured")
    except Exception as e:
        logger.warning("⚠️  Database connection failed on startup: %s", e)
        logger.warning("   Server will start, but DB-dependent routes will fail until DB is reachable.")

    # Start the 24-hour TTL cleanup job (runs every hour)
    scheduler.add_job(
        cleanup_expired_threads,
        "interval",
        hours=1,
        id="cleanup_expired_threads",
        replace_existing=True,
    )
    scheduler.start()
    logger.info("✅ APScheduler started (thread cleanup every 1 hour)")

    yield

    # ── Shutdown ─────────────────────────────────────────────────────────────
    scheduler.shutdown(wait=False)
    await engine.dispose()
    logger.info("🛑 Application shutdown complete")


# ── FastAPI App ──────────────────────────────────────────────────────────────

app = FastAPI(
    title="UpRev AI Sales Agent API",
    version="0.2.0",
    lifespan=lifespan,
)

# Exception handler
app.add_exception_handler(AppException, app_exception_handler)

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOW_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Health Check ─────────────────────────────────────────────────────────────

@app.get("/health")
async def health_check():
    return {"status": "ok"}


# ── Routers ──────────────────────────────────────────────────────────────────

app.include_router(meet_router, prefix="/api", tags=["meet"])
app.include_router(chat_router, prefix="/api", tags=["chat"])
app.include_router(packages_router, prefix="/api", tags=["packages"])
app.include_router(transactions_router, prefix="/api", tags=["transactions"])
app.include_router(webhooks_router, prefix="/api", tags=["webhooks"])
app.include_router(context_router, prefix="/api", tags=["context"])


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8001,
        reload=False,
        log_level="info",
    )