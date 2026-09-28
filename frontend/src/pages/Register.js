import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <div className="auth-header">
          <span className="auth-icon">⚡</span>
          <h1 className="auth-title">Quiz Master Pro</h1>
        </div>
        
        <h2 style={{ fontSize: "1.5rem", marginBottom: 8 }}>Create Account</h2>
        <p className="auth-subtitle">Join our community and start creating quizzes</p>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="auth-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="auth-submit-btn">Create Account</button>
        </form>
        
        <div className="auth-link">
          Already have an account? <Link to="/login">Sign in here</Link>
        </div>
        
        <div className="auth-footer">
          Built with ❤️ by Quiz Masters
        </div>
      </div>
    </Layout>
  );
}

export default Register;
