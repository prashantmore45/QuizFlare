import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: "📊" },
    { label: "Create Quiz", path: "/create-quiz", icon: "✏️" },
    { label: "Take Quiz", path: "/quizzes", icon: "🎯" },
    { label: "Leaderboard", path: "/leaderboard", icon: "🏆" },
    { label: "My History", path: "/history", icon: "📜" }
  ];

  return (
    <div className="layout-root">
      <header className="layout-header">
        <div className="header-left">
          {isLoggedIn && (
            <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
          )}
          <div className="brand" onClick={() => navigate("/")}>
            <span className="brand-icon">⚡</span> Quiz Master Pro
          </div>
        </div>
        {isLoggedIn && (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </header>

      <div className="layout-wrapper">
        {isLoggedIn && (
          <aside className={`layout-sidebar ${sidebarOpen ? "open" : ""}`}>
            <nav className="sidebar-nav">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>
        )}
        <main className="layout-main">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
