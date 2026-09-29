import Layout from "../components/Layout";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import API from "../services/api";

function Contact() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.post("/contact", formData);
      setSent(true);
    } catch (err) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="contact-container" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ 
            width: "60px", 
            height: "60px", 
            borderRadius: "50%", 
            background: "rgba(16, 185, 129, 0.1)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            margin: "0 auto 1.5rem"
          }}>
            <MessageSquare size={30} color="#10b981" />
          </div>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>Contact Us</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Have a question or feedback? We'd love to hear from you.</p>
        </div>

        {sent ? (
          <div style={{ 
            padding: "3rem 2rem", 
            textAlign: "center", 
            maxWidth: "400px", 
            margin: "0 auto",
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.05)"
          }}>
            <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <Send size={30} color="#10b981" />
            </div>
            <h3 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>Message Sent!</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Thank you for reaching out. We will get back to you shortly.</p>
            
            <button onClick={() => window.location.href = '/'} style={{
              background: "var(--bg-surface)",
              color: "var(--text-main)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "10px 24px",
              borderRadius: "30px",
              cursor: "pointer",
              transition: "all 0.2s"
            }} onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.1)"} onMouseOut={(e) => e.target.style.background = "var(--bg-surface)"}>
              Return to Home
            </button>
          </div>
        ) : (
          <div className="form-container">
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "var(--text-main)", fontWeight: "500" }}>Your Name</label>
                <input name="name" onChange={handleChange} type="text" placeholder="John Doe" required style={{ height: "48px" }} />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "var(--text-main)", fontWeight: "500" }}>Email Address</label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
                    <Mail size={18} />
                  </div>
                  <input name="email" onChange={handleChange} type="email" placeholder="you@example.com" required style={{ paddingLeft: "42px", height: "48px" }} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "var(--text-main)", fontWeight: "500" }}>Message</label>
                <textarea name="message" onChange={handleChange} placeholder="How can we help you?" required style={{ height: "120px", resize: "vertical", paddingTop: "12px" }} />
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={isLoading}
                style={{ 
                  height: "48px", 
                  marginTop: "1rem", 
                  fontSize: "1.05rem",
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  boxShadow: "0 4px 14px rgba(16, 185, 129, 0.4)",
                  border: "none",
                  color: "#fff",
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Contact;
