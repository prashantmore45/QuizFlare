import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { TrendingUp, Target, Award, Zap, Activity } from "lucide-react";
import { Link } from "react-router-dom";

function Progress() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/results/my-results");
        // Sort by oldest to newest for the chart
        const sorted = res.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setResults(sorted);
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>Loading progress...</div>
      </Layout>
    );
  }

  if (results.length === 0) {
    return (
      <Layout>
        <div style={{ maxWidth: "1000px", margin: "0 auto", paddingBottom: "4rem" }}>
          <div className="glass-panel" style={{ padding: "5rem 2rem", textAlign: "center", border: "1px dashed var(--border-color)" }}>
            <Activity size={60} color="var(--text-muted)" style={{ marginBottom: "1.5rem", opacity: 0.3 }} />
            <h3 style={{ marginBottom: "1rem", fontSize: "1.5rem", color: "var(--text-main)" }}>No Progress Data Yet</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "2rem", maxWidth: "400px", margin: "0 auto 2rem" }}>Take some quizzes to start generating your personal performance analytics!</p>
            <Link to="/quizzes">
              <button className="btn-primary" style={{ padding: "12px 24px", fontSize: "1.1rem" }}>Take a Quiz</button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Analytics Math
  let totalScore = 0;
  let totalMax = 0;
  let perfectScores = 0;

  results.forEach(r => {
    totalScore += r.score;
    totalMax += r.totalQuestions;
    if (r.score === r.totalQuestions && r.totalQuestions > 0) {
      perfectScores++;
    }
  });

  const avgAccuracy = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

  // Data for Chart (Last 10 quizzes)
  const chartData = results.slice(-10).map(r => ({
    name: r.quiz?.title ? r.quiz.title.substring(0, 10) + '...' : 'Quiz',
    percentage: Math.round((r.score / r.totalQuestions) * 100)
  }));

  return (
    <Layout>
      <div style={{ width: "100%", maxWidth: "1000px", margin: "0 auto", paddingBottom: "4rem" }}>

        {/* HEADER */}
        <div style={{ marginBottom: "3rem", animation: "fadeIn 0.5s ease" }}>
          <h1 className="section-title" style={{ display: "flex", alignItems: "center", gap: "12px", fontFamily: "Georgia, serif" }}>
            <TrendingUp size={36} color="var(--accent-color)" /> Performance Analytics
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
            Deep dive into your quiz statistics and learning curve.
          </p>
        </div>

        {/* TOP STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          <div className="glass-panel" style={{ padding: "1.5rem", borderTop: "4px solid #6366f1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <p style={{ color: "var(--text-muted)", margin: 0, fontWeight: "600", fontSize: "0.9rem", textTransform: "uppercase" }}>Total XP</p>
              <Zap size={20} color="#6366f1" />
            </div>
            <h2 style={{ margin: 0, fontSize: "2.5rem", color: "var(--text-main)" }}>{totalScore * 10}</h2>
          </div>

          <div className="glass-panel" style={{ padding: "1.5rem", borderTop: "4px solid #10b981" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <p style={{ color: "var(--text-muted)", margin: 0, fontWeight: "600", fontSize: "0.9rem", textTransform: "uppercase" }}>Accuracy</p>
              <Target size={20} color="#10b981" />
            </div>
            <h2 style={{ margin: 0, fontSize: "2.5rem", color: "var(--text-main)" }}>{avgAccuracy}%</h2>
          </div>

          <div className="glass-panel" style={{ padding: "1.5rem", borderTop: "4px solid #facc15" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <p style={{ color: "var(--text-muted)", margin: 0, fontWeight: "600", fontSize: "0.9rem", textTransform: "uppercase" }}>Perfect Quizzes</p>
              <Award size={20} color="#facc15" />
            </div>
            <h2 style={{ margin: 0, fontSize: "2.5rem", color: "var(--text-main)" }}>{perfectScores}</h2>
          </div>
        </div>

        {/* CHART SECTION */}
        <div className="glass-panel" style={{ padding: "2.5rem", marginBottom: "3rem" }}>
          <h3 style={{ margin: "0 0 2rem 0", color: "var(--text-main)", fontSize: "1.3rem" }}>Recent Performance Trend</h3>

          <div style={{ display: "flex", alignItems: "flex-end", height: "250px", gap: "10px", paddingBottom: "10px", borderBottom: "1px solid var(--border-color)", position: "relative", marginLeft: "40px" }}>
            {/* Y-Axis lines */}
            <div style={{ position: "absolute", width: "100%", height: "1px", background: "var(--border-color)", top: "0", opacity: 0.5 }}></div>
            <div style={{ position: "absolute", width: "100%", height: "1px", background: "var(--border-color)", top: "50%", opacity: 0.5 }}></div>

            <div style={{ position: "absolute", left: "-60px", top: "-10px", color: "var(--text-muted)", fontSize: "0.8rem", width: "35px", textAlign: "right" }}>100%</div>
            <div style={{ position: "absolute", left: "-60px", top: "calc(50% - 10px)", color: "var(--text-muted)", fontSize: "0.8rem", width: "35px", textAlign: "right" }}>50%</div>
            <div style={{ position: "absolute", left: "-60px", bottom: "0", color: "var(--text-muted)", fontSize: "0.8rem", width: "35px", textAlign: "right" }}>0%</div>

            {chartData.map((data, idx) => (
              <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%", zIndex: 1, group: "bar" }}>
                <div
                  title={`${data.percentage}%`}
                  style={{
                    width: "100%",
                    maxWidth: "50px",
                    height: `${data.percentage}%`,
                    background: data.percentage >= 80 ? "var(--accent-gradient)" : data.percentage >= 50 ? "rgba(139, 92, 246, 0.5)" : "rgba(139, 92, 246, 0.2)",
                    borderRadius: "4px 4px 0 0",
                    transition: "height 1s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = "0.8"}
                  onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
                ></div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Older</span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Newer</span>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Progress;
