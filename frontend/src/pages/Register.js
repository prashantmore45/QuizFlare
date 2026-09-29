import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { User, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.post("/auth/register", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
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
        minHeight: "calc(100vh - 185px)",
        position: "relative",
        padding: "2rem"
      }}>
        
        {/* Background abstract shapes */}
        <div style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "#10b981", // Emerald accent for register
          borderRadius: "50%",
          filter: "blur(120px)",
          opacity: 0.12,
          top: "15%",
          left: "20%",
          zIndex: 0,
          animation: "float 7s ease-in-out infinite"
        }}></div>
        <div style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          background: "var(--accent-color)",
          borderRadius: "50%",
          filter: "blur(100px)",
          opacity: 0.15,
          bottom: "10%",
          right: "20%",
          zIndex: 0,
          animation: "float 9s ease-in-out infinite reverse"
        }}></div>

        <div className="glass-panel" style={{
          width: "100%",
          maxWidth: "480px",
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
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)"
            }}>
              <Sparkles size={30} color="#fff" />
            </div>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text-main)", marginBottom: "0.5rem" }}>Create Account</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>Join the community and start building quizzes</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            <div style={{ position: "relative" }}>
              <label htmlFor="name" style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "var(--text-main)", fontWeight: "500" }}>Full Name</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
                  <User size={18} />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "42px", height: "48px" }}
                />
              </div>
            </div>

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
                  placeholder="Create a strong password"
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "42px", height: "48px" }}
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              style={{ 
                height: "48px", 
                marginTop: "1rem", 
                fontSize: "1.05rem", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                gap: "8px",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(16, 185, 129, 0.4)",
                transition: "all 0.2s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              {isLoading ? "Creating account..." : <>Join Now <ArrowRight size={18} /></>}
            </button>
          </form>

          <div style={{ marginTop: "2rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Already have an account? <Link to="/login" style={{ color: "#10b981", fontWeight: "600", textDecoration: "none", marginLeft: "4px" }}>Sign in here</Link>
          </div>
          
        </div>
      </div>
    </Layout>
  );
}

export default Register;
