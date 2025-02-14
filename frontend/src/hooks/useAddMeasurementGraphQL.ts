// src/hooks/AddMeasurementGraphQL.ts
import { gql, useMutation } from "@apollo/client";
import { Measurement, MeasurementCreate } from "../types/measurement";

const ADD_MEASUREMENT = gql`
  mutation AddMeasurement($measurementData: MeasurementInput!) {
    addMeasurement(measurementData: $measurementData) {
      id
      plantId
      temperature
      humidity
      soilMoisture
      lightIntensity
    }
  }
`;

export const useAddMeasurementGraphQL = () => {
  return useMutation<
    { AddMeasurement: Measurement },
    { measurementData: MeasurementCreate }
  >(ADD_MEASUREMENT);
};
