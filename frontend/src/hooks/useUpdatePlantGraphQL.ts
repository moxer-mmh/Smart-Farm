// src/hooks/useUpdatePlantGraphQL.ts
import { gql, useMutation } from "@apollo/client";
import { Plant, PlantCreate } from "../types/plant";

// Corrected: Use backticks for the gql template
const UPDATE_PLANT = gql`
  mutation UpdatePlant($plantId: Int!, $plantData: PlantInput!) {
    updatePlant(plantId: $plantId, plantData: $plantData) {
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
    }
  }
`;

export const useUpdatePlantGraphQL = () => {
  return useMutation<
    { updatePlant: Plant },
    { plantId: number; plantData: PlantCreate }
  >(UPDATE_PLANT);
};
