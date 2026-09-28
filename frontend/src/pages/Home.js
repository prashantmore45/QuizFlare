import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <div className="home-hero">
        <div className="hero-content">
          <span className="hero-icon">⚡</span>
          <h1 className="hero-title">Quiz Master Pro</h1>
          <p className="hero-subtitle">
            Create engaging quizzes, challenge your friends, and master your knowledge with our powerful quiz platform.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/register")}>Get Started Free</button>
            <button className="btn-secondary" onClick={() => navigate("/login")}>Sign In</button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="home-features">
        <h2 className="section-title">Why Choose Quiz Master?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Easy Quiz Creation</h3>
            <p>Create beautiful, interactive quizzes in minutes with our intuitive editor. No coding required.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Instant Feedback</h3>
            <p>Get immediate results and detailed explanations to help learners understand their mistakes.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Share with Friends</h3>
            <p>Share quizzes with your community and compete on the leaderboard with instant notifications.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics Dashboard</h3>
            <p>Track performance metrics and see detailed analytics to monitor learning progress.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your quizzes and data are protected with enterprise-grade security and privacy.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>Customizable</h3>
            <p>Add images, customize colors, and personalize every aspect of your quizzes.</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="home-how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create a free account in seconds</p>
          </div>
          
          <div className="step-arrow">→</div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Create Quiz</h3>
            <p>Add your questions and answers</p>
          </div>
          
          <div className="step-arrow">→</div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Share & Compete</h3>
            <p>Challenge friends and track scores</p>
          </div>
          
          <div className="step-arrow">→</div>
          
          <div className="step">
            <div className="step-number">4</div>
            <h3>Analyze</h3>
            <p>View detailed performance reports</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="home-stats">
        <div className="stat-item">
          <div className="stat-number">10K+</div>
          <div className="stat-label">Active Users</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-number">50K+</div>
          <div className="stat-label">Quizzes Created</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-number">1M+</div>
          <div className="stat-label">Quiz Attempts</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-number">98%</div>
          <div className="stat-label">User Satisfaction</div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="home-cta">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of educators and students using Quiz Master Pro today!</p>
        <button className="btn-primary-large" onClick={() => navigate("/register")}>
          Create Your First Quiz Now
        </button>
      </div>
    </Layout>
  );
}

export default Home;
