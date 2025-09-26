import type { BaseModel, Role } from "@/types";

export interface User extends BaseModel {
  email: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export type UserSignInResponse = Omit<User, "hashedPassword">;
