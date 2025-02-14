import { Disease } from "./disease";
import { Measurement } from "./measurement";

export interface Plant {
  id: number;
  name: string;
  species: string;
  variety?: string;
  plantingDate: string;
  lastWatered?: string;
  healthStatus: string;
  location?: string;
  careInstructions?: string;
  wateringFrequency?: number;
  growthStage?: string;
  height?: number;
  user_id: number;
  diseases: Disease[];
  measurements: Measurement[];
}

export interface PlantCreate {
  name: string;
  species: string;
  variety?: string;
  location?: string;
  healthStatus: string;
  growthStage?: string;
  height?: number;
  wateringFrequency?: number;
  careInstructions?: string;
}
