import { gql, useMutation } from "@apollo/client";

const DELETE_MEASUREMENT = gql`
  mutation DeleteMeasurement($measurementId: Int!) {
    deleteMeasurement(measurementId: $measurementId)
  }
`;

export const useDeleteMeasurementGraphQL = () => {
  return useMutation<{ deleteMeasurement: boolean }, { measurementId: number }>(
    DELETE_MEASUREMENT
  );
};
