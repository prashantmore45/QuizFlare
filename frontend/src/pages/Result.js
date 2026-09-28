import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Safety Check
  if (!state) {
    return (
      <Layout>
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ marginBottom: "20px" }}>No result found. Please take a quiz first.</p>
          <button className="btn-primary" onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
        </div>
      </Layout>
    );
  }

  const isPerfect = state.score === state.total;
  const percentage = Math.round((state.score / state.total) * 100);

  return (
    <Layout>
      <div className="container" style={{ maxWidth: "800px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "2.5rem" }}>
          {isPerfect ? "Perfect Score! 🏆" : "Quiz Completed 🎉"}
        </h2>
        
        <div className="glass-panel" style={{ 
          marginBottom: "40px", 
          padding: "40px", 
          textAlign: "center",
          background: isPerfect ? "rgba(139, 92, 246, 0.15)" : "var(--bg-card)",
          border: isPerfect ? "1px solid rgba(139, 92, 246, 0.4)" : "var(--glass-border)"
        }}>
          <h3 style={{ color: "var(--text-muted)", marginBottom: "16px" }}>Your Final Score</h3>
          <h1 style={{ 
            fontSize: "4rem", 
            margin: "0 0 16px 0",
            background: isPerfect ? "var(--accent-gradient)" : "linear-gradient(to right, #4CAF50, #8bc34a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            {percentage}%
          </h1>
          <p style={{ fontSize: "1.2rem", margin: 0, color: "#fff" }}>
            You got {state.score} out of {state.total} correct.
          </p>
        </div>

        <h3 style={{ marginBottom: "24px" }}>Detailed Review</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
          {state.history && state.history.map((item, index) => (
            <div key={index} className="glass-panel" style={{ 
                padding: "24px", 
                borderLeft: item.isCorrect ? "6px solid #4CAF50" : "6px solid #f44336",
                borderRadius: "12px"
            }}>
              <p style={{ fontWeight: "600", fontSize: "1.1rem", color: "#fff", marginBottom: "16px" }}>
                <span style={{ color: "var(--accent-color)", marginRight: "8px" }}>Q{index + 1}.</span> 
                {item.question}
              </p>
              
              <div style={{ background: "rgba(0,0,0,0.2)", padding: "12px 16px", borderRadius: "8px", marginBottom: "8px" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", display: "block", marginBottom: "4px" }}>Your Answer</span>
                <span style={{ color: item.isCorrect ? "#4CAF50" : "#f44336", fontWeight: "500", fontSize: "1.05rem" }}>
                  {item.selected}
                </span>
              </div>
              
              {!item.isCorrect && (
                <div style={{ background: "rgba(76, 175, 80, 0.1)", padding: "12px 16px", borderRadius: "8px" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", display: "block", marginBottom: "4px" }}>Correct Answer</span>
                  <span style={{ color: "#4CAF50", fontWeight: "500", fontSize: "1.05rem" }}>
                    {item.correct}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <button className="btn-secondary" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
          <button className="btn-primary" onClick={() => navigate("/history")}>
            View My History
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Result;