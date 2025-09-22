import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContextDefinition";
import { AuthService } from "../services/auth.service";
import { getCookie } from "../services/cookie";
import type { User } from "../types/sign-in-response";
import { eventBus, AUTH_EVENTS } from "../services/events";
import api from "../services/api";

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

    const checkAuth = async () => {
      try {
        const hasToken = !!getCookie("accessToken");

        if (hasToken) {
          // Check if token is about to expire and refresh it if needed
          await AuthService.checkTokenExpiration();

          // Get user data from localStorage (temporary until we have a proper /me endpoint)
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
          } else {
            // If we have a token but no user data, try to fetch user data from API
            try {
              // This assumes you have or will implement a /me endpoint
              const response = await api.get("/api/auth/me");
              if (response.data && response.data.data) {
                const userData = response.data.data;
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
                setIsAuthenticated(true);
              } else {
                // If the API call fails or returns no data, clear tokens
                AuthService.signOut();
                setIsAuthenticated(false);
              }
            } catch (apiError) {
              console.error("Error fetching user data:", apiError);
              // If the API call fails, clear tokens
              AuthService.signOut();
              setIsAuthenticated(false);
            }
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Error checking authentication:", err);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Set up periodic token check (every 5 minutes)
    const tokenCheckInterval = setInterval(() => {
      if (isAuthenticated) {
        AuthService.checkTokenExpiration();
      }
    }, 5 * 60 * 1000);

    // Clean up event listener and interval on unmount
    return () => {
      unsubscribe();
      clearInterval(tokenCheckInterval);
    };
  }, [handleSessionExpired, isAuthenticated]);

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
