import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, PenLine, Target, Trophy, History, TrendingUp, PanelLeftClose, PanelLeftOpen, Shield, LogOut, User, Menu, Sparkles, Sun, Moon } from "lucide-react";
import "../App.css";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth <= 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    { label: "Leaderboard", path: "/leaderboard", icon: <Trophy size={20} /> },
    ...(user?.role === "admin" ? [{ label: "Admin", path: "/admin/dashboard", icon: <Shield size={20} color="#10b981" /> }] : [])
  ];

  const isGenericPage = ["/", "/terms", "/privacy", "/contact"].includes(location.pathname);
  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  const showSidebar = !isAuthPage && ( (isLoggedIn && !isGenericPage) || isMobile );

  return (
    <div className="layout-root">
      <div className="layout-wrapper">
        
        {/* Mobile Overlay */}
        {showSidebar && sidebarOpen && (
          <div 
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {showSidebar && (
          <aside className={`layout-sidebar ${!sidebarOpen ? "collapsed" : ""}`}>
            <div className="sidebar-header">
              <div className="brand" onClick={() => navigate("/")}>
                <span className="brand-icon">⚡</span>
                <span className="brand-text">QuizFlare</span>
              </div>
              <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
              </button>
            </div>
            
            <nav className="sidebar-nav">
              {isLoggedIn ? (
                navItems.map((item) => (
                  <button
                    key={item.path}
                    className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
                    onClick={() => {
                      navigate(item.path);
                      if (window.innerWidth <= 768) setSidebarOpen(false);
                    }}
                    title={!sidebarOpen ? item.label : ""}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </button>
                ))
              ) : (
                <>
                  <button className="nav-link" onClick={() => { navigate("/login"); setSidebarOpen(false); }}>
                    <span className="nav-icon"><User size={20} /></span>
                    <span className="nav-label">Login</span>
                  </button>
                  <button className="nav-link" onClick={() => { navigate("/register"); setSidebarOpen(false); }}>
                    <span className="nav-icon"><Sparkles size={20} /></span>
                    <span className="nav-label">Sign Up</span>
                  </button>
                </>
              )}
            </nav>
            {isLoggedIn && (
              <div style={{ marginTop: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "8px" }}>
                <button
                  className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`}
                  style={{ width: "100%", justifyContent: !sidebarOpen ? "center" : "flex-start" }}
                  onClick={() => {
                    navigate("/profile");
                    if (window.innerWidth <= 768) setSidebarOpen(false);
                  }}
                  title={!sidebarOpen ? "My Profile" : ""}
                >
                  <span className="nav-icon"><User size={20} /></span>
                  {sidebarOpen && <span className="nav-label">My Profile</span>}
                </button>
                
                <button
                  className="nav-link"
                  style={{ color: "var(--danger-color)", width: "100%", justifyContent: !sidebarOpen ? "center" : "flex-start" }}
                  onClick={handleLogout}
                  title={!sidebarOpen ? "Logout" : ""}
                >
                  <span className="nav-icon"><LogOut size={20} color="var(--danger-color)" /></span>
                  {sidebarOpen && <span className="nav-label" style={{ color: "var(--danger-color)" }}>Logout</span>}
                </button>
              </div>
            )}
          </aside>
        )}
        
        <main className={`layout-main ${!showSidebar ? "full-width" : ""} ${!sidebarOpen && showSidebar ? "collapsed-sidebar" : ""}`}>
          <header className="main-header">
            <div className="header-left">
              {/* Show brand unconditionally but hide it on desktop when logged in using CSS */}
              <div className={`brand ${showSidebar ? "mobile-only-brand" : ""}`} onClick={() => navigate("/")}>
                <span className="brand-icon">⚡</span> QuizFlare
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {isLoggedIn ? (
                <>
                  <div 
                    className="desktop-profile-icon"
                    onClick={() => navigate("/profile")}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "var(--accent-gradient)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "var(--icon-color)",
                      boxShadow: "0 4px 10px rgba(124, 58, 237, 0.3)",
                      transition: "transform 0.2s"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    title="My Profile"
                  >
                    <User size={20} />
                  </div>
                  <div 
                    className="mobile-hamburger-icon"
                    onClick={() => setSidebarOpen(true)}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      background: "var(--bg-surface)",
                      border: "var(--glass-border)",
                      display: "none", // overridden in css for mobile
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "var(--text-main)",
                    }}
                    title="Open Menu"
                  >
                    <Menu size={20} />
                  </div>
                </>
              ) : (
                !isAuthPage && (
                  <>
                    <div className="auth-nav-buttons" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <button className="btn-secondary" onClick={() => navigate("/login")} style={{ padding: "8px 16px" }}>Login</button>
                      <button className="btn-primary" onClick={() => navigate("/register")} style={{ padding: "8px 16px" }}>Sign Up</button>
                    </div>
                    <div 
                      className="mobile-hamburger-icon"
                      onClick={() => setSidebarOpen(true)}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        background: "var(--bg-surface)",
                        border: "var(--glass-border)",
                        display: "none", // overridden in css for mobile
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "var(--text-main)",
                      }}
                      title="Open Menu"
                    >
                      <Menu size={20} />
                    </div>
                  </>
                )
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
                {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
          </header>

          <div className="main-content-wrapper" style={{ minHeight: "calc(100vh - 85px - 100px)", marginTop: "85px" }}>
            {children}
          </div>
          
          {/* Only show the large footer on generic/public pages */}
          {isGenericPage && (
            <footer className="layout-footer">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div className="brand" style={{ fontSize: "1.3rem", margin: 0 }}>
                  <span className="brand-icon">⚡</span> QuizFlare
                </div>
                <p style={{ margin: 0 }}>© {new Date().getFullYear()} QuizFlare. All rights reserved.</p>
              </div>
              
              <div className="footer-links">
                <Link to="/terms" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "var(--text-main)"} onMouseOut={(e) => e.target.style.color = "var(--text-muted)"}>Terms of Service</Link>
                <Link to="/privacy" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "var(--text-main)"} onMouseOut={(e) => e.target.style.color = "var(--text-muted)"}>Privacy Policy</Link>
                <Link to="/contact" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "var(--text-main)"} onMouseOut={(e) => e.target.style.color = "var(--text-muted)"}>Contact Us</Link>
              </div>
            </footer>
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;


