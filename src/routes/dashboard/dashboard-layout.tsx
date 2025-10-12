import { Outlet } from "react-router";
import { AppSidebar, AppHeader } from "@/components";
import { SidebarProvider } from "@/contexts";
import { Toaster } from "@/components/ui/sonner";

export const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-4 md:p-6">
        <AppHeader />
        <Outlet />
        <Toaster position="top-right" duration={5000} />
      </main>
    </SidebarProvider>
  );
};
