import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AuthLayout from "./pages/auth/AuthLayout.tsx";
import Login from "./pages/auth/SignIn.tsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.tsx";
import Home from "./pages/dashboard/Home.tsx";
import Products from "./pages/dashboard/Products.tsx";
import ProductsVariants from "./pages/dashboard/ProductsVariants.tsx";
import Settings from "./pages/dashboard/Settings.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public routes */}
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
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
