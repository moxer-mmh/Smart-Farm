// src/components/measurements/MeasurementForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Button from "../ui/button";
import Input from "../ui/input";
import { Measurement, MeasurementCreate } from "../../types/measurement";

interface MeasurementFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MeasurementCreate) => Promise<void>;
  plantId: number;
  initialData?: Measurement; // optional: if provided, the form is for updating
}

const MeasurementForm: React.FC<MeasurementFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  plantId,
  initialData,
}) => {
  const { register, handleSubmit } = useForm<MeasurementCreate>({
    defaultValues: initialData || {},
  });

  const onSubmitForm = async (data: MeasurementCreate) => {
    // Merge plantId and (if updating) any other fields needed (like id) from initialData
    const payload = { ...data, plantId };
    await onSubmit(payload);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Update Measurement" : "Add New Measurement"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit(onSubmitForm)();
            }
          }}
          className="space-y-4"
        >
          <Input
            {...register("temperature", { valueAsNumber: true })}
            type="number"
            step="0.1"
            placeholder="Temperature (°C)"
            className="w-full"
          />
          <Input
            {...register("humidity", { valueAsNumber: true })}
            type="number"
            step="0.1"
            placeholder="Humidity (%)"
            className="w-full"
          />
          <Input
            {...register("soilMoisture", { valueAsNumber: true })}
            type="number"
            step="0.1"
            placeholder="Soil Moisture (%)"
            className="w-full"
          />
          <Input
            {...register("lightIntensity", { valueAsNumber: true })}
            type="number"
            step="0.1"
            placeholder="Light Intensity (lux)"
            className="w-full"
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Update Measurement" : "Add Measurement"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MeasurementForm;
