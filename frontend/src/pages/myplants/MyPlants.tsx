// src/pages/myplants/MyPlants.tsx
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import PlantList from "../../components/plants/PlantList";
import AddPlantForm from "../../components/plants/AddPlantForm";
import PlantDetailsModal from "../../components/plants/PlantDetailsModal";
import { usePlantsGraphQL } from "../../hooks/usePlantsGraphQL";
import { useAddPlantGraphQL } from "../../hooks/useAddPlantGraphQL";
import { useUpdatePlantGraphQL } from "../../hooks/useUpdatePlantGraphQL";
import { useDeletePlantGraphQL } from "../../hooks/useDeletePlantGraphQL";
import { useAddMeasurementGraphQL } from "../../hooks/useAddMeasurementGraphQL";
import { useUpdateMeasurementGraphQL } from "../../hooks/useUpdateMeasurementGraphQL";
import { useDeleteMeasurementGraphQL } from "../../hooks/useDeleteMeasurementGraphQL";
import { useAddDiseaseGraphQL } from "../../hooks/useAddDiseaseGraphQL";
import { useUpdateDiseaseGraphQL } from "../../hooks/useUpdateDiseaseGraphQL";
import { useDeleteDiseaseGraphQL } from "../../hooks/useDeleteDiseaseGraphQL";
import { Plant, PlantCreate } from "../../types/plant";
import { Measurement, MeasurementCreate } from "../../types/measurement";
import { Disease, DiseaseCreate } from "../../types/disease";

const MyPlants: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id ?? 0;
  const [showAddPlantForm, setShowAddPlantForm] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const { data, loading, error, refetch } = usePlantsGraphQL(userId);
  const [addPlantMutation] = useAddPlantGraphQL();
  const [updatePlantMutation] = useUpdatePlantGraphQL();
  const [deletePlantMutation] = useDeletePlantGraphQL();

  const [addMeasurementMutation] = useAddMeasurementGraphQL();
  const [updateMeasurementMutation] = useUpdateMeasurementGraphQL();
  const [deleteMeasurementMutation] = useDeleteMeasurementGraphQL();

  const [addDiseaseMutation] = useAddDiseaseGraphQL();
  const [updateDiseaseMutation] = useUpdateDiseaseGraphQL();
  const [deleteDiseaseMutation] = useDeleteDiseaseGraphQL();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading plants: {error.message}</div>;

  const handleAddPlant = async (plantData: PlantCreate) => {
    try {
      await addPlantMutation({ variables: { plantData } });
      setShowAddPlantForm(false);
      refetch();
    } catch (err) {
      console.error("Error adding plant:", err);
    }
  };

  const handleUpdatePlant = async (updatedPlant: Plant) => {
    try {
      // Create an object with only the allowed keys (convert to snake_case)
      const sanitizedData = {
        name: updatedPlant.name,
        species: updatedPlant.species,
        variety: updatedPlant.variety,
        location: updatedPlant.location,
        healthStatus: updatedPlant.healthStatus,
        careInstructions: updatedPlant.careInstructions,
        wateringFrequency: updatedPlant.wateringFrequency,
        growthStage: updatedPlant.growthStage,
        height: updatedPlant.height,
        user_id: updatedPlant.user_id,
      };

      await updatePlantMutation({
        variables: { plantId: updatedPlant.id, plantData: sanitizedData },
      });
      refetch();
      setSelectedPlant(null);
    } catch (err) {
      console.error("Error updating plant:", err);
    }
  };

  const handleDeletePlant = async (plantId: number) => {
    try {
      if (window.confirm("Are you sure you want to delete this plant?")) {
        await deletePlantMutation({ variables: { plantId } });
        refetch();
        setSelectedPlant(null);
      }
    } catch (err) {
      console.error("Error deleting plant:", err);
    }
  };

  const handleAddMeasurement = async (measurementData: MeasurementCreate) => {
    try {
      await addMeasurementMutation({ variables: { measurementData } });
      refetch();
      setSelectedPlant(null);
    } catch (err) {
      console.error("Error adding measurement:", err);
    }
  };

  const handleUpdateMeasurement = async (updatedMeasurement: Measurement) => {
    try {
      const sanitizedMeasurementData = {
        temperature: updatedMeasurement.temperature,
        humidity: updatedMeasurement.humidity,
        soilMoisture: updatedMeasurement.soilMoisture,
        lightIntensity: updatedMeasurement.lightIntensity,
        plantId: updatedMeasurement.plantId,
      };
      await updateMeasurementMutation({
        variables: {
          measurementId: updatedMeasurement.id,
          measurementData: sanitizedMeasurementData,
        },
      });
      refetch();
      setSelectedPlant(null);
    } catch (err) {
      console.error("Error updating measurement:", err);
    }
  };

  const handleDeleteMeasurement = async (measurementId: number) => {
    try {
      if (window.confirm("Are you sure you want to delete this measurement?")) {
        await deleteMeasurementMutation({ variables: { measurementId } });
        refetch();
        setSelectedPlant(null);
      }
    } catch (err) {
      console.error("Error deleting measurement:", err);
    }
  };

  const handleAddDisease = async (diseaseData: DiseaseCreate) => {
    try {
      await addDiseaseMutation({ variables: { diseaseData } });
      refetch();
      setSelectedPlant(null);
    } catch (err) {
      console.error("Error adding disease:", err);
    }
  };

  const handleUpdateDisease = async (updatedDisease: Disease) => {
    try {
      const sanitizedDiseaseData = {
        name: updatedDisease.name,
        symptoms: updatedDisease.symptoms,
        severity: updatedDisease.severity,
        treatment: updatedDisease.treatment,
        plantId: updatedDisease.plantId,
      };
      await updateDiseaseMutation({
        variables: {
          diseaseId: updatedDisease.id,
          diseaseData: sanitizedDiseaseData,
        },
      });
      refetch();
      setSelectedPlant(null);
    } catch (err) {
      console.error("Error updating disease:", err);
    }
  };

  const handleDeleteDisease = async (diseaseId: number) => {
    try {
      if (window.confirm("Are you sure you want to delete this disease?")) {
        await deleteDiseaseMutation({ variables: { diseaseId } });
        refetch();
        setSelectedPlant(null);
      }
    } catch (err) {
      console.error("Error deleting disease:", err);
    }
  };

  return (
    <>
      <PlantList
        plants={data?.plantsByUser || []}
        onAddClick={() => setShowAddPlantForm(true)}
        onSelectPlant={(plant) => setSelectedPlant(plant)}
      />
      {showAddPlantForm && (
        <AddPlantForm
          isOpen={showAddPlantForm}
          onClose={() => setShowAddPlantForm(false)}
          onSubmit={handleAddPlant}
        />
      )}
      {selectedPlant && (
        <PlantDetailsModal
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
          onUpdate={handleUpdatePlant}
          onDelete={handleDeletePlant}
          onAddMeasurement={handleAddMeasurement}
          onUpdateMeasurement={handleUpdateMeasurement}
          onDeleteMeasurement={handleDeleteMeasurement}
          onAddDisease={handleAddDisease}
          onUpdateDisease={handleUpdateDisease}
          onDeleteDisease={handleDeleteDisease}
        />
      )}
    </>
  );
};

export default MyPlants;
