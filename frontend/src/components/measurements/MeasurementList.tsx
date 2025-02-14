// src/components/measurements/MeasurementList.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Button from "../ui/button";
import { Edit, Trash } from "lucide-react";
import { Measurement } from "../../types/measurement";

interface MeasurementListProps {
  measurements: Measurement[];
  onUpdate: (measurement: Measurement) => void;
  onDelete: (measurementId: number) => void;
}

const MeasurementList: React.FC<MeasurementListProps> = ({
  measurements,
  onUpdate,
  onDelete,
}) => {
  if (!measurements || measurements.length === 0)
    return <div>No measurements recorded.</div>;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-2">Measurements</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Temperature</TableHead>
            <TableHead>Humidity</TableHead>
            <TableHead>Soil Moisture</TableHead>
            <TableHead>Light Intensity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {measurements.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{new Date(m.timestamp).toLocaleString()}</TableCell>
              <TableCell>{m.temperature} °C</TableCell>
              <TableCell>{m.humidity} %</TableCell>
              <TableCell>{m.soilMoisture ?? "N/A"}</TableCell>
              <TableCell>{m.lightIntensity ?? "N/A"}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => onUpdate(m)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" onClick={() => onDelete(m.id)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MeasurementList;
