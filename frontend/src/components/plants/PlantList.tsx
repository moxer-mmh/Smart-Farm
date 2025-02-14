import React, { useState, useMemo } from "react";
import { Plant } from "../../types/plant";
import PlantCard from "./PlantCard";
import Button from "../ui/button";
import Input from "../ui/input";
import { Plus, Search, Filter } from "lucide-react";

interface PlantListProps {
  plants: Plant[];
  onAddClick: () => void;
  onSelectPlant: (plant: Plant) => void;
}

const PlantList: React.FC<PlantListProps> = ({
  plants,
  onAddClick,
  onSelectPlant,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterHealth, setFilterHealth] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "health" | "date">("name");

  const filteredAndSortedPlants = useMemo(() => {
    return plants
      .filter((plant) => {
        const matchesSearch =
          plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plant.species.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesHealth =
          filterHealth === "all" || plant.healthStatus === filterHealth;
        return matchesSearch && matchesHealth;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name);
          case "health":
            return (a.healthStatus || "").localeCompare(b.healthStatus || "");
          case "date":
            return (
              new Date(b.plantingDate).getTime() -
              new Date(a.plantingDate).getTime()
            );
          default:
            return 0;
        }
      });
  }, [plants, searchTerm, filterHealth, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          My Plants ({filteredAndSortedPlants.length})
        </h2>
        <Button onClick={onAddClick} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Plant
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <select
          value={filterHealth}
          onChange={(e) => setFilterHealth(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="all">All Health Status</option>
          <option value="healthy">Healthy</option>
          <option value="sick">Sick</option>
          <option value="recovering">Recovering</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "name" | "health" | "date")
          }
          className="px-4 py-2 border rounded"
        >
          <option value="name">Sort by Name</option>
          <option value="health">Sort by Health</option>
          <option value="date">Sort by Date</option>
        </select>
      </div>

      {filteredAndSortedPlants.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No plants found matching your criteria
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onClick={() => onSelectPlant(plant)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlantList;
