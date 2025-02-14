// src/hooks/Ad.ts
import { gql, useMutation } from "@apollo/client";
import { Disease, DiseaseCreate } from "../types/disease";

const ADD_DISEASE = gql`
  mutation AddDisease($diseaseData: DiseaseInput!) {
    addDisease(diseaseData: $diseaseData) {
      id
      plantId
      name
      symptoms
      severity
      treatment
    }
  }
`;

export const useAddDiseaseGraphQL = () => {
  return useMutation<{ AddDisease: Disease }, { diseaseData: DiseaseCreate }>(
    ADD_DISEASE
  );
};
