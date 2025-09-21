import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: { email: string } | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
