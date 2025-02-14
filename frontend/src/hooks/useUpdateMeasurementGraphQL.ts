import { gql, useMutation } from "@apollo/client";
import { Measurement, MeasurementCreate } from "../types/measurement";

const UPDATE_MEASUREMENT = gql`
  mutation UpdateMeasurement(
    $measurementId: Int!
    $measurementData: MeasurementInput!
  ) {
    updateMeasurement(
      measurementId: $measurementId
      measurementData: $measurementData
    ) {
      id
      temperature
      humidity
      soilMoisture
      lightIntensity
      timestamp
    }
  }
`;

export const useUpdateMeasurementGraphQL = () => {
  return useMutation<
    { updateMeasurement: Measurement },
    { measurementId: number; measurementData: MeasurementCreate }
  >(UPDATE_MEASUREMENT);
};
