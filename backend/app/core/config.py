from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str

    # Security
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # API
    API_STR: str = "/api"
    PROJECT_NAME: str = "Smart Farm API"

    # CORS
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000"]  # Frontend URL

    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
