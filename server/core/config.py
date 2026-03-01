"""
Application-wide configuration loaded from environment variables.
All secrets are validated at startup via Pydantic Settings.
"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # ── FastAPI ──────────────────────────────────────────────
    ALLOW_ORIGINS: list[str] = ["*"]
    PHONE_NUMBER: str = ""

    # ── PostgreSQL ──────────────────────────────────────────
    DATABASE_URL: str  # e.g. postgresql+asyncpg://user:pass@host:5432/db

    # ── OpenRouter (LLM + Embeddings) ──────────────────────
    OPENROUTER_API_KEY: str
    OPENROUTER_MODEL: str = "google/gemini-2.5-flash-lite"

    # ── Xendit (Payment Gateway) ────────────────────────────
    XENDIT_SECRET_KEY: str
    XENDIT_WEBHOOK_VERIFICATION_TOKEN: str

    # ── LangSmith (Observability) ───────────────────────────
    LANGCHAIN_TRACING_V2: bool = True
    LANGCHAIN_ENDPOINT: str = "https://api.smith.langchain.com"
    LANGCHAIN_API_KEY: str = ""
    LANGCHAIN_PROJECT: str = "uprev-ai-sales-agent"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
