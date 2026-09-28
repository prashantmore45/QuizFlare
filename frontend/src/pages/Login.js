import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom"; 
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <div className="auth-header">
          <span className="auth-icon">⚡</span>
          <h1 className="auth-title">Quiz Master Pro</h1>
        </div>
        
        <h2 style={{ fontSize: "1.5rem", marginBottom: 8 }}>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your account to continue</p>
        
        <form className="auth-form" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="auth-submit-btn">Sign In</button>
        </form>
        
        <div className="auth-link">
          Don't have an account? <Link to="/register">Create one now</Link>
        </div>
        
        <div className="auth-footer">
          Built with ❤️ by Quiz Masters
        </div>
      </div>
    </Layout>
  );
}

export default Login;
