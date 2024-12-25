from typing import Generator
from .base import SessionLocal, engine  # Add engine here


def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
