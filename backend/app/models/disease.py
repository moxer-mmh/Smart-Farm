from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base
from datetime import datetime


class Disease(Base):
    __tablename__ = "diseases"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    symptoms = Column(String)
    severity = Column(String)
    detection_date = Column(DateTime, default=datetime.now)
    treatment = Column(String)
    status = Column(String, default="detected")  # detected, treating, resolved
    plant_id = Column(Integer, ForeignKey("plants.id"))

    # Relationships
    plant = relationship("Plant", back_populates="diseases")
