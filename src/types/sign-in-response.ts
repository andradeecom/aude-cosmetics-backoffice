export interface SignInResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
  message: string;
  status: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export type Role = "ADMIN" | "EMPLOYEE";

export interface ErrorResponse {
  error: string;
  message: string;
  status: string;
  statusCode: number;
}
