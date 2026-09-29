import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, PenLine, Target, Trophy, History, TrendingUp, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import "../App.css";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.body.classList.toggle("light-mode");
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { label: "Take Quiz", path: "/quizzes", icon: <Target size={20} /> },
    { label: "Create Quiz", path: "/create-quiz", icon: <PenLine size={20} /> },
    { label: "Progress", path: "/progress", icon: <TrendingUp size={20} /> },
    { label: "My History", path: "/history", icon: <History size={20} /> },
    { label: "Leaderboard", path: "/leaderboard", icon: <Trophy size={20} /> }
  ];

  const showSidebar = isLoggedIn && location.pathname !== "/";

  return (
    <div className="layout-root">
      <div className="layout-wrapper">
        {showSidebar && (
          <aside className={`layout-sidebar ${!sidebarOpen ? "collapsed" : ""}`}>
            <div className="sidebar-header">
              <div className="brand" onClick={() => navigate("/")}>
                <span className="brand-icon">⚡</span>
                <span className="brand-text">Quiz Master Pro</span>
              </div>
              <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
              </button>
            </div>
            
            <nav className="sidebar-nav">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
                  onClick={() => {
                    navigate(item.path);
                  }}
                  title={!sidebarOpen ? item.label : ""}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>
        )}
        
        <main className={`layout-main ${!showSidebar ? "full-width" : ""} ${!sidebarOpen && showSidebar ? "collapsed-sidebar" : ""}`}>
          <header className="main-header">
            <div className="header-left">
              {!showSidebar && (
                <div className="brand" onClick={() => navigate("/")}>
                  <span className="brand-icon">⚡</span> Quiz Master Pro
                </div>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {isLoggedIn ? (
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              ) : (
                <div style={{ display: "flex", gap: "16px" }}>
                  <button className="btn-secondary" style={{ padding: "8px 16px" }} onClick={() => navigate("/login")}>Login</button>
                  <button className="btn-primary" style={{ padding: "8px 16px" }} onClick={() => navigate("/register")}>Sign Up</button>
                </div>
              )}
              <button 
                onClick={toggleTheme} 
                className="theme-toggle-btn"
                style={{
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  color: "var(--text-main)",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  transition: "all 0.2s"
                }}
                title="Toggle Theme"
              >
                {isLightMode ? "🌙" : "☀️"}
              </button>
            </div>
          </header>

          <div className="main-content-wrapper" style={{ minHeight: "calc(100vh - 85px - 100px)", marginTop: "85px" }}>
            {children}
          </div>
          
          {/* Only show the large footer on public/full-width pages */}
          {!showSidebar && (
            <footer className="layout-footer" style={{
              marginTop: "4rem",
              padding: "2rem 0",
              borderTop: "1px solid var(--border-color)",
              textAlign: "center",
              color: "var(--text-muted)",
              fontSize: "0.9rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem"
            }}>
              <div className="brand" style={{ fontSize: "1.2rem", justifyContent: "center" }}>
                <span className="brand-icon">⚡</span> Quiz Master Pro
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <a href="#" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Terms of Service</a>
                <a href="#" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Privacy Policy</a>
                <a href="#" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Contact Us</a>
              </div>
              <p>© {new Date().getFullYear()} Quiz Master Pro. All rights reserved.</p>
            </footer>
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
