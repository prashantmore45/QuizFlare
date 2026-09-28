import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

function MyHistory() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/results/my-results");
        setResults(res.data);
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <Layout>
      <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "left", marginBottom: 8 }}>My History</h2>
        <p style={{ textAlign: "left", color: "var(--text-muted)", marginBottom: 32 }}>
          View your past quiz scores and performance.
        </p>
        
        {loading ? (
          <div>Loading your history...</div>
        ) : results.length === 0 ? (
          <div className="glass-panel" style={{ padding: "40px", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📭</div>
            <h3 style={{ marginBottom: "8px" }}>No History Yet</h3>
            <p style={{ marginBottom: "24px" }}>You haven't taken any quizzes yet.</p>
            <Link to="/quizzes">
              <button className="btn-primary">Take a Quiz Now</button>
            </Link>
          </div>
        ) : (
          <div className="quiz-grid">
            {results.map((res) => (
              <div className="quiz-card" key={res._id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <h3 style={{ margin: 0 }}>{res.quiz?.title || "Deleted Quiz"}</h3>
                  <div style={{
                    background: "rgba(139, 92, 246, 0.1)",
                    color: "var(--accent-color)",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    fontSize: "0.9rem"
                  }}>
                    {Math.round((res.score / res.totalQuestions) * 100)}%
                  </div>
                </div>
                
                <p style={{ margin: "0 0 16px 0", color: "var(--text-muted)" }}>
                  Score: {res.score} / {res.totalQuestions}
                </p>
                
                <p style={{ margin: "0", fontSize: "0.85rem", color: "#64748b", marginTop: "auto" }}>
                  Taken on: {new Date(res.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyHistory;
