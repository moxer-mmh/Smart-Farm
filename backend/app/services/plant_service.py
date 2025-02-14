# app/services/plant_service.py
from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import List, Optional
from datetime import datetime
from dataclasses import asdict


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

    def update_plant(self, plant_id: int, plant_data: PlantCreate) -> Plant:
        plant = self.get_plant(plant_id)
        if not plant:
            raise HTTPException(status_code=404, detail="Plant not found")
        data = asdict(plant_data)
        allowed_keys = {
            "name",
            "species",
            "variety",
            "location",
            "health_status",
            "growth_stage",
            "height",
            "watering_frequency",
            "care_instructions",
            "user_id",
        }
        data = {k: v for k, v in data.items() if k in allowed_keys and v is not None}
        for key, value in data.items():
            setattr(plant, key, value)
        self.db.commit()
        self.db.refresh(plant)
        return plant

    def delete_plant(self, plant_id: int) -> bool:
        plant = self.get_plant(plant_id)
        if not plant:
            raise HTTPException(status_code=404, detail="Plant not found")
        self.db.delete(plant)
        self.db.commit()
        return True

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

    def update_measurement(
        self, measurement_id: int, measurement_data: MeasurementCreate
    ) -> Measurement:
        measurement = (
            self.db.query(Measurement).filter(Measurement.id == measurement_id).first()
        )
        if not measurement:
            raise HTTPException(status_code=404, detail="Measurement not found")
        data = asdict(measurement_data)
        allowed_keys = {
            "temperature",
            "humidity",
            "soil_moisture",
            "light_intensity",
            "plant_id",
        }
        data = {k: v for k, v in data.items() if k in allowed_keys and v is not None}
        for key, value in data.items():
            setattr(measurement, key, value)
        self.db.commit()
        self.db.refresh(measurement)
        return measurement

    def delete_measurement(self, measurement_id: int) -> bool:
        measurement = (
            self.db.query(Measurement).filter(Measurement.id == measurement_id).first()
        )
        if not measurement:
            raise HTTPException(status_code=404, detail="Measurement not found")
        self.db.delete(measurement)
        self.db.commit()
        return True

    def update_disease(self, disease_id: int, disease_data: DiseaseCreate) -> Disease:
        disease = self.db.query(Disease).filter(Disease.id == disease_id).first()
        if not disease:
            raise HTTPException(status_code=404, detail="Disease not found")
        data = asdict(disease_data)
        allowed_keys = {
            "name",
            "symptoms",
            "severity",
            "treatment",
            "plant_id",
        }
        data = {k: v for k, v in data.items() if k in allowed_keys and v is not None}
        for key, value in data.items():
            setattr(disease, key, value)
        self.db.commit()
        self.db.refresh(disease)
        return disease

    def delete_disease(self, disease_id: int) -> bool:
        disease = self.db.query(Disease).filter(Disease.id == disease_id).first()
        if not disease:
            raise HTTPException(status_code=404, detail="Disease not found")
        self.db.delete(disease)
        self.db.commit()
        return True
