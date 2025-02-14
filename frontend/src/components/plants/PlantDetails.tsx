// src/components/plants/PlantDetails.tsx
import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { Plant } from "../../types/plant";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/card";
import Button from "../ui/button";
import Input from "../ui/input";
import { Table, TableBody, TableRow, TableCell } from "../ui/table";
import { Plus, Droplets, Calendar, AlertTriangle } from "lucide-react";
import PlantMeasurements from "./PlantMeasurements";
import MeasurementList from "../measurements/MeasurementList";
import DiseaseList from "../diseases/DiseaseList";
import MeasurementForm from "../measurements/MeasurementForm";
import AddDiseaseForm from "../diseases/AddDiseaseForm";
import { useToast } from "../ui/use-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Measurement } from "types/measurement";
import { Disease } from "types/disease";

interface PlantDetailsProps {
  plant: Plant;
  onUpdate?: (plantData: Partial<Plant>) => Promise<void>;
  onAddMeasurement?: (data: any) => Promise<void>;
  onUpdateMeasurement?: (measurement: any) => void;
  onDeleteMeasurement?: (measurementId: number) => void;
  onAddDisease?: (data: any) => Promise<void>;
  onUpdateDisease?: (disease: any) => void;
  onDeleteDisease?: (diseaseId: number) => void;
}

const noop = () => {};

