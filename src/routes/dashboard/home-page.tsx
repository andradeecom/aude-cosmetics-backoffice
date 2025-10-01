export const HomePage = () => {
  return (
    <div>
      <h2 style={{ marginBottom: "2rem", color: "#333" }}>Dashboard Overview</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {/* Stats Cards */}
        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 0.5rem 0", color: "#666" }}>Total Products</h3>
          <p style={{ margin: 0, fontSize: "2rem", fontWeight: "bold", color: "#007bff" }}>156</p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 0.5rem 0", color: "#666" }}>Product Variants</h3>
          <p style={{ margin: 0, fontSize: "2rem", fontWeight: "bold", color: "#28a745" }}>342</p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 0.5rem 0", color: "#666" }}>Categories</h3>
          <p style={{ margin: 0, fontSize: "2rem", fontWeight: "bold", color: "#ffc107" }}>12</p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 0.5rem 0", color: "#666" }}>Low Stock Items</h3>
          <p style={{ margin: 0, fontSize: "2rem", fontWeight: "bold", color: "#dc3545" }}>8</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginBottom: "1rem", color: "#333" }}>Recent Activity</h3>
        <div style={{ borderTop: "1px solid #eee" }}>
          <div style={{ padding: "1rem 0", borderBottom: "1px solid #eee" }}>
            <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold" }}>New product added</p>
            <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
              "Rose Gold Lipstick" was added to the catalog - 2 hours ago
            </p>
          </div>
          <div style={{ padding: "1rem 0", borderBottom: "1px solid #eee" }}>
            <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold" }}>Stock updated</p>
            <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>Foundation variants restocked - 4 hours ago</p>
          </div>
          <div style={{ padding: "1rem 0", borderBottom: "1px solid #eee" }}>
            <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold" }}>Category created</p>
            <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
              "Summer Collection" category created - 1 day ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
