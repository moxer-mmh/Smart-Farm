export interface Disease {
  id: number;
  name: string;
  symptoms?: string;
  severity?: string;
  detectionDate: string;
  treatment?: string;
  status: string;
  plantId: number;
}

export interface DiseaseCreate {
  plantId: number;
  name: string;
  symptoms?: string;
  severity?: string;
  treatment?: string;
}
