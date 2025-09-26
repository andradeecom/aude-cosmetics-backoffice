import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "@/contexts";
import { ProtectedRoute, PublicRoute, RootRedirect } from "@/components";
import AuthLayout from "@/pages/auth/AuthLayout.tsx";
import SignInPage from "@/pages/auth/sign-in/SignInPage.tsx";
import DashboardLayout from "@/pages/dashboard/DashboardLayout.tsx";
import Home from "@/pages/dashboard/HomePage";
import ProductsPage from "@/pages/dashboard/products/ProductsPage";
import ProductDetailsPage from "@/pages/dashboard/products/ProductDetailsPage";
import ProductsVariants from "@/pages/dashboard/products-variants/ProductsVariantsPage";
import Settings from "@/pages/dashboard/SettingsPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Smart root redirect based on authentication status */}
          <Route path="/" element={<RootRedirect />} />

          {/* Public routes - redirect to dashboard if already authenticated */}
          <Route element={<AuthLayout />}>
            <Route
              path="sign-in"
              element={
                <PublicRoute>
                  <SignInPage />
                </PublicRoute>
              }
            />
          </Route>

          {/* Protected routes */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="products">
              <Route index element={<ProductsPage />} />
              <Route path=":id" element={<ProductDetailsPage />} />
            </Route>
            <Route path="products-variants" element={<ProductsVariants />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
