from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class DiseaseBase(BaseModel):
    name: str
    symptoms: Optional[str] = None
    severity: Optional[str] = None
    treatment: Optional[str] = None


class DiseaseCreate(DiseaseBase):
    plant_id: int


class Disease(DiseaseBase):
    id: int
    detection_date: datetime
    status: str
    plant_id: int

    class Config:
        from_attributes = True
