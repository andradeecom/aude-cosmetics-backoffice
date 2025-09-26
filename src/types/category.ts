export const CATEGORY_TYPES = {
  SHAMPOO: "shampoo",
  MASK: "mask",
  OIL: "oil",
  LEAVE_IN: "leave-in",
  STRAIGHTENER: "straightener",
} as const;

export type Category = (typeof CATEGORY_TYPES)[keyof typeof CATEGORY_TYPES];
