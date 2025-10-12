import { BoxesIcon, Home, Package } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { LogoA, NavUser } from "@/components";
import { useAuth } from "@/hooks";
import { useNavigate } from "react-router";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: BoxesIcon,
  },
  {
    title: "Product Variants",
    url: "/dashboard/products-variants",
    icon: Package,
  },
  // {
  //   title: "Settings",
  //   url: "/dashboard/settings",
  //   icon: Settings,
  // },
];

export function AppSidebar() {
  const { signout, user } = useAuth();
  const navigate = useNavigate();

  const onSignout = () => {
    signout();
    navigate("/sign-in");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="size-6 ml-1">
          <LogoA />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user!} onSignout={onSignout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
