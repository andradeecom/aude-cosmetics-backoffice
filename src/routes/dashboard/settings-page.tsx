import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";

export const SettingsPage = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    companyName: "Aude Cosmetics",
    email: user?.email || "",
    notifications: {
      lowStock: true,
      newOrders: true,
      systemUpdates: false,
    },
    inventory: {
      lowStockThreshold: 10,
      autoReorder: false,
    },
    display: {
      itemsPerPage: 25,
      currency: "USD",
    },
  });

  const handleInputChange = (section: string, field: string, value: string | number | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as object),
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to an API
    alert("Settings saved successfully!");
  };

  return (
    <div>
      <h2 style={{ marginBottom: "2rem", color: "#333" }}>Settings</h2>

      <div style={{ display: "grid", gap: "2rem" }}>
        {/* Company Information */}
        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: "1rem", color: "#333" }}>Company Information</h3>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings((prev) => ({ ...prev, companyName: e.target.value }))}
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Admin Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: "1rem", color: "#333" }}>Notification Settings</h3>
          <div style={{ display: "grid", gap: "1rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                checked={settings.notifications.lowStock}
                onChange={(e) => handleInputChange("notifications", "lowStock", e.target.checked)}
              />
              <span>Low stock alerts</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                checked={settings.notifications.newOrders}
                onChange={(e) => handleInputChange("notifications", "newOrders", e.target.checked)}
              />
              <span>New order notifications</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                checked={settings.notifications.systemUpdates}
                onChange={(e) => handleInputChange("notifications", "systemUpdates", e.target.checked)}
              />
              <span>System update notifications</span>
            </label>
          </div>
        </div>

        {/* Inventory Settings */}
        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: "1rem", color: "#333" }}>Inventory Settings</h3>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Low Stock Threshold
              </label>
              <input
                type="number"
                value={settings.inventory.lowStockThreshold}
                onChange={(e) => handleInputChange("inventory", "lowStockThreshold", parseInt(e.target.value))}
                style={{
                  width: "100px",
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              />
              <p style={{ margin: "0.5rem 0 0 0", color: "#666", fontSize: "0.9rem" }}>
                Items with stock below this number will be marked as low stock
              </p>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                checked={settings.inventory.autoReorder}
                onChange={(e) => handleInputChange("inventory", "autoReorder", e.target.checked)}
              />
              <span>Enable automatic reordering (Coming Soon)</span>
            </label>
          </div>
        </div>

        {/* Display Settings */}
        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: "1rem", color: "#333" }}>Display Settings</h3>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Items per page</label>
              <select
                value={settings.display.itemsPerPage}
                onChange={(e) => handleInputChange("display", "itemsPerPage", parseInt(e.target.value))}
                style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Currency</label>
              <select
                value={settings.display.currency}
                onChange={(e) => handleInputChange("display", "currency", e.target.value)}
                style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ textAlign: "right" }}>
          <button
            onClick={handleSave}
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
