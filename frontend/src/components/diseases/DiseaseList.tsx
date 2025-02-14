// src/components/diseases/DiseaseList.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge";
import Button from "../ui/button";
import { Edit, Trash } from "lucide-react";
import { Disease } from "../../types/disease";

interface DiseaseListProps {
  diseases: Disease[];
  onUpdate: (disease: Disease) => void;
  onDelete: (diseaseId: number) => void;
}

const DiseaseList: React.FC<DiseaseListProps> = ({
  diseases,
  onUpdate,
  onDelete,
}) => {
  if (!diseases || diseases.length === 0)
    return <div>No diseases recorded.</div>;
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "detected":
        return "warning";
      case "treating":
        return "default";
      case "resolved":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-2">Diseases</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Disease</TableHead>
            <TableHead>Detection Date</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Treatment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {diseases.map((disease) => (
            <TableRow key={disease.id}>
              <TableCell className="font-medium">{disease.name}</TableCell>
              <TableCell>
                {new Date(disease.detectionDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{disease.severity || "N/A"}</TableCell>
              <TableCell>
                <Badge variant={getStatusColor(disease.status)}>
                  {disease.status}
                </Badge>
              </TableCell>
              <TableCell>{disease.treatment || "Not specified"}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => onUpdate(disease)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onDelete(disease.id)}
                  >
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

export default DiseaseList;
