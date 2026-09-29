import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { History, Activity, CheckCircle2, Target, Calendar } from "lucide-react";

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

  // Stats calculation
  const totalTaken = results.length;
  let totalScore = 0;
  let totalMax = 0;
  
  results.forEach(r => {
    totalScore += r.score;
    totalMax += r.totalQuestions;
  });
  
  const avgAccuracy = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

  return (
    <Layout>
      <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", paddingBottom: "4rem" }}>
        
        {/* HEADER */}
        <div style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", fontFamily: "Georgia, serif", color: "var(--text-main)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
              <History size={36} color="var(--accent-color)" /> My History
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
              Review your past quiz performances and track your improvement.
            </p>
          </div>
        </div>

        {/* STATS OVERVIEW */}
        {results.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
            <div className="glass-panel" style={{ padding: "2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(56, 189, 248, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle2 size={30} color="#38bdf8" />
              </div>
              <div>
                <p style={{ margin: "0 0 4px 0", color: "var(--text-muted)", fontWeight: "500", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>Quizzes Completed</p>
                <h3 style={{ margin: 0, fontSize: "2rem" }}>{totalTaken}</h3>
              </div>
            </div>
            
            <div className="glass-panel" style={{ padding: "2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Target size={30} color="#10b981" />
              </div>
              <div>
                <p style={{ margin: "0 0 4px 0", color: "var(--text-muted)", fontWeight: "500", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>Average Accuracy</p>
                <h3 style={{ margin: 0, fontSize: "2rem" }}>{avgAccuracy}%</h3>
              </div>
            </div>
          </div>
        )}
        
        {loading ? (
          <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-muted)" }}>Loading your history...</div>
        ) : results.length === 0 ? (
          <div className="glass-panel" style={{ padding: "5rem 2rem", textAlign: "center", border: "1px dashed var(--border-color)" }}>
            <Activity size={60} color="var(--text-muted)" style={{ marginBottom: "1.5rem", opacity: 0.3 }} />
            <h3 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>No History Yet</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "2rem", maxWidth: "400px", margin: "0 auto 2rem" }}>You haven't taken any quizzes yet. Your completed quizzes and scores will appear here.</p>
            <Link to="/quizzes">
              <button className="btn-primary" style={{ padding: "12px 24px", fontSize: "1.1rem" }}>Take Your First Quiz</button>
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {results.map((res) => {
              const percentage = Math.round((res.score / res.totalQuestions) * 100);
              let statusColor = "#ef4444"; // Red for fail
              if (percentage >= 80) statusColor = "#10b981"; // Green for excellent
              else if (percentage >= 50) statusColor = "#facc15"; // Yellow for okay

              return (
                <div className="glass-panel" key={res._id} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: statusColor }}></div>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", paddingLeft: "8px" }}>
                    <h3 style={{ margin: 0, fontSize: "1.2rem", lineHeight: "1.4", flex: 1, paddingRight: "1rem" }}>
                      {res.quiz?.title || "Deleted Quiz"}
                    </h3>
                    
                    {/* Circle Score */}
                    <div style={{
                      width: "45px", height: "45px", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: `${statusColor}15`, border: `2px solid ${statusColor}40`,
                      color: statusColor, fontWeight: "bold", fontSize: "0.95rem", flexShrink: 0
                    }}>
                      {percentage}%
                    </div>
                  </div>
                  
                  <div style={{ paddingLeft: "8px", flex: 1 }}>
                    <p style={{ margin: "0 0 1.5rem 0", color: "var(--text-main)", fontWeight: "500" }}>
                      Score: <span style={{ fontSize: "1.2rem" }}>{res.score}</span> <span style={{ color: "var(--text-muted)" }}>/ {res.totalQuestions}</span>
                    </p>
                  </div>
                  
                  <div style={{ paddingLeft: "8px", display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "0.85rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                    <Calendar size={14} /> Taken on {new Date(res.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyHistory;
