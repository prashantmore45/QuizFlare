import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { Zap, ArrowRight, Wand2, BarChart, Trophy, ShieldCheck } from "lucide-react";

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [stats, setStats] = useState({
    users: 0,
    quizzes: 0,
    attempts: 0,
    satisfaction: 98
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="home-hero" style={{ 
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        alignItems: "center",
        padding: "40px 0",
        marginTop: "-32px" // Counteracts the layout-main padding
      }}>
        <div className="hero-content-wrapper" style={{
          maxWidth: "1400px",
          margin: "0 auto",
          width: "95%",
          background: "var(--bg-card)",
          border: "var(--glass-border)",
          borderRadius: "32px",
          padding: "60px",
          boxShadow: "var(--shadow-lg)"
        }}>
          <div className="hero-text-content" style={{
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
              <Zap size={32} color="var(--accent-color)" style={{ marginRight: "12px" }} />
              <span style={{ color: "var(--accent-color)", fontWeight: "bold", letterSpacing: "1px", textTransform: "uppercase" }}>The #1 Quiz Platform</span>
            </div>
            <h1 className="hero-title" style={{ marginBottom: "24px", lineHeight: "1.1", paddingBottom: "15px" }}>Master Your Knowledge</h1>
            <p className="hero-subtitle" style={{ maxWidth: "100%", marginBottom: "40px" }}>
              Create engaging quizzes, challenge your friends, and master your knowledge with our powerful premium quiz platform.
            </p>
            <div className="hero-buttons">
              {isLoggedIn ? (
                <button className="btn-primary-large" onClick={() => navigate("/dashboard")}>Go to Dashboard <ArrowRight size={18} style={{ marginLeft: "8px", verticalAlign: "middle" }} /></button>
              ) : (
                <>
                  <button className="btn-primary-large" onClick={() => navigate("/register")}>Get Started Free</button>
                  <button className="btn-secondary" style={{ padding: "14px 28px", fontSize: "1.1rem" }} onClick={() => navigate("/login")}>Sign In</button>
                </>
              )}
            </div>
          </div>

          <div className="hero-image-container" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              position: "absolute",
              top: "-20%",
              left: "-10%",
              width: "120%",
              height: "120%",
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
              zIndex: 0,
              filter: "blur(40px)"
            }}></div>
            <img
              src="/hero.png"
              alt="QuizFlare Dashboard Graphic"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px",
                boxShadow: "var(--shadow-lg)",
                border: "var(--glass-border)",
                position: "relative",
                zIndex: 1,
                transform: "perspective(1000px) rotateY(-5deg) rotateX(5deg)",
                transition: "transform 0.5s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "perspective(1000px) rotateY(-5deg) rotateX(5deg)"}
            />
          </div>
        </div>
      </div>

      <div className="section-divider"></div>

      {/* Features Section */}
      <div className="home-section home-features">
        <div className="section-header">
          <span className="section-badge">Supercharge Learning</span>
          <h2 className="section-title">Tools Built for Excellence</h2>
          <p className="section-subtitle">Elevate your quizzes with our state-of-the-art creation and analytics tools.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Wand2 size={36} color="var(--accent-color)" />
            </div>
            <h3>Lightning Fast Creation</h3>
            <p>Build stunning, interactive quizzes in minutes using our drag-and-drop editor. Zero coding required.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <BarChart size={36} color="var(--accent-color)" />
            </div>
            <h3>Deep Analytics</h3>
            <p>Gain actionable insights with detailed performance reports, completion rates, and question analysis.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Trophy size={36} color="var(--accent-color)" />
            </div>
            <h3>Global Leaderboards</h3>
            <p>Foster healthy competition with real-time global leaderboards and instant push notifications.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <ShieldCheck size={36} color="var(--accent-color)" />
            </div>
            <h3>Enterprise Security</h3>
            <p>Your data is protected by industry-leading encryption and robust privacy controls.</p>
          </div>
        </div>
      </div>

      <div className="section-divider"></div>

      {/* How It Works Section */}
      <div className="home-section home-how-it-works">
        <div className="section-header">
          <span className="section-badge">Simple Process</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get your first quiz up and running in 4 easy steps.</p>
        </div>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Sign Up</h3>
            <p>Create your free account instantly.</p>
          </div>
          <div className="step-card">
            <div className="step-number">02</div>
            <h3>Build</h3>
            <p>Design your quiz with our intuitive editor.</p>
          </div>
          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Share</h3>
            <p>Send the link to friends or students.</p>
          </div>
          <div className="step-card">
            <div className="step-number">04</div>
            <h3>Analyze</h3>
            <p>Track live results and feedback.</p>
          </div>
        </div>
      </div>

      <div className="section-divider"></div>

      {/* Stats Section */}
      <div className="home-section" style={{ textAlign: "center", paddingBottom: "1rem" }}>
        <h2 className="section-title">Platform Impact</h2>
        <p style={{ color: "var(--text-muted)" }}>Join thousands of users who are already mastering their knowledge with QuizFlare.</p>
      </div>
      <div className="home-section home-stats" style={{ paddingTop: 0 }}>
        <div className="stat-card">
          <div className="stat-number">{stats.users}</div>
          <div className="stat-label">Active Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.quizzes}</div>
          <div className="stat-label">Quizzes Created</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.attempts}</div>
          <div className="stat-label">Total Attempts</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.satisfaction}%</div>
          <div className="stat-label">Satisfaction Rate</div>
        </div>
      </div>

      <div className="section-divider"></div>

      {/* CTA Section */}
      <div className="home-section home-cta">
        <div className="cta-content">
          <h2>Ready to Transform Your Learning?</h2>
          <p>Join thousands of educators and students using QuizFlare today.</p>
          <button className="btn-primary-large cta-btn" onClick={() => navigate(isLoggedIn ? "/dashboard" : "/register")}>
            {isLoggedIn ? "Go to Dashboard" : "Start For Free Now"}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Home;



