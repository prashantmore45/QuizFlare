import Layout from "../components/Layout";

function Privacy() {
  return (
    <Layout>
      <div className="content-page-container">
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text-main)" }}>Privacy Policy</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>Last updated: October 2026</p>
        
        <div style={{ lineHeight: "1.8", color: "var(--text-main)" }}>
          <h2 style={{ fontSize: "1.5rem", marginTop: "1.5rem", marginBottom: "1rem", color: "var(--accent-color)" }}>1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you create an account, such as your name, email address, and password. We also collect data on your quiz performance and history.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent-color)" }}>2. How We Use Your Information</h2>
          <p>We use the information we collect to operate and improve our platform, track your learning progress, generate leaderboards, and communicate with you about your account.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent-color)" }}>3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information. Your passwords are encrypted, and we do not share your data with third-party advertisers.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent-color)" }}>4. Cookies</h2>
          <p>We use cookies and similar tracking technologies to maintain your session, remember your theme preferences (Light/Dark mode), and improve your experience.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent-color)" }}>5. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information at any time by contacting our support team.</p>
        </div>
      </div>
    </Layout>
  );
}

export default Privacy;
