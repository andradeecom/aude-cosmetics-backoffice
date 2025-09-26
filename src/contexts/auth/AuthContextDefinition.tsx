import { createContext } from "react";
import type { UserSignInResponse } from "@/types";
export interface AuthContextType {
  isAuthenticated: boolean;
  signin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signout: () => void;
  user: UserSignInResponse | null;
  isLoading: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
