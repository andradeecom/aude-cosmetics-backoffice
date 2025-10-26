import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "@/contexts";
import { ProtectedRoute, PublicRoute, RootRedirect } from "@/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AuthLayout,
  SignInPage,
  DashboardLayout,
  // HomePage,
  ProductsListPage,
  ProductDetailsPage,
  ProductCreatePage,
  ProductVariantsListPage,
  // SettingsPage,
  ProductUpdatePage,
  ProductVariantDetailsPage,
  ProductVariantCreatePage,
  ProductVariantUpdatePage,
  AddAssetPage,
  NotFoundPage,
} from "@/routes";

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
              {/* Uncomment next line when we have a home page setup */}
              {/* <Route index element={<HomePage />} /> */}
              <Route path="products">
                <Route index element={<ProductsListPage />} />
                <Route path=":id" element={<ProductDetailsPage />} />
                <Route path="create" element={<ProductCreatePage />} />
                <Route path=":id/update" element={<ProductUpdatePage />} />
              </Route>
              <Route path="product-variants">
                <Route index element={<ProductVariantsListPage />} />
                <Route path=":id" element={<ProductVariantDetailsPage />} />
                <Route path="create" element={<ProductVariantCreatePage />} />
                <Route path=":id/update" element={<ProductVariantUpdatePage />} />
                <Route path=":id/add-asset" element={<AddAssetPage />} />
              </Route>
              {/* Uncomment next line when we have a settings page setup */}
              {/* <Route path="settings" element={<SettingsPage />} /> */}
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}
