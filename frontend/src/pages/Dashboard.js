import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import { ArrowRight, PlayCircle, Trophy, PenTool, Target, Activity, ClipboardCheck } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [results, setResults] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const displayName = user?.name || user?.username || "User";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [resResults, resQuizzes] = await Promise.all([
          API.get("/results/my-results"),
          API.get("/quizzes")
        ]);
        setResults(resResults.data);
        setQuizzes(resQuizzes.data);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Stats calculation
  const totalQuizzes = results.length;
  let totalScore = 0;
  let totalMax = 0;
  let perfectScores = 0;
  
  results.forEach(r => {
    totalScore += r.score;
    totalMax += r.totalQuestions;
    if (r.score === r.totalQuestions && r.totalQuestions > 0) {
      perfectScores += 1;
    }
  });
  
  const avgScore = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
  const recentTwoResults = results.slice(0, 2);
  const recommendedQuizzes = quizzes.slice(0, 3);

  return (
    <Layout>
      <div className="dashboard-container" style={{ padding: "0" }}>
        
        {/* 1. HERO SECTION */}
        <div className="dashboard-hero-section" style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            borderRadius: "16px",
            padding: "3rem",
            color: "#fff",
            marginBottom: "2rem",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
        }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "#94a3b8", marginBottom: "0.5rem", fontWeight: "600" }}>Your Practice Home</p>
            <h1 style={{ fontSize: "2.8rem", fontWeight: "bold", marginBottom: "1rem", fontFamily: "Georgia, serif", color: "#fff" }}>Welcome back, {displayName}</h1>
            <p style={{ fontSize: "1.1rem", color: "#cbd5e1", marginBottom: "2rem" }}>
              Ready to challenge yourself today? Dive into a new quiz or review your progress.
            </p>
            
            <div style={{ display: "flex", gap: "1rem" }}>
              <button 
                onClick={() => navigate("/quizzes")}
                style={{ background: "#6366f1", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", transition: "0.2s" }}
              >
                Take a Quiz <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => navigate("/progress")}
                style={{ background: "transparent", color: "#fff", border: "1px solid #475569", padding: "10px 24px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", transition: "0.2s" }}
              >
                View progress
              </button>
            </div>
          </div>
          {/* Abstract background shapes */}
          <div className="target-icon hide-on-mobile" style={{ position: "absolute", right: "-5%", top: "-20%", opacity: 0.1 }}>
             <Target size={300} />
          </div>
        </div>

        {/* 2. JUMP IN SECTION */}
        <div style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1rem", fontFamily: "Georgia, serif", color: "var(--text-main)" }}>Jump in</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.2rem" }}>
              
              {/* Box 1 */}
              <div onClick={() => navigate("/create-quiz")} style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "1.5rem", cursor: "pointer", transition: "0.2s" }} className="jump-in-card">
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#4f46e5", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <PenTool size={20} />
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "0.4rem" }}>Create Quiz</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>Design and publish a new quiz</p>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                  Open <ArrowRight size={14} />
                </div>
              </div>
              
              {/* Box 2 */}
              <div onClick={() => navigate("/quizzes")} style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "1.5rem", cursor: "pointer", transition: "0.2s" }} className="jump-in-card">
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#6366f1", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <PlayCircle size={20} />
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "0.4rem" }}>Take a Quiz</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>Browse and attempt quizzes</p>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                  Open <ArrowRight size={14} />
                </div>
              </div>

              {/* Box 3 */}
              <div onClick={() => navigate("/leaderboard")} style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "1.5rem", cursor: "pointer", transition: "0.2s" }} className="jump-in-card">
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#059669", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <Trophy size={20} />
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "0.4rem" }}>Leaderboard</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>Check the global rankings</p>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                  Open <ArrowRight size={14} />
                </div>
              </div>
              
            </div>
        </div>

        {/* 3. RECOMMENDED SECTION */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: "16px", padding: "1.5rem", marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.5rem" }}>
              <Activity size={20} color="#6366f1" />
              <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", fontFamily: "Georgia, serif" }}>Recommended for you</h2>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>Expand your knowledge — one click takes you straight to practice.</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {loading ? <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Loading...</p> : recommendedQuizzes.map((quiz, idx) => (
                    <div key={idx} style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "8px", padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.2rem" }}>{quiz.title}</h3>
                            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{quiz.category || "General Knowledge"}</p>
                        </div>
                        <button 
                          onClick={() => navigate(`/take-quiz/${quiz._id}`)}
                          style={{ background: "transparent", border: "none", color: "#4f46e5", fontWeight: "600", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
                        >
                          Practice <ArrowRight size={16} />
                        </button>
                    </div>
                ))}
                {!loading && recommendedQuizzes.length === 0 && (
                  <div style={{ padding: "1rem", textAlign: "center", color: "var(--text-muted)" }}>
                    <p style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>No quizzes are available yet.</p>
                    <p style={{ fontSize: "0.85rem" }}>Be the first to create one! Click "Create Quiz" in the Jump In section above to get started.</p>
                  </div>
                )}
            </div>
        </div>

        {/* 4. RECENT ACTIVITY & YOUR NUMBERS */}
        <div className="dashboard-content-grid">
          
          {/* Left Column: Recent Activity */}
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: "16px", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.8rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", fontFamily: "Georgia, serif" }}>Recent activity</h2>
              <button onClick={() => navigate("/history")} style={{ background: "none", border: "none", color: "#4f46e5", fontSize: "0.85rem", cursor: "pointer" }}>All progress</button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {loading ? (
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Loading activity...</p>
              ) : results.length > 0 ? (
                results.slice(0, 5).map((result, idx) => {
                  const percentage = Math.round((result.score / result.totalQuestions) * 100);
                  return (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "10px 0", borderBottom: "1px solid rgba(15, 23, 42, 0.05)" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(79, 70, 229, 0.1)", color: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <ClipboardCheck size={18} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: "0.95rem", fontWeight: "600", marginBottom: "0.2rem" }}>Quiz - {result.quiz?.title || 'Unknown'}</h4>
                        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          {new Date(result.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                        </p>
                      </div>
                      <div style={{ fontSize: "1rem", fontWeight: "bold", color: "#4f46e5" }}>
                        {percentage}%
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ padding: "1.5rem", textAlign: "center", color: "var(--text-muted)", background: "rgba(15, 23, 42, 0.02)", borderRadius: "8px", marginTop: "1rem" }}>
                  <p style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>You haven't taken any quizzes yet.</p>
                  <p style={{ fontSize: "0.85rem" }}>Head over to "Take a Quiz" to start building your stats!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Your Numbers */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: "16px", padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", fontFamily: "Georgia, serif", marginBottom: "1.5rem" }}>Your numbers</h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.8rem", marginBottom: "1.5rem" }}>
                  <div style={{ border: "1px solid var(--border-color)", borderRadius: "10px", padding: "1rem 0.5rem", textAlign: "center", background: "var(--bg-card)" }}>
                      <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4f46e5", marginBottom: "0.2rem" }}>{totalQuizzes}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Quizzes</div>
                  </div>
                  <div style={{ border: "1px solid var(--border-color)", borderRadius: "10px", padding: "1rem 0.5rem", textAlign: "center", background: "var(--bg-card)" }}>
                      <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4f46e5", marginBottom: "0.2rem" }}>{avgScore}%</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Avg Score</div>
                  </div>
                  <div style={{ border: "1px solid var(--border-color)", borderRadius: "10px", padding: "1rem 0.5rem", textAlign: "center", background: "var(--bg-card)" }}>
                      <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#059669", marginBottom: "0.2rem" }}>{perfectScores}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Perfect</div>
                  </div>
              </div>

              {/* Progress Level bar */}
              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#4f46e5", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: "1" }}>
                  <span style={{ fontSize: "0.6rem" }}>Lv</span>
                  <span style={{ fontSize: "1rem", fontWeight: "bold" }}>{Math.floor(totalScore / 50) + 1}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                    <span style={{ fontWeight: "600" }}>{totalScore} points</span>
                    <span style={{ color: "var(--text-muted)" }}>{Math.max(50 - (totalScore % 50), 0)} to next level</span>
                  </div>
                  <div style={{ width: "100%", background: "rgba(15, 23, 42, 0.1)", height: "6px", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ width: `${Math.min(((totalScore % 50) / 50) * 100, 100)}%`, height: "100%", background: "#4f46e5", borderRadius: "3px" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Created Quizzes */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: "16px", padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", fontFamily: "Georgia, serif" }}>Your created quizzes</h2>
                <span style={{ fontSize: "0.85rem", fontWeight: "bold", color: "var(--text-muted)" }}>
                  {quizzes.filter(q => {
                    const creatorId = q.createdBy?._id || q.createdBy;
                    const userId = user?._id || user?.id;
                    return creatorId && userId && creatorId.toString() === userId.toString();
                  }).length}
                </span>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {(() => {
                  const myQuizzes = quizzes.filter(q => {
                    const creatorId = q.createdBy?._id || q.createdBy;
                    const userId = user?._id || user?.id;
                    return creatorId && userId && creatorId.toString() === userId.toString();
                  });
                  if (loading) return <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Loading...</p>;
                  if (myQuizzes.length === 0) return (
                    <div style={{ padding: "1rem", textAlign: "center", color: "var(--text-muted)", background: "rgba(15, 23, 42, 0.02)", borderRadius: "8px" }}>
                      <p style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>You haven't created any quizzes.</p>
                      <button onClick={() => navigate("/create-quiz")} style={{ background: "none", border: "none", color: "#4f46e5", fontWeight: "600", fontSize: "0.85rem", cursor: "pointer" }}>Create one now</button>
                    </div>
                  );
                  
                  return myQuizzes.slice(0, 4).map((quiz, idx) => (
                    <div key={idx} style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "8px", padding: "0.8rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", paddingRight: "10px" }}>
                        <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>{quiz.title}</span>
                      </div>
                      <div style={{ fontSize: "0.75rem", background: "rgba(16, 185, 129, 0.1)", color: "#059669", padding: "4px 8px", borderRadius: "12px", fontWeight: "600" }}>
                        Active
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;