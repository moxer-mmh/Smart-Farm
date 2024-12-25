# app/services/plant_service.py
from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import List, Optional
from datetime import datetime

from app.models.plant import Plant
from app.models.disease import Disease
from app.models.measurement import Measurement
from app.schemas.plant import PlantCreate
from app.schemas.disease import DiseaseCreate
from app.schemas.measurement import MeasurementCreate


class PlantService:
    def __init__(self, db: Session):
        self.db = db

    def create_plant(self, plant: PlantCreate) -> Plant:
        db_plant = Plant(**plant.model_dump())
        self.db.add(db_plant)
        self.db.commit()
        self.db.refresh(db_plant)
        return db_plant

    def get_plants(self) -> List[Plant]:
        return self.db.query(Plant).all()

    def get_plant(self, plant_id: int) -> Optional[Plant]:
        return self.db.query(Plant).filter(Plant.id == plant_id).first()

    def get_plants_by_user(self, user_id: int) -> List[Plant]:
        return self.db.query(Plant).filter(Plant.user_id == user_id).all()

    def update_plant_health(self, plant_id: int, health_status: str) -> Plant:
        plant = self.get_plant(plant_id)
        if not plant:
            raise HTTPException(status_code=404, detail="Plant not found")
        plant.health_status = health_status
        self.db.commit()
        return plant

    def record_measurement(self, measurement: MeasurementCreate) -> Measurement:
        db_measurement = Measurement(**measurement.model_dump())
        self.db.add(db_measurement)
        self.db.commit()
        self.db.refresh(db_measurement)
        return db_measurement

    def record_disease(self, disease: DiseaseCreate) -> Disease:
        db_disease = Disease(**disease.model_dump())
        self.db.add(db_disease)
        self.db.commit()
        self.db.refresh(db_disease)
        return db_disease
