// src/components/diseases/AddDiseaseForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Button from "../ui/button";
import Input from "../ui/input";
import { Disease, DiseaseCreate } from "../../types/disease";

interface AddDiseaseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DiseaseCreate) => Promise<void>;
  plantId: number;
  initialData?: Disease;
}

const AddDiseaseForm: React.FC<AddDiseaseFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  plantId,
  initialData,
}) => {
  const { register, handleSubmit } = useForm<DiseaseCreate>({
    defaultValues: initialData || {},
  });

  const onSubmitForm = async (data: DiseaseCreate) => {
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
            {initialData ? "Update Disease" : "Add New Disease"}
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
            {...register("name", { required: "Disease name is required" })}
            placeholder="Disease Name"
            className="w-full"
          />
          <Input
            {...register("symptoms")}
            placeholder="Symptoms (optional)"
            className="w-full"
          />
          <Input
            {...register("severity")}
            placeholder="Severity (optional)"
            className="w-full"
          />
          <Input
            {...register("treatment")}
            placeholder="Treatment (optional)"
            className="w-full"
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{initialData ? "Update" : "Add"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDiseaseForm;
