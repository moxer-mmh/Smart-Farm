from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash, verify_password
from typing import Optional


class AuthService:
    def __init__(self, db: Session):
        self.db = db

    def get_user_by_email(self, email: str) -> Optional[User]:
        user = self.db.query(User).filter(User.email == email).first()
        print(
            f"Looking for user with email {email}: {'Found' if user else 'Not found'}"
        )  # Debug print
        return user

    def get_user_by_username(self, username: str) -> Optional[User]:
        return self.db.query(User).filter(User.username == username).first()

    def create_user(self, user: UserCreate) -> User:
        try:
            db_user = User(
                email=user.email,
                username=user.username,
                hashed_password=get_password_hash(user.password),
            )
            self.db.add(db_user)
            self.db.commit()
            self.db.refresh(db_user)
            print(f"User created successfully: {db_user.username}")  # Debug print
            return db_user
        except Exception as e:
            print(f"Error creating user: {e}")  # Debug print
            self.db.rollback()
            raise

    def authenticate_user(self, username: str, password: str) -> Optional[User]:
        user = self.get_user_by_username(username)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user
