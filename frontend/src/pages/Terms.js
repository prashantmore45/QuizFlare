import Layout from "../components/Layout";

function Terms() {
  return (
    <Layout>
      <div className="content-page-container">
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text-main)" }}>Terms of Service</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>Last updated: October 2026</p>
        
        <div style={{ lineHeight: "1.8", color: "var(--text-main)" }}>
          <h2 style={{ fontSize: "1.5rem", marginTop: "1.5rem", marginBottom: "1rem", color: "var(--accent-color)" }}>1. Introduction</h2>
          <p>Welcome to QuizFlare. By accessing our platform, you agree to these Terms of Service. If you do not agree, please do not use our services.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent-color)" }}>2. User Accounts</h2>
          <p>You must create an account to access certain features. You are responsible for maintaining the confidentiality of your password and account information.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent-color)" }}>3. Content Creation</h2>
          <p>Users who create quizzes retain ownership of their content. However, by uploading content to QuizFlare, you grant us a license to display and distribute it on our platform.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent-color)" }}>4. Acceptable Use</h2>
          <p>You agree not to use the platform to share inappropriate, offensive, or copyrighted material. We reserve the right to remove any content that violates these terms.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent-color)" }}>5. Termination</h2>
          <p>We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms.</p>
        </div>
      </div>
    </Layout>
  );
}

export default Terms;
