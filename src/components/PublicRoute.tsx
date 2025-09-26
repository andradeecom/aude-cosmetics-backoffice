import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

interface PublicRouteProps {
  children: ReactNode;
}

/**
 * Public route component that redirects authenticated users to the dashboard
 * This prevents authenticated users from accessing public routes like sign-in
 */
export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, render the public route content
  return <>{children}</>;
}
