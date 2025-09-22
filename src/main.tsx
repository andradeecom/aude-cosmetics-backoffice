import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "@/contexts/AuthContext.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import PublicRoute from "@/components/PublicRoute.tsx";
import RootRedirect from "@/components/RootRedirect.tsx";
import AuthLayout from "@/pages/auth/AuthLayout.tsx";
import SignInPage from "@/pages/auth/sign-in/SignInPage.tsx";
import DashboardLayout from "@/pages/dashboard/DashboardLayout.tsx";
import Home from "@/pages/dashboard/HomePage";
import Products from "@/pages/dashboard/products/ProductsPage";
import ProductsVariants from "@/pages/dashboard/products-variants/ProductsVariantsPage";
import Settings from "@/pages/dashboard/SettingsPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Smart root redirect based on authentication status */}
          <Route path="/" element={<RootRedirect />} />

          {/* Public routes - redirect to dashboard if already authenticated */}
          <Route element={<AuthLayout />}>
            <Route path="sign-in" element={<PublicRoute><SignInPage /></PublicRoute>} />
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
            <Route path="products" element={<Products />} />
            <Route path="products-variants" element={<ProductsVariants />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
