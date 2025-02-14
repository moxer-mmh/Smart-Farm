# app/schemas/plant.py
from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Optional, List
from app.schemas.disease import Disease
from app.schemas.measurement import Measurement


class PlantBase(BaseModel):
    name: str
    species: str
    variety: Optional[str] = None
    location: Optional[str] = None
    health_status: str = None
    care_instructions: Optional[str] = None
    watering_frequency: Optional[float] = None
    growth_stage: Optional[str] = None
    height: Optional[float] = None

    @field_validator("species")
    def validate_species(cls, v):
        valid_species = ["tomato", "potato"]
        if v.lower() not in valid_species:
            raise ValueError(
                f'Invalid species. Must be one of: {", ".join(valid_species)}'
            )
        return v.lower()


class PlantCreate(PlantBase):
    pass


class PlantwithuserId(PlantBase):
    user_id: int


class Plant(PlantBase):
    id: int
    planting_date: datetime
    last_watered: Optional[datetime]
    health_status: str
    user_id: int
    diseases: List[Disease] = []
    measurements: List[Measurement] = []

    class Config:
        from_attributes = True
