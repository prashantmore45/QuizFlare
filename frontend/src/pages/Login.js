import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom"; 
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, ArrowRight, Zap } from "lucide-react";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await API.post("/auth/login", formData);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 185px)", // accounting for header & margin
        position: "relative",
        padding: "2rem"
      }}>
        
        {/* Background abstract shapes */}
        <div style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "var(--accent-color)",
          borderRadius: "50%",
          filter: "blur(100px)",
          opacity: 0.15,
          top: "20%",
          left: "25%",
          zIndex: 0,
          animation: "float 6s ease-in-out infinite"
        }}></div>
        <div style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          background: "#10b981",
          borderRadius: "50%",
          filter: "blur(100px)",
          opacity: 0.1,
          bottom: "10%",
          right: "25%",
          zIndex: 0,
          animation: "float 8s ease-in-out infinite reverse"
        }}></div>

        <div className="glass-panel" style={{
          width: "100%",
          maxWidth: "450px",
          padding: "3rem",
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          borderLeft: "1px solid rgba(255,255,255,0.05)"
        }}>
          
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ 
              width: "60px", 
              height: "60px", 
              borderRadius: "16px", 
              background: "var(--accent-gradient)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)"
            }}>
              <Zap size={30} color="#fff" />
            </div>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text-main)", marginBottom: "0.5rem" }}>Welcome Back</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>Sign in to continue your quiz journey</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            <div style={{ position: "relative" }}>
              <label htmlFor="email" style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "var(--text-main)", fontWeight: "500" }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "42px", height: "48px" }}
                />
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <label htmlFor="password" style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "var(--text-main)", fontWeight: "500" }}>Password</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "42px", height: "48px" }}
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={isLoading}
              style={{ 
                height: "48px", 
                marginTop: "1rem", 
                fontSize: "1.05rem", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                gap: "8px" 
              }}
            >
              {isLoading ? "Signing in..." : <>Sign In <ArrowRight size={18} /></>}
            </button>
          </form>

          <div style={{ marginTop: "2rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Don't have an account? <Link to="/register" style={{ color: "var(--accent-color)", fontWeight: "600", textDecoration: "none", marginLeft: "4px" }}>Create one now</Link>
          </div>
          
        </div>
      </div>
    </Layout>
  );
}

export default Login;
