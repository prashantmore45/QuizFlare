import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { Trophy, Medal, Award, Crown, User, Star } from "lucide-react";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

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

  const topThree = leaders.slice(0, 3);
  const remaining = leaders.slice(3, 10);

  // Helper to get podium heights & colors
  const getPodiumStyle = (rank) => {
    if (rank === 1) return { height: "180px", bg: "linear-gradient(to top, rgba(234, 179, 8, 0.15), rgba(234, 179, 8, 0.02))", border: "#eab308", icon: <Crown size={32} color="#eab308" style={{ marginBottom: "10px" }} /> };
    if (rank === 2) return { height: "140px", bg: "linear-gradient(to top, rgba(100, 116, 139, 0.15), rgba(100, 116, 139, 0.02))", border: "#64748b", icon: <Medal size={28} color="#64748b" style={{ marginBottom: "10px" }} /> };
    if (rank === 3) return { height: "110px", bg: "linear-gradient(to top, rgba(180, 83, 9, 0.15), rgba(180, 83, 9, 0.02))", border: "#b45309", icon: <Award size={28} color="#b45309" style={{ marginBottom: "10px" }} /> };
    return {};
  };

  return (
    <Layout>
      <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", paddingBottom: "4rem" }}>
        
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "3rem", animation: "fadeIn 0.5s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "rgba(139, 92, 246, 0.1)", padding: "16px", borderRadius: "50%", marginBottom: "1rem" }}>
            <Trophy size={40} color="var(--accent-color)" />
          </div>
          <h1 style={{ fontSize: "2.8rem", fontWeight: "bold", fontFamily: "Georgia, serif", marginBottom: "0.5rem", color: "var(--text-main)" }}>Global Leaderboard</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Top 10 Quiz Masters Ranked by Total Score</p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>Loading rankings...</div>
        ) : leaders.length === 0 ? (
          <div className="glass-panel" style={{ padding: "4rem 2rem", textAlign: "center", border: "1px dashed var(--border-color)" }}>
            <Star size={48} color="var(--text-muted)" style={{ marginBottom: "1rem", opacity: 0.5 }} />
            <h3 style={{ marginBottom: "0.5rem", color: "var(--text-main)" }}>No results yet</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Take a quiz to be the first on the leaderboard!</p>
          </div>
        ) : (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            
            {/* TOP 3 PODIUM */}
            {topThree.length > 0 && (
              <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "flex-end", 
                gap: "1rem", 
                marginBottom: "3rem",
                marginTop: "2rem",
                height: "280px"
              }}>
                {/* 2nd Place */}
                {topThree[1] && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "30%", maxWidth: "200px" }}>
                    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                      {getPodiumStyle(2).icon}
                      <h4 style={{ margin: "0 0 4px 0", fontSize: "1.1rem", color: "var(--text-main)" }}>{topThree[1].name}</h4>
                      <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "0.9rem", fontWeight: "bold" }}>{topThree[1].totalScore} pts</p>
                    </div>
                    <div style={{ 
                      width: "100%", 
                      height: getPodiumStyle(2).height, 
                      background: getPodiumStyle(2).bg,
                      borderTop: `4px solid ${getPodiumStyle(2).border}`,
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <span style={{ fontSize: "4rem", fontWeight: "bold", opacity: 0.15, color: "var(--text-main)" }}>2</span>
                    </div>
                  </div>
                )}

                {/* 1st Place */}
                {topThree[0] && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "35%", maxWidth: "220px", zIndex: 10 }}>
                    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                      {getPodiumStyle(1).icon}
                      <h4 style={{ margin: "0 0 4px 0", fontSize: "1.3rem", fontWeight: "bold", color: "var(--text-main)" }}>{topThree[0].name}</h4>
                      <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "1rem", fontWeight: "bold" }}>{topThree[0].totalScore} pts</p>
                    </div>
                    <div style={{ 
                      width: "100%", 
                      height: getPodiumStyle(1).height, 
                      background: getPodiumStyle(1).bg,
                      borderTop: `4px solid ${getPodiumStyle(1).border}`,
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 -10px 30px rgba(234, 179, 8, 0.1)"
                    }}>
                      <span style={{ fontSize: "5rem", fontWeight: "bold", opacity: 0.15, color: "var(--text-main)" }}>1</span>
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "30%", maxWidth: "200px" }}>
                    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                      {getPodiumStyle(3).icon}
                      <h4 style={{ margin: "0 0 4px 0", fontSize: "1.1rem", color: "var(--text-main)" }}>{topThree[2].name}</h4>
                      <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "0.9rem", fontWeight: "bold" }}>{topThree[2].totalScore} pts</p>
                    </div>
                    <div style={{ 
                      width: "100%", 
                      height: getPodiumStyle(3).height, 
                      background: getPodiumStyle(3).bg,
                      borderTop: `4px solid ${getPodiumStyle(3).border}`,
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <span style={{ fontSize: "3.5rem", fontWeight: "bold", opacity: 0.15, color: "var(--text-main)" }}>3</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* REMAINING LEADERBOARD */}
            {remaining.length > 0 && (
              <div className="glass-panel" style={{ padding: "0", overflow: "hidden" }}>
                {remaining.map((u, index) => {
                  const rank = index + 4; // Starts from 4
                  const isMe = currentUser && currentUser.id === u._id;
                  
                  return (
                    <div 
                      key={u._id} 
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "20px 24px",
                        borderBottom: index < remaining.length - 1 ? "1px solid var(--border-color)" : "none",
                        background: isMe ? "rgba(139, 92, 246, 0.1)" : "transparent",
                        transition: "background 0.2s ease"
                      }}
                      onMouseOver={(e) => { if (!isMe) e.currentTarget.style.background = "var(--bg-card)" }}
                      onMouseOut={(e) => { if (!isMe) e.currentTarget.style.background = "transparent" }}
                    >
                      <div style={{ 
                        width: "40px", 
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        color: "var(--text-muted)",
                        textAlign: "center"
                      }}>
                        #{rank}
                      </div>
                      
                      <div style={{ flex: 1, paddingLeft: "1.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--bg-surface)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <User size={18} color="var(--text-muted)" />
                        </div>
                        <div>
                          <h3 style={{ margin: "0 0 4px 0", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "8px", color: "var(--text-main)" }}>
                            {u.name}
                            {isMe && <span style={{ background: "var(--accent-color)", color: "#ffffff", fontSize: "0.7rem", padding: "2px 6px", borderRadius: "4px", textTransform: "uppercase" }}>You</span>}
                          </h3>
                          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                            Quizzes Taken: {u.quizzesTaken}
                          </p>
                        </div>
                      </div>
                      
                      <div style={{ 
                        background: isMe ? "var(--accent-gradient)" : "var(--bg-surface)", 
                        color: isMe ? "#ffffff" : "var(--text-main)",
                        border: isMe ? "none" : "1px solid var(--border-color)",
                        padding: "6px 16px", 
                        borderRadius: "20px",
                        fontWeight: "bold",
                        fontSize: "0.95rem"
                      }}>
                        {u.totalScore} pts
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Leaderboard;
