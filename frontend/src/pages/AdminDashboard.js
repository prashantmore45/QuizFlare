import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { Mail, Clock, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchMessages = async () => {
      try {
        const res = await API.get("/contact");
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user, navigate]);

  if (loading) {
    return (
      <Layout>
        <div style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--text-main)" }}>
          Loading admin dashboard...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "2rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>Admin Dashboard</h1>
            <p style={{ color: "var(--text-muted)" }}>Manage contact form submissions and user feedback.</p>
          </div>
          <div className="glass-panel" style={{ padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "12px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
            <Mail size={24} color="#10b981" />
            <div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--text-main)" }}>{messages.length}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Total Messages</div>
            </div>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="glass-panel" style={{ padding: "4rem", textAlign: "center" }}>
            <CheckCircle size={40} color="#10b981" style={{ margin: "0 auto 1rem" }} />
            <h3 style={{ color: "var(--text-main)", marginBottom: "0.5rem" }}>Inbox Zero</h3>
            <p style={{ color: "var(--text-muted)" }}>You have no new messages from users.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {messages.map((msg) => (
              <div key={msg._id} className="glass-panel" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--accent-color)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold" }}>
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 style={{ color: "var(--text-main)", margin: 0, fontSize: "1.1rem" }}>{msg.name}</h4>
                      <a href={`mailto:${msg.email}`} style={{ color: "var(--accent-light)", fontSize: "0.9rem", textDecoration: "none" }}>{msg.email}</a>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    <Clock size={14} />
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </div>
                <div style={{ color: "var(--text-main)", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default AdminDashboard;
