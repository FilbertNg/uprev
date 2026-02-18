from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PHONE_NUMBER: str
    ALLOW_ORIGINS: list[str] = ["*"]

    class Config:
        env_file = ".env"

settings = Settings()
