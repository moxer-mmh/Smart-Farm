from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class MeasurementBase(BaseModel):
    temperature: Optional[float] = None
    humidity: Optional[float] = None
    soil_moisture: Optional[float] = None
    light_intensity: Optional[float] = None


class MeasurementCreate(MeasurementBase):
    plant_id: int


class Measurement(MeasurementBase):
    id: int
    timestamp: datetime
    plant_id: int

    class Config:
        from_attributes = True
