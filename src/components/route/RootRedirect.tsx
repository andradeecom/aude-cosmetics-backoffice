import { Navigate } from "react-router";
import { useAuth } from "@/hooks";

/**
 * Smart root redirect component that redirects based on authentication status
 * - If authenticated: redirect to dashboard
 * - If not authenticated: redirect to sign-in
 * - If loading: show loading state
 */
export function RootRedirect() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Redirect based on authentication status
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/sign-in" replace />;
  }
}
