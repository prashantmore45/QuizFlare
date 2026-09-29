import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { User, Mail, Shield, Key, Calendar } from "lucide-react";

function Profile() {
  const { user } = useAuth();

  if (!user) return <Layout><div style={{ padding: "4rem", textAlign: "center", color: "var(--text-main)" }}>Loading profile...</div></Layout>;

  return (
    <Layout>
      <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "4rem" }}>
        
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>My Profile</h1>
          <p style={{ color: "var(--text-muted)" }}>Manage your personal information and account settings.</p>
        </div>

        <div className="glass-panel" style={{ padding: "3rem", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", overflow: "hidden" }}>
          {/* Decorative background blur */}
          <div style={{ position: "absolute", top: "-50px", left: "-50px", width: "200px", height: "200px", background: "var(--accent-color)", borderRadius: "50%", filter: "blur(100px)", opacity: 0.15, zIndex: 0 }}></div>
          
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            
            <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "var(--accent-gradient)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "3rem", fontWeight: "bold", boxShadow: "0 10px 25px rgba(124, 58, 237, 0.4)", marginBottom: "1.5rem" }}>
              {user.name.charAt(0).toUpperCase()}
            </div>

            <h2 style={{ fontSize: "2rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>{user.name}</h2>
            
            {user.role === "admin" && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.15)", color: "#10b981", padding: "6px 12px", borderRadius: "20px", fontSize: "0.9rem", fontWeight: "bold", marginBottom: "2rem", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                <Shield size={16} /> Admin Account
              </div>
            )}

            <div style={{ width: "100%", maxWidth: "500px", display: "flex", flexDirection: "column", gap: "1rem", marginTop: user.role === "admin" ? "0" : "1.5rem" }}>
              
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.5rem", background: "var(--bg-surface)", borderRadius: "12px", border: "var(--glass-border)", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
                <div style={{ color: "var(--accent-color)" }}><User size={24} /></div>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Full Name</div>
                  <div style={{ fontSize: "1.1rem", color: "var(--text-main)", fontWeight: "500" }}>{user.name}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.5rem", background: "var(--bg-surface)", borderRadius: "12px", border: "var(--glass-border)", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
                <div style={{ color: "var(--accent-color)" }}><Mail size={24} /></div>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Email Address</div>
                  <div style={{ fontSize: "1.1rem", color: "var(--text-main)", fontWeight: "500" }}>{user.email}</div>
                </div>
              </div>
              
            </div>

            <button className="btn-primary" style={{ marginTop: "2.5rem", padding: "12px 28px", display: "flex", alignItems: "center", gap: "8px", borderRadius: "30px", background: "var(--accent-gradient)", border: "none", color: "#fff", boxShadow: "0 4px 15px rgba(124, 58, 237, 0.3)", cursor: "pointer", fontSize: "1rem" }}>
              <Key size={18} /> Change Password
            </button>

          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Profile;
