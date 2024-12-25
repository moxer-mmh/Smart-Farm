from fastapi import APIRouter, Depends
from app.api.v1.endpoints import auth
from app.api.graphql.schema import graphql_app


api_router = APIRouter()


# Include routers for different features
api_router.include_router(graphql_app, prefix="/graphql", tags=["GraphQL"])
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
