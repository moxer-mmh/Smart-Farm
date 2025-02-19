import strawberry
from typing import List, Optional
from datetime import datetime
from strawberry.types import Info
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException
from strawberry.fastapi import GraphQLRouter

from app.db.session import get_db
from app.services.plant_service import PlantService
from app.schemas.measurement import MeasurementCreate, Measurement
from app.schemas.plant import PlantwithuserId
from app.schemas.disease import DiseaseCreate, Disease
from app.core.security import get_current_user
from app.models.user import User


@strawberry.type
class Measurement:
    id: int
    temperature: Optional[float]
    humidity: Optional[float]
    soil_moisture: Optional[float]
    light_intensity: Optional[float]
    timestamp: datetime
    plant_id: int


@strawberry.type
class Disease:
    id: int
    name: str
    symptoms: Optional[str]
    severity: Optional[str]
    detection_date: datetime
    treatment: Optional[str]
    status: str
    plant_id: int


@strawberry.type
class Plant:
    id: int
    name: str
    species: str
    variety: Optional[str]
    planting_date: datetime
    last_watered: Optional[datetime]
    health_status: str
    location: Optional[str]
    care_instructions: Optional[str]
    watering_frequency: Optional[int]
    growth_stage: Optional[str]
    height: Optional[float]
    user_id: int
    diseases: List[Disease]
    measurements: List[Measurement]


@strawberry.input
class PlantInput:
    name: str
    species: str
    variety: Optional[str] = None
    location: Optional[str] = None
    health_status: str
    growth_stage: Optional[str] = None
    height: Optional[float] = None
    watering_frequency: Optional[int] = None
    care_instructions: Optional[str] = None
    user_id: Optional[int] = None


@strawberry.input
class MeasurementInput:
    temperature: Optional[float] = None
    humidity: Optional[float] = None
    soil_moisture: Optional[float] = None
    light_intensity: Optional[float] = None
    plant_id: int


@strawberry.input
class DiseaseInput:
    name: str
    symptoms: Optional[str] = None
    severity: Optional[str] = None
    treatment: Optional[str] = None
    plant_id: int


@strawberry.type
class Query:
    @strawberry.field
    def plants(self) -> List[Plant]:
        db: Session = next(get_db())
        plant_service = PlantService(db)
        return plant_service.get_plants()

    @strawberry.field
    def plant_by_id(self, info: Info, plant_id: int) -> Optional[Plant]:
        db: Session = next(get_db())
        plant_service = PlantService(db)
        return plant_service.get_plant(plant_id)

    @strawberry.field
    def plants_by_user(self, info: Info, user_id: int) -> List[Plant]:
        db: Session = next(get_db())
        plant_service = PlantService(db)
        return plant_service.get_plants_by_user(user_id)


@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_plant(
        self,
        info: Info,
        plant_data: PlantInput,
    ) -> Plant:
        db: Session = next(get_db())
        current_user = info.context["current_user"]
        if not current_user:
            raise Exception("User not authenticated")
        plant = PlantwithuserId(
            name=plant_data.name,
            species=plant_data.species,
            variety=plant_data.variety,
            location=plant_data.location,
            health_status=plant_data.health_status,
            growth_stage=plant_data.growth_stage,
            height=plant_data.height,
            watering_frequency=plant_data.watering_frequency,
            care_instructions=plant_data.care_instructions,
            user_id=current_user.id,
        )
        plant_service = PlantService(db)
        return plant_service.create_plant(plant)

    @strawberry.mutation
    def update_plant(self, info: Info, plant_id: int, plant_data: PlantInput) -> Plant:
        db: Session = next(get_db())
        plant_service = PlantService(db)
        updated = plant_service.update_plant(plant_id, plant_data)
        return updated

    @strawberry.mutation
    def delete_plant(self, info: Info, plant_id: int) -> bool:
        db: Session = next(get_db())
        plant_service = PlantService(db)
        return plant_service.delete_plant(plant_id)

    @strawberry.mutation
    def add_measurement(
        self, info: Info, measurement_data: MeasurementInput
    ) -> Measurement:
        db: Session = next(get_db())
        plant_service = PlantService(db)
        measurement = MeasurementCreate(
            plant_id=measurement_data.plant_id,
            temperature=measurement_data.temperature,
            humidity=measurement_data.humidity,
            soil_moisture=measurement_data.soil_moisture,
            light_intensity=measurement_data.light_intensity,
        )
        return plant_service.record_measurement(measurement)

    @strawberry.mutation
    def update_measurement(
        self, info: Info, measurement_id: int, measurement_data: MeasurementInput
    ) -> Measurement:
        db: Session = next(get_db())
        plant_service = PlantService(db)
        # Implement update logic in your PlantService (see note below)
        updated = plant_service.update_measurement(measurement_id, measurement_data)
        return updated

    @strawberry.mutation
    def delete_measurement(self, info: Info, measurement_id: int) -> bool:
        db: Session = next(get_db())
        plant_service = PlantService(db)
        return plant_service.delete_measurement(measurement_id)

    @strawberry.mutation
    def add_disease(self, info: Info, disease_data: DiseaseInput) -> Disease:
        db: Session = next(get_db())
        plant_service = PlantService(db)
        disease = DiseaseCreate(
            plant_id=disease_data.plant_id,
            name=disease_data.name,
            symptoms=disease_data.symptoms,
            severity=disease_data.severity,
            treatment=disease_data.treatment,
        )
        return plant_service.record_disease(disease)

    @strawberry.mutation
    def update_disease(
        self, info: Info, disease_id: int, disease_data: DiseaseInput
    ) -> Disease:
        db: Session = next(get_db())
        plant_service = PlantService(db)
        updated = plant_service.update_disease(disease_id, disease_data)
        return updated

    @strawberry.mutation
    def delete_disease(self, info: Info, disease_id: int) -> bool:
        db: Session = next(get_db())
        plant_service = PlantService(db)
        return plant_service.delete_disease(disease_id)


def get_context(current_user: User = Depends(get_current_user)):
    return {"current_user": current_user}


schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema, context_getter=get_context)
