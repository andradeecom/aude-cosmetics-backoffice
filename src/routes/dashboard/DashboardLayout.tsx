import { Outlet } from "react-router";
import { AppSidebar, AppHeader } from "@/components";
import { SidebarProvider } from "@/contexts";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-4 md:p-6">
        <AppHeader />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
