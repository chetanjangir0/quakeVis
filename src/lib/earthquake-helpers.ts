export const getMagnitudeColor = (magnitude: number): string => {
  if (magnitude < 3) return "#4caf50"; // green
  if (magnitude < 5) return "#ffc107"; // amber
  if (magnitude < 7) return "#ff9800"; // orange
  return "#f44336"; // red
};

export const magnitudeLevels = [
  { range: "0 - 2.9", color: getMagnitudeColor(2), description: "Minor" },
  {
    range: "3.0 - 4.9",
    color: getMagnitudeColor(4),
    description: "Light to Moderate",
  },
  { range: "5.0 - 6.9", color: getMagnitudeColor(6), description: "Strong" },
  { range: "7.0+", color: getMagnitudeColor(8), description: "Major" },
];

export const clusterCountLevels = [
  {
    range: "Over 50",
    description: "Very High Density",
    color: "#111827",
  },
  {
    range: "21 - 50",
    description: "High Density",
    color: "#374151",
  },
  {
    range: "6 - 20",
    description: "Moderate Density",
    color: "#9ca3af",
  },
  {
    range: "1 - 5",
    description: "Low Density",
    color: "#6b7280",
  },
];
