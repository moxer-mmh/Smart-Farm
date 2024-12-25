from app.db.base import Base, engine
from app.models.user import User  # Import all your models here


def init_db():
    # Create all tables
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_db()
    print("Database tables created successfully!")
