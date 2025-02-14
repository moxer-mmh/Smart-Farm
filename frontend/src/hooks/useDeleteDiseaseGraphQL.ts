import { gql, useMutation } from "@apollo/client";

const DELETE_DISEASE = gql`
  mutation DeleteDisease($diseaseId: Int!) {
    deleteDisease(diseaseId: $diseaseId)
  }
`;

export const useDeleteDiseaseGraphQL = () => {
  return useMutation<{ deleteDisease: boolean }, { diseaseId: number }>(
    DELETE_DISEASE
  );
};
