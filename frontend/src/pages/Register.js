import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

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
    
    <div className="container" style={{ marginTop: "50px", width: "450px", marginBottom: "50px" }}>

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

      <h2>Create Account</h2>
      <p style={{ color: "#94a3b8", marginBottom: "20px" }}>Join us to create and take quizzes</p>
      
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
        <p style={{ marginTop: "30px", fontSize: "0.8rem", color: "#64748b" }}>
          Built by Prashant More
        </p>
      </form>
      
      <p style={{ marginTop: "20px" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;