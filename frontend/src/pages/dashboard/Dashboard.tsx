// src/pages/dashboard/Dashboard.tsx
import React from "react";
import { useAllPlantsGraphQL } from "../../hooks/useAllPlantsGraphQL";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Dashboard: React.FC = () => {
  const { data, loading, error } = useAllPlantsGraphQL();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading plants: {error.message}</div>;

  // Health Status Distribution Data (existing)
  const statusCounts = data?.plants.reduce((acc, plant) => {
    const status = plant.healthStatus
      ? plant.healthStatus.toLowerCase()
      : "unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const healthChartData = Object.entries(statusCounts || {}).map(
    ([key, value]) => ({
      name: key,
      value,
    })
  );

  // Species Distribution Data (assumes each plant has a species property)
  const speciesCounts = data?.plants.reduce((acc, plant) => {
    const species = plant.species || "unknown";
    acc[species] = (acc[species] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const speciesChartData = Object.entries(speciesCounts || {}).map(
    ([key, value]) => ({
      name: key,
      value,
    })
  );

  // Height Distribution Data (assumes each plant has a height property in cm)
  const heightBuckets = {
    "Short (<30cm)": 0,
    "Medium (30-60cm)": 0,
    "Tall (60-90cm)": 0,
    "Very Tall (>90cm)": 0,
  };
  data?.plants.forEach((plant) => {
    const height = plant.height;
    if (typeof height === "number") {
      if (height < 30) {
        heightBuckets["Short (<30cm)"] += 1;
      } else if (height < 60) {
        heightBuckets["Medium (30-60cm)"] += 1;
      } else if (height < 90) {
        heightBuckets["Tall (60-90cm)"] += 1;
      } else {
        heightBuckets["Very Tall (>90cm)"] += 1;
      }
    }
  });
  const heightChartData = Object.entries(heightBuckets).map(([key, value]) => ({
    name: key,
    value,
  }));

  // Summary Metrics
  const totalPlants = data?.plants.length || 0;
  const averageHeight =
    totalPlants > 0
      ? (
          (data?.plants ?? []).reduce(
            (sum, plant) => sum + (plant.height || 0),
            0
          ) / totalPlants
        ).toFixed(2)
      : "0";
  const uniqueSpecies = Object.keys(speciesCounts || {}).length;

  const COLORS = ["#22c55e", "#ef4444", "#facc15", "#9ca3af"];

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Dashboard - Plant Statistics</h2>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-xl font-semibold">Total Plants</h3>
          <p className="text-3xl">{totalPlants}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-xl font-semibold">Average Height (cm)</h3>
          <p className="text-3xl">{averageHeight}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-xl font-semibold">Unique Species</h3>
          <p className="text-3xl">{uniqueSpecies}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Status Pie Chart */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-xl font-semibold mb-2">
            Health Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={healthChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {healthChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Species Distribution Bar Chart */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-xl font-semibold mb-2">Species Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={speciesChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Height Distribution Bar Chart */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-xl font-semibold mb-2">Height Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={heightChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
