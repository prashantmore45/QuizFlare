import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await API.get("/results/leaderboard");
        setLeaders(res.data);
      } catch (error) {
        console.error("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <Layout>
      <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>🏆 Global Leaderboard</h2>
          <p style={{ color: "var(--text-muted)" }}>Top 10 Quiz Masters Ranked by Total Score</p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center" }}>Loading leaderboard...</div>
        ) : leaders.length === 0 ? (
          <div className="glass-panel" style={{ padding: "40px", textAlign: "center" }}>
            <h3>No results yet.</h3>
            <p>Take a quiz to be the first on the leaderboard!</p>
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: "0", overflow: "hidden" }}>
            {leaders.map((user, index) => (
              <div 
                key={user._id} 
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "20px 24px",
                  borderBottom: index < leaders.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  background: index === 0 ? "rgba(255, 215, 0, 0.1)" : index === 1 ? "rgba(192, 192, 192, 0.05)" : index === 2 ? "rgba(205, 127, 50, 0.05)" : "transparent"
                }}
              >
                <div style={{ 
                  width: "40px", 
                  height: "40px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : index === 2 ? "#CD7F32" : "var(--text-muted)",
                  marginRight: "20px"
                }}>
                  #{index + 1}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "1.1rem" }}>{user.name}</h3>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    Quizzes Taken: {user.quizzesTaken}
                  </p>
                </div>
                
                <div style={{ 
                  background: "var(--accent-gradient)", 
                  padding: "6px 16px", 
                  borderRadius: "20px",
                  fontWeight: "bold" 
                }}>
                  {user.totalScore} pts
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Leaderboard;
