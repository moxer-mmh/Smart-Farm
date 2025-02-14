// src/hooks/useAddPlantGraphQL.ts
import { gql, useMutation } from "@apollo/client";
import { Plant, PlantCreate } from "../types/plant";

const CREATE_PLANT = gql`
  mutation CreatePlant($plantData: PlantInput!) {
    createPlant(plantData: $plantData) {
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

export const useAddPlantGraphQL = () => {
  return useMutation<{ createPlant: Plant }, { plantData: PlantCreate }>(
    CREATE_PLANT
  );
};