const PlantDetails: React.FC<PlantDetailsProps> = ({
  plant,
  onUpdate = noop,
  onAddMeasurement,
  onUpdateMeasurement = noop,
  onDeleteMeasurement = noop,
  onAddDisease,
  onUpdateDisease = noop,
  onDeleteDisease = noop,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showCareSchedule, setShowCareSchedule] = useState(false);
  const [showMeasurementForm, setShowMeasurementForm] = useState(false);
  const [measurementView, setMeasurementView] = useState<"chart" | "list">(
    "list"
  );
  const [showDiseaseForm, setShowDiseaseForm] = useState(false);
  const { addToast } = useToast();

  // Use only the fields allowed for editing.
  const [editedPlant, setEditedPlant] = useState<Partial<Plant>>({
    name: plant.name,
    species: plant.species,
    variety: plant.variety,
    location: plant.location,
    healthStatus: plant.healthStatus,
    careInstructions: plant.careInstructions,
    wateringFrequency: plant.wateringFrequency,
  });

  const { control } = useForm({
    defaultValues: {
      healthStatus: editedPlant.healthStatus || "",
    },
  });

  const handleChange = (field: keyof Plant, value: any) => {
    setEditedPlant((prev) => ({ ...prev, [field]: value }));
  };

  // Sanitize data: whitelist only allowed keys.
  const getSanitizedPlantData = (data: Partial<Plant>) => {
    return {
      name: data.name,
      species: data.species,
      variety: data.variety,
      location: data.location,
      careInstructions: data.careInstructions,
      wateringFrequency: data.wateringFrequency,
      healthStatus: data.healthStatus,
      // Optionally include other allowed fields
    };
  };

  const handleSave = async () => {
    try {
      const sanitizedData = getSanitizedPlantData({ ...plant, ...editedPlant });
      // Call onUpdate with the merged data.
      await onUpdate({ ...plant, ...sanitizedData });
      setIsEditing(false);
      addToast({
        title: "Plant Updated",
        description: "Your plant details have been successfully updated.",
        variant: "default",
      });
    } catch (error) {
      addToast({
        title: "Update Failed",
        description: "Failed to update plant details. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating plant:", error);
    }
  };

  const handleWaterPlant = useCallback(async () => {
    try {
      await onUpdate({ ...plant, lastWatered: new Date().toISOString() });
      addToast({
        title: "Plant Watered",
        description: "Watering schedule has been updated.",
        variant: "default",
      });
    } catch (error) {
      addToast({
        title: "Action Failed",
        description: "Failed to update watering schedule.",
        variant: "destructive",
      });
    }
  }, [plant, onUpdate, addToast]);

  const getDaysSinceWatering = () => {
    if (!plant.lastWatered) return null;
    const days = Math.floor(
      (new Date().getTime() - new Date(plant.lastWatered).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return days;
  };

  const getNextWateringDate = () => {
    if (!plant.lastWatered || !plant.wateringFrequency) return null;
    const lastWatered = new Date(plant.lastWatered);
    return new Date(
      lastWatered.getTime() + plant.wateringFrequency * 24 * 60 * 60 * 1000
    );
  };

  const [measurementToEdit, setMeasurementToEdit] =
    useState<Measurement | null>(null);

  // Update the onUpdate callback passed to MeasurementList
  const handleUpdateMeasurement = (measurement: Measurement) => {
    setMeasurementToEdit(measurement);
  };

  const [diseaseToEdit, setDiseaseToEdit] = useState<Disease | null>(null);

  const handleUpdateDisease = (disease: Disease) => {
    setDiseaseToEdit(disease);
  };

  return (
    <div className="space-y-8">
      {/* Quick Actions Bar */}
      <div className="sticky top-0 bg-white z-10 p-4 border rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={handleWaterPlant}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2"
          >
            <Droplets className="w-4 h-4" />
            Water Plant
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowCareSchedule(!showCareSchedule)}
            className="hover:bg-gray-50 flex items-center gap-2 px-4 py-2"
          >
            <Calendar className="w-4 h-4" />
            {showCareSchedule ? "Hide Schedule" : "Care Schedule"}
          </Button>
        </div>
      </div>

      {/* Main Plant Details Card */}
      <Card className="border rounded-lg shadow-sm">
        <CardHeader className="border-b bg-gray-50 flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">
            {isEditing ? "Edit Plant Details" : plant.name}
          </CardTitle>
          {!isEditing &&
            getDaysSinceWatering() &&
            getDaysSinceWatering()! > (plant.wateringFrequency || 7) && (
              <div className="flex items-center text-red-500 gap-2 bg-red-50 px-3 py-1 rounded-full">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-medium">Needs Water!</span>
              </div>
            )}
        </CardHeader>
        <CardContent className="p-6">
          {isEditing ? (
            // Edit Form for plant details
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input
                    value={editedPlant.name ?? ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Species
                  </label>
                  <Input
                    value={editedPlant.species ?? ""}
                    onChange={(e) => handleChange("species", e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Variety
                  </label>
                  <Input
                    value={editedPlant.variety ?? ""}
                    onChange={(e) => handleChange("variety", e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <Input
                    value={editedPlant.location ?? ""}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Watering Frequency (days)
                  </label>
                  <Input
                    value={editedPlant.wateringFrequency ?? 7}
                    type="number"
                    onChange={(e) =>
                      handleChange("wateringFrequency", Number(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Care Instructions
                  </label>
                  <Input
                    value={editedPlant.careInstructions ?? ""}
                    onChange={(e) =>
                      handleChange("careInstructions", e.target.value)
                    }
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 col-span-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Health Status
                  </label>
                  <Controller
                    control={control}
                    name="healthStatus"
                    rules={{ required: "Health Status is required" }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          handleChange("healthStatus", e.target.value);
                        }}
                        aria-label="Health Status"
                      >
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
                </div>
              </div>
              <div className="flex gap-2 mt-4 col-span-2">
                <Button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="hover:bg-gray-50"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            // Display Plant Details
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="text-lg font-medium mb-4">
                    Basic Information
                  </h3>
                  <Table>
                    <TableBody>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-600 w-1/3">
                          Species
                        </TableCell>
                        <TableCell>{plant.species}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-600 w-1/3">
                          Variety
                        </TableCell>
                        <TableCell>{plant.variety}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-600 w-1/3">
                          Location
                        </TableCell>
                        <TableCell>{plant.location}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-600 w-1/3">
                          Health Status
                        </TableCell>
                        <TableCell>{plant.healthStatus}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Watering Information */}
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="text-lg font-medium mb-4">
                    Watering Information
                  </h3>
                  <Table>
                    <TableBody>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-600 w-1/3">
                          Last Watered
                        </TableCell>
                        <TableCell>
                          {plant.lastWatered
                            ? `${getDaysSinceWatering()} days ago`
                            : "No record"}
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-600 w-1/3">
                          Next Watering
                        </TableCell>
                        <TableCell>
                          {getNextWateringDate()
                            ? new Date(
                                getNextWateringDate() as Date
                              ).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Care Instructions */}
              {plant.careInstructions && (
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="text-lg font-medium mb-2">
                    Care Instructions
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {plant.careInstructions}
                  </p>
                </div>
              )}

              {/* Edit Control */}
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Edit Plant
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Measurements Section */}
      <Card className="border rounded-lg shadow-sm">
        <CardHeader className="border-b bg-gray-50 flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">
            Measurements History
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() =>
                setMeasurementView(
                  measurementView === "chart" ? "list" : "chart"
                )
              }
            >
              {measurementView === "chart" ? "View List" : "View Charts"}
            </Button>
            <Button onClick={() => setShowMeasurementForm(true)}>
              Add Measurement
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {measurementView === "chart" ? (
            <PlantMeasurements measurements={plant.measurements} />
          ) : (
            <MeasurementList
              measurements={plant.measurements}
              onUpdate={handleUpdateMeasurement}
              onDelete={(id) => onDeleteMeasurement(id)}
            />
          )}
        </CardContent>
      </Card>

      {/* Diseases Section */}
      <Card className="border rounded-lg shadow-sm">
        <CardHeader className="border-b bg-gray-50 flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">
            Disease History
          </CardTitle>
          <div>
            <Button
              onClick={() => setShowDiseaseForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Record Disease
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <DiseaseList
            diseases={plant.diseases}
            onUpdate={handleUpdateDisease}
            onDelete={(id) => onDeleteDisease(id)}
          />
        </CardContent>
      </Card>

      {/* Care Schedule Section */}
      {showCareSchedule && (
        <Card className="border rounded-lg shadow-sm">
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-xl font-semibold">
              Care Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-gray-600">Care schedule details...</div>
          </CardContent>
        </Card>
      )}

      {/* Measurement Form Modal */}
      {showMeasurementForm && (
        <MeasurementForm
          isOpen={showMeasurementForm}
          onClose={() => setShowMeasurementForm(false)}
          onSubmit={async (data) => {
            if (onAddMeasurement) {
              await onAddMeasurement(data);
            }
            setShowMeasurementForm(false);
          }}
          plantId={plant.id}
        />
      )}

      {/* Update Measurement Form Modal */}
      {measurementToEdit && (
        <MeasurementForm
          isOpen={true}
          onClose={() => setMeasurementToEdit(null)}
          onSubmit={async (data) => {
            // Include measurement ID or any extra fields if needed for updating.
            const updatedMeasurement = {
              ...data,
              id: measurementToEdit.id,
              plantId: plant.id,
            };
            await onUpdateMeasurement(updatedMeasurement);
            setMeasurementToEdit(null);
          }}
          plantId={plant.id}
          initialData={measurementToEdit}
        />
      )}

      {/* Add Disease Form Modal */}
      {showDiseaseForm && (
        <AddDiseaseForm
          isOpen={showDiseaseForm}
          onClose={() => setShowDiseaseForm(false)}
          onSubmit={async (data) => {
            if (onAddDisease) {
              await onAddDisease(data);
            }
            setShowDiseaseForm(false);
          }}
          plantId={plant.id}
        />
      )}

      {/* Update Disease Form Modal */}
      {diseaseToEdit && (
        <AddDiseaseForm
          isOpen={true}
          onClose={() => setDiseaseToEdit(null)}
          onSubmit={async (data) => {
            // Include disease ID or any extra fields if needed for updating.
            const updatedDisease = {
              ...data,
              id: diseaseToEdit.id,
              plantId: plant.id,
            };
            await onUpdateDisease(updatedDisease);
            setDiseaseToEdit(null);
          }}
          plantId={plant.id}
          initialData={diseaseToEdit}
        />
      )}
    </div>
  );
};

export default PlantDetails;
