import { createContext } from "react";
import type { User } from "@/types/sign-in-response";
export interface AuthContextType {
  isAuthenticated: boolean;
  signin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signout: () => void;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
