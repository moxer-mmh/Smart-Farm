import { gql, useMutation } from "@apollo/client";
import { Disease, DiseaseCreate } from "../types/disease";

const UPDATE_DISEASE = gql`
  mutation UpdateDisease($diseaseId: Int!, $diseaseData: DiseaseInput!) {
    updateDisease(diseaseId: $diseaseId, diseaseData: $diseaseData) {
      id
      name
      symptoms
      severity
      treatment
    }
  }
`;

export const useUpdateDiseaseGraphQL = () => {
  return useMutation<
    { updateDisease: Disease },
    { diseaseId: number; diseaseData: DiseaseCreate }
  >(UPDATE_DISEASE);
};
