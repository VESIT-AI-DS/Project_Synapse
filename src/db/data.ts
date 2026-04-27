import data_24 from "./2023-24.json";
import data_25 from "./2024-25.json";
import data_26 from "./2025-26.json";
import data_27 from "./2026-27.json";

export const dbs: Record<string, any> = {
  "2023-24": data_24,
  "2024-25": data_25,
  "2025-26": data_26,
};

// 🔥 Generic function to normalize data
export const getProjectsByYear = (year: string) => {
  const data = dbs[year];

  if (!data) return [];

  // Case 1: No division (array)
  if (Array.isArray(data)) return data;

  // Case 2: Division exists (object)
  return Object.entries(data).flatMap(([division, projects]) =>
    (projects as any[]).map((project) => ({
      ...project,
      division,
    })),
  );
};
