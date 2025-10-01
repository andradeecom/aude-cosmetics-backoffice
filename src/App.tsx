import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "@/contexts";
import { ProtectedRoute, PublicRoute, RootRedirect } from "@/components";
import AuthLayout from "@/routes/auth/AuthLayout.tsx";
import SignInPage from "@/routes/auth/sign-in/SignInPage.tsx";
import DashboardLayout from "@/routes/dashboard/DashboardLayout.tsx";
import Home from "@/routes/dashboard/HomePage";
import ProductsPage from "@/routes/dashboard/products/ProductsPage";
import ProductDetailsPage from "@/routes/dashboard/products/details/ProductDetailsPage";
import ProductsVariantsPage from "@/routes/dashboard/products-variants/ProductsVariantsPage";
import SettingsPage from "@/routes/dashboard/SettingsPage";
import ProductCreatePage from "@/routes/dashboard/products/create/ProductCreatePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
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
                <Route path="create" element={<ProductCreatePage />} />
              </Route>
              <Route path="products-variants" element={<ProductsVariantsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}
