export const CATEGORY_TYPES = {
  SHAMPOO: "Shampoo",
  MASK: "Mask",
  OIL: "Oil",
  LEAVE_IN: "LeaveIn",
  STRAIGHTENER: "Straightener",
} as const;

export type Category = (typeof CATEGORY_TYPES)[keyof typeof CATEGORY_TYPES];
