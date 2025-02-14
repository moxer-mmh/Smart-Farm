export interface Measurement {
  id: number;
  timestamp: string;
  temperature?: number;
  humidity?: number;
  soilMoisture?: number;
  lightIntensity?: number;
  plantId: number;
}

export interface MeasurementCreate {
  plantId: number;
  temperature?: number;
  humidity?: number;
  soilMoisture?: number;
  lightIntensity?: number;
}
