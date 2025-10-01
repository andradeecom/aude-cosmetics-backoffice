export const COLLECTION_TYPES = {
  REGENERATION: "Regeneration",
  HYDRATION: "Hydration",
  NUTRITION: "Nutrition",
} as const;

export type Collection = (typeof COLLECTION_TYPES)[keyof typeof COLLECTION_TYPES];
