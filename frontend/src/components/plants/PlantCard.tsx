import React from "react";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/card";
import Badge from "../ui/badge";
import { CalendarIcon, Sprout, Thermometer, Droplets } from "lucide-react";
import { Plant } from "../../types/plant";

interface PlantCardProps {
  plant: Plant;
  onClick: (id: number) => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onClick }) => {
  const getHealthColor = (status?: string) => {
    const normalizedStatus = status?.toLowerCase() || "healthy";
    switch (normalizedStatus) {
      case "healthy":
        return "success";
      case "sick":
        return "error";
      case "recovering":
        return "warning";
      default:
        return "default";
    }
  };

  const getLastMeasurement = (
    type: "temperature" | "humidity" | "soilMoisture" | "lightIntensity"
  ) => {
    if (!plant.measurements?.length) return null;
    const lastMeasurement = plant.measurements[plant.measurements.length - 1];
    return lastMeasurement[type];
  };

  const getDaysSinceWatering = () => {
    if (!plant.lastWatered) return null;
    const days = Math.floor(
      (new Date().getTime() - new Date(plant.lastWatered).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return days;
  };

  const needsWatering = () => {
    const days = getDaysSinceWatering();
    if (days === null) return false;
    return days > 3; // Adjust threshold as needed
  };

  return (
    <Card
      onClick={() => onClick(plant.id)}
      className="cursor-pointer hover:shadow-lg transition-shadow relative"
    >
      {needsWatering() && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2">
          <Droplets className="w-4 h-4" />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{plant.name}</CardTitle>
          <Badge variant={getHealthColor(plant.healthStatus)}>
            {plant.healthStatus || "Healthy"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4" />
            <span>{plant.species}</span>
            {plant.variety && (
              <span className="text-gray-500">({plant.variety})</span>
            )}
          </div>

          {plant.lastWatered && (
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              <span>Watered {getDaysSinceWatering()} days ago</span>
            </div>
          )}

          {getLastMeasurement("temperature") !== null && (
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4" />
              <span>{getLastMeasurement("temperature")}°C</span>
            </div>
          )}

          {plant.location && (
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span>{plant.location}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlantCard;
