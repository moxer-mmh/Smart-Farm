// src/components/plants/PlantDetailsModal.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import PlantDetails from "./PlantDetails";
import { Plant } from "../../types/plant";
import Button from "../ui/button";
import { AlertTriangle } from "lucide-react";
import { useToast } from "../ui/use-toast";

interface PlantDetailsModalProps {
  plant: Plant;
  onClose: () => void;
  onUpdate?: (updatedPlant: any) => Promise<void>;
  onDelete?: (plantId: number) => Promise<void>;
  onAddMeasurement?: (data: any) => Promise<void>;
  onUpdateMeasurement?: (measurement: any) => void;
  onDeleteMeasurement?: (measurementId: number) => void;
  onAddDisease?: (data: any) => Promise<void>;
  onUpdateDisease?: (disease: any) => void;
  onDeleteDisease?: (diseaseId: number) => void;
}

const PlantDetailsModal: React.FC<PlantDetailsModalProps> = ({
  plant,
  onClose,
  onUpdate,
  onDelete,
  onAddMeasurement,
  onUpdateMeasurement,
  onDeleteMeasurement,
  onAddDisease,
  onUpdateDisease,
  onDeleteDisease,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { addToast } = useToast();

  const handleDelete = async () => {
    if (!onDelete) return;

    try {
      setIsDeleting(true);
      await onDelete(plant.id);
      addToast({
        title: "Plant Deleted",
        description: "The plant has been successfully removed.",
        variant: "success",
      });
      onClose();
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to delete the plant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-6 py-4 border-b flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <DialogTitle className="text-2xl font-semibold">
              {plant.name}
            </DialogTitle>
            {plant.healthStatus === "critical" && (
              <span className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-1 rounded-full text-sm">
                <AlertTriangle className="w-4 h-4" />
                Critical Care Needed
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            ID: {plant.id} • Added:{" "}
            {new Date(plant.plantingDate).toLocaleDateString()}
          </div>
        </DialogHeader>

        {/* Pass through all the update and measurement/disease callbacks */}
        <div className="flex-1 overflow-y-auto">
          <PlantDetails
            plant={plant}
            onUpdate={onUpdate}
            onAddMeasurement={onAddMeasurement}
            onUpdateMeasurement={onUpdateMeasurement}
            onDeleteMeasurement={onDeleteMeasurement}
            onAddDisease={onAddDisease}
            onUpdateDisease={onUpdateDisease}
            onDeleteDisease={onDeleteDisease}
          />
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-gray-50">
          <div className="flex justify-end gap-2">
            {onDelete && (
              <Button
                variant="outline"
                onClick={handleDelete}
                isLoading={isDeleting}
              >
                Delete Plant
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlantDetailsModal;
