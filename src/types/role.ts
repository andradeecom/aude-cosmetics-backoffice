export const ROLE_TYPES = {
  ADMIN: "Admin",
  EMPLOYEE: "Employee",
} as const;

export type Role = (typeof ROLE_TYPES)[keyof typeof ROLE_TYPES];
