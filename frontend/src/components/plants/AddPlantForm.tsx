// src/components/plants/AddPlantForm.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Button from "../ui/button";
import Input from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { PlantCreate } from "../../types/plant";

interface AddPlantFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PlantCreate) => Promise<void>;
}

const AddPlantForm: React.FC<AddPlantFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PlantCreate>({
    defaultValues: {
      healthStatus: "healthy",
      species: "tomato",
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-6">
        <DialogHeader>
          <DialogTitle>Add New Plant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Plant Name */}
          <div className="space-y-1">
            <Input
              {...register("name", { required: "Plant name is required" })}
              placeholder="Plant Name"
              aria-label="Plant Name"
              className="w-full"
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Species Select */}
          <div className="space-y-1">
            <Controller
              name="species"
              control={control}
              rules={{ required: "Species is required" }}
              render={({ field }) => (
                <Select {...field} aria-label="Species">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Species" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tomato">Tomato</SelectItem>
                    <SelectItem value="potato">Potato</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.species && (
              <span className="text-sm text-red-500">
                {errors.species.message}
              </span>
            )}
          </div>

          {/* Health Status Select */}
          <div className="space-y-1">
            <Controller
              name="healthStatus"
              control={control}
              rules={{ required: "Health Status is required" }}
              render={({ field }) => (
                <Select {...field} aria-label="Health Status">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Health Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthy">Healthy</SelectItem>
                    <SelectItem value="sick">sick</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.healthStatus && (
              <span className="text-sm text-red-500">
                {errors.healthStatus.message}
              </span>
            )}
          </div>

          {/* Location */}
          <div className="space-y-1">
            <Input
              {...register("location")}
              placeholder="Location (optional)"
              aria-label="Location"
              className="w-full"
            />
          </div>

          {/* Variety */}
          <div className="space-y-1">
            <Input
              {...register("variety")}
              placeholder="Variety (optional)"
              aria-label="Variety"
              className="w-full"
            />
          </div>

          {/* Height */}
          <div className="space-y-1">
            <Input
              {...register("height", { valueAsNumber: true })}
              type="number"
              placeholder="Height (cm)"
              aria-label="Height in centimeters"
              className="w-full"
            />
          </div>

          {/* careInstructions */}
          <div className="space-y-1">
            <Input
              {...register("careInstructions")}
              placeholder="Care Instructions (optional)"
              aria-label="Care Instructions"
              className="w-full"
            />
          </div>

          {/* Watering Frequency */}
          <div className="space-y-1">
            <Input
              {...register("wateringFrequency", { valueAsNumber: true })}
              type="number"
              placeholder="Watering Frequency (days)"
              aria-label="Watering Frequency in days"
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Plant</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlantForm;
