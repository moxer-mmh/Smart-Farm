// src/hooks/useAllPlantsGraphQL.ts
import { gql, useQuery } from "@apollo/client";
import { Plant } from "../types/plant";

const GET_ALL_PLANTS = gql`
  query GetAllPlants {
    plants {
      id
      name
      species
      plantingDate
      healthStatus
      careInstructions
      wateringFrequency
      height
      measurements {
        id
        temperature
        humidity
        soilMoisture
        lightIntensity
        timestamp
      }
      diseases {
        id
        name
        severity
        detectionDate
        status
      }
    }
  }
`;

export const useAllPlantsGraphQL = () => {
  return useQuery<{ plants: Plant[] }>(GET_ALL_PLANTS);
};
