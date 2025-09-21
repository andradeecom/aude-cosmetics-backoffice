import { Outlet, Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function DashboardLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "white",
          padding: "1rem 2rem",
          borderBottom: "1px solid #dee2e6",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0, color: "#333" }}>Aude Cosmetics Backoffice</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>Welcome, {user?.email}</span>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <nav
          style={{
            width: "250px",
            backgroundColor: "white",
            padding: "2rem 1rem",
            borderRight: "1px solid #dee2e6",
            minHeight: "calc(100vh - 80px)",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/dashboard"
                style={{
                  textDecoration: "none",
                  color: "#333",
                  display: "block",
                  padding: "0.75rem",
                  borderRadius: "4px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                🏠 Home
              </Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/dashboard/products"
                style={{
                  textDecoration: "none",
                  color: "#333",
                  display: "block",
                  padding: "0.75rem",
                  borderRadius: "4px",
                }}
              >
                📦 Products
              </Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/dashboard/products-variants"
                style={{
                  textDecoration: "none",
                  color: "#333",
                  display: "block",
                  padding: "0.75rem",
                  borderRadius: "4px",
                }}
              >
                🎨 Product Variants
              </Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/dashboard/settings"
                style={{
                  textDecoration: "none",
                  color: "#333",
                  display: "block",
                  padding: "0.75rem",
                  borderRadius: "4px",
                }}
              >
                ⚙️ Settings
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "2rem" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
