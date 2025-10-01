import { Separator } from "@/components/ui/separator";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "react-router";
import { AppBreadcrumbs } from "@/components";

export const AppHeader = () => {
  const { pathname } = useLocation();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <AppBreadcrumbs pathname={pathname} />
      </div>
    </header>
  );
};
