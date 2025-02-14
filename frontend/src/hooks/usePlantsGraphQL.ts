// src/hooks/usePlantsGraphQL.ts
import { gql, useQuery } from "@apollo/client";
import { Plant } from "../types/plant";

const GET_PLANTS_BY_USER = gql`
  query GetPlantsByUser($userId: Int!) {
    plantsByUser(userId: $userId) {
      id
      name
      species
      plantingDate
      healthStatus
      variety
      location
      careInstructions
      wateringFrequency
      growthStage
      height
      lastWatered
      diseases {
        id
        name
        severity
        symptoms
        detectionDate
        status
        treatment
      }
      measurements {
        id
        temperature
        humidity
        soilMoisture
        lightIntensity
        timestamp
      }
    }
  }
`;

export const usePlantsGraphQL = (userId: number) => {
  return useQuery<{ plantsByUser: Plant[] }>(GET_PLANTS_BY_USER, {
    variables: { userId },
    skip: isNaN(userId) || userId === 0,
  });
};
