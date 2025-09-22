import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContextDefinition";
import { AuthService } from "../services/auth.service";
import { getCookie } from "../services/cookie";
import type { User } from "../types/sign-in-response";
import { eventBus, AUTH_EVENTS } from "../services/events";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Handle session expiration
  const handleSessionExpired = useCallback((data: { reason: string }) => {
    console.warn("Session expired:", data.reason);
    signout();
    setError("Your session has expired. Please sign in again.");
  }, []);

  // Check authentication status on mount and set up event listeners
  useEffect(() => {
    // Subscribe to session expired events
    const unsubscribe = eventBus.on(AUTH_EVENTS.SESSION_EXPIRED, handleSessionExpired);

    const checkAuth = () => {
      try {
        const hasToken = !!getCookie("accessToken");
        const storedUser = localStorage.getItem("user");

        if (hasToken && storedUser) {
          // We have both token and user data - user is authenticated
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } else if (hasToken && !storedUser) {
          // We have token but no user data - this shouldn't happen in normal flow
          // Let's trust the token and set a minimal user state
          // The API interceptor will handle token validation on actual requests
          console.warn("Token found but no user data in localStorage");
          setIsAuthenticated(true);
          setUser({ id: "", email: "", firstName: "User", lastName: "", role: "EMPLOYEE" } as User);
        } else {
          // No token - user is not authenticated
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        console.error("Error checking authentication:", err);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Clean up event listener on unmount
    return () => {
      unsubscribe();
    };
  }, [handleSessionExpired]);

  const signin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await AuthService.signIn({ email, password });

      if (result.success && result.user) {
        setIsAuthenticated(true);
        setUser(result.user);

        localStorage.setItem("user", JSON.stringify(result.user));

        return { success: true };
      } else {
        setError(result.error || "Failed to sign in");
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signout = () => {
    AuthService.signOut();
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signin, signout, user, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}
