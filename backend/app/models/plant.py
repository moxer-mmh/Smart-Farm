from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base


class Plant(Base):
    __tablename__ = "plants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    species = Column(String, nullable=False)
    variety = Column(String)
    planting_date = Column(DateTime, default=datetime.now)
    last_watered = Column(DateTime)
    health_status = Column(String, default="healthy")
    location = Column(String)
    care_instructions = Column(String)
    watering_frequency = Column(Float)
    growth_stage = Column(String)
    height = Column(Float)
    user_id = Column(Integer, ForeignKey("users.id"))

    # Relationships
    user = relationship("User", back_populates="plants")
    diseases = relationship("Disease", back_populates="plant")
    measurements = relationship("Measurement", back_populates="plant")
