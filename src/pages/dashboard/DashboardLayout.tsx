import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Home, Package, PaintRoller, Settings, type LucideIcon } from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/products-variants", label: "Product Variants", icon: PaintRoller },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout() {
  const { signout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signout();
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 md:px-8 border-b border-gray-200 flex justify-between items-center">
        <h1 className="m-0 text-gray-800 text-xl md:text-2xl font-semibold">Aude Cosmetics Backoffice</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {user?.email}</span>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar>
          <SidebarMenu sidebarLinks={sidebarLinks} />
        </Sidebar>
        {/* <nav className="w-full md:w-64 bg-white p-4 md:p-8 border-b md:border-b-0 md:border-r border-gray-200 md:min-h-[calc(100vh-80px)]">
          <ul className="list-none p-0 m-0 space-y-2">
            <li>
              <SidebarLink href="/dashboard">🏠 Home</SidebarLink>
            </li>
            <li>
              <SidebarLink href="/dashboard/products">📦 Products</SidebarLink>
            </li>
            <li>
              <SidebarLink href="/dashboard/products-variants">🎨 Product Variants</SidebarLink>
            </li>
            <li>
              <SidebarLink href="/dashboard/settings">⚙️ Settings</SidebarLink>
            </li>
          </ul>
        </nav> */}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full md:w-64 bg-white p-4 md:p-8 border-b md:border-b-0 md:border-r border-gray-200 md:min-h-[calc(100vh-80px)]">
      {children}
    </div>
  );
};

const SidebarMenu = ({ sidebarLinks }: { sidebarLinks: { href: string; label: string; icon: LucideIcon }[] }) => {
  return (
    <nav>
      <ul className="list-none p-0 m-0 space-y-2">
        {sidebarLinks.map((link) => (
          <li key={link.href}>
            <SidebarLink href={link.href}>
              <link.icon className="size-5" />
              {link.label}
            </SidebarLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const SidebarLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <Link
      to={href}
      className={`no-underline text-gray-800 flex p-3 rounded-lg transition-colors items-center gap-3 ${
        location.pathname === href ? "bg-gray-200" : "hover:bg-gray-50"
      }`}
    >
      {children}
    </Link>
  );
};
