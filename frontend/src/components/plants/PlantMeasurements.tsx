// src/components/plants/PlantMeasurements.tsx
import React from "react";
import { Measurement } from "../../types/measurement";
import MeasurementChart from "../measurements/MeasurementChart";

interface PlantMeasurementsProps {
  measurements: Measurement[];
}

const PlantMeasurements: React.FC<PlantMeasurementsProps> = ({
  measurements,
}) => {
  if (!measurements || measurements.length === 0) {
    return <div className="text-gray-500">No measurements recorded.</div>;
  }

  return (
    <div className="space-y-6">
      <MeasurementChart measurements={measurements} type="temperature" />
      <MeasurementChart measurements={measurements} type="humidity" />
      <MeasurementChart measurements={measurements} type="soilMoisture" />
      <MeasurementChart measurements={measurements} type="lightIntensity" />
    </div>
  );
};

export default PlantMeasurements;
