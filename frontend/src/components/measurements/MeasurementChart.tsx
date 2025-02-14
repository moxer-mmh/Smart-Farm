// src/components/measurements/MeasurementChart.tsx
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Measurement } from "../../types/measurement";

interface MeasurementChartProps {
  measurements: Measurement[];
  type: "temperature" | "humidity" | "soilMoisture" | "lightIntensity";
}

const MeasurementChart: React.FC<MeasurementChartProps> = ({
  measurements,
  type,
}) => {
  const data = useMemo(() => {
    return measurements.map((m) => ({
      timestamp: new Date(m.timestamp).toLocaleDateString(),
      value: m[type],
    }));
  }, [measurements, type]);

  const getChartColor = () => {
    switch (type) {
      case "temperature":
        return "#ef4444";
      case "humidity":
        return "#3b82f6";
      case "soilMoisture":
        return "#22c55e";
      case "lightIntensity":
        return "#eab308";
      default:
        return "#000000";
    }
  };

  const getTitle = () => {
    switch (type) {
      case "temperature":
        return "Temperature (°C)";
      case "humidity":
        return "Humidity (%)";
      case "soilMoisture":
        return "Soil Moisture (%)";
      case "lightIntensity":
        return "Light Intensity (lux)";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke={getChartColor()}
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MeasurementChart;
