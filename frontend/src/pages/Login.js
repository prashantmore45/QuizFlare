import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom"; 

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    
    <div className="container" style={{ marginTop: "50px", width: "400px" }}>

      <div style={{ marginBottom: "30px" }}>
        <span style={{ fontSize: "3rem", display: "block" }}>⚡</span>
        <h1 style={{ 
          margin: "0", 
          background: "linear-gradient(90deg, #8b5cf6, #3b82f6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "2rem"
        }}>
          Quiz Master Pro
        </h1>
      </div>

      <h2>Welcome Back</h2>
      <p style={{ color: "#94a3b8", marginBottom: "20px" }}>Please login to your account</p>
      
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p style={{ marginTop: "30px", fontSize: "0.8rem", color: "#64748b" }}>
          Built by Prashant More
        </p>
      </form>
      
      <p style={{ marginTop: "20px" }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;