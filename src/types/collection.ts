export const COLLECTION_TYPES = {
  REGENERATION: "regeneration",
  HYDRATION: "hydration",
  NUTRITION: "nutrition",
} as const;

export type Collection = (typeof COLLECTION_TYPES)[keyof typeof COLLECTION_TYPES];
