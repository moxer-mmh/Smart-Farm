// src/hooks/useDeletePlantGraphQL.ts
import { gql, useMutation } from "@apollo/client";

const DELETE_PLANT = gql`
  mutation DeletePlant($plantId: Int!) {
    deletePlant(plantId: $plantId)
  }
`;

export const useDeletePlantGraphQL = () => {
  return useMutation<{ deletePlant: boolean }, { plantId: number }>(
    DELETE_PLANT
  );
};
