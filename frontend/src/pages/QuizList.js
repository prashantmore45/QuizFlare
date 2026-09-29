import { useEffect, useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { PlayCircle, Target, Clock, AlertCircle, FileText, CheckCircle2 } from "lucide-react";

const CATEGORIES = ["All", "General", "Programming", "Math", "Science", "History", "Entertainment"];

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await API.get("/quizzes");
        setQuizzes(res.data);
      } catch (error) {
        console.error("Failed to fetch quizzes");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const filteredQuizzes = selectedCategory === "All" 
    ? quizzes 
    : quizzes.filter(q => q.category === selectedCategory);

  return (
    <Layout>
      <div style={{ maxWidth: "1200px", margin: "0 auto", paddingBottom: "4rem" }}>
        
        {/* HERO SECTION */}
        <div style={{
            background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(56, 189, 248, 0.1) 100%)",
            borderRadius: "16px",
            padding: "3rem",
            marginBottom: "2rem",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(139, 92, 246, 0.2)"
        }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", fontFamily: "Georgia, serif", color: "var(--text-main)", marginBottom: "0.5rem" }}>
              Explore Quizzes
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px" }}>
              Test your knowledge across various topics. From programming to history, find the perfect challenge and climb the leaderboard.
            </p>
          </div>
          <div style={{ position: "absolute", right: "-5%", top: "-10%", opacity: 0.05, transform: "rotate(-15deg)" }}>
             <Target size={250} />
          </div>
        </div>
        
        {/* FILTERS */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px", alignItems: "center" }}>
          <span style={{ color: "var(--text-muted)", fontWeight: "600", marginRight: "8px" }}>Categories:</span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 16px",
                borderRadius: "100px",
                border: selectedCategory === cat ? "none" : "1px solid var(--border-color)",
                background: selectedCategory === cat ? "var(--accent-gradient)" : "rgba(255,255,255,0.02)",
                color: selectedCategory === cat ? "#fff" : "var(--text-muted)",
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: selectedCategory === cat ? "0 4px 12px rgba(139, 92, 246, 0.3)" : "none"
              }}
              onMouseOver={(e) => { if(selectedCategory !== cat) e.target.style.background = "rgba(255,255,255,0.05)" }}
              onMouseOut={(e) => { if(selectedCategory !== cat) e.target.style.background = "rgba(255,255,255,0.02)" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-muted)" }}>
            Loading quizzes...
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredQuizzes.length === 0 && (
          <div className="glass-panel" style={{ padding: "4rem 2rem", textAlign: "center", border: "1px dashed var(--border-color)" }}>
             <AlertCircle size={48} color="var(--text-muted)" style={{ marginBottom: "1rem", opacity: 0.5 }} />
             <h3 style={{ marginBottom: "0.5rem" }}>No quizzes found</h3>
             <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>There are no quizzes in the "{selectedCategory}" category yet.</p>
             <button className="btn-primary" onClick={() => navigate("/create-quiz")}>Create the first one</button>
          </div>
        )}

        {/* QUIZ GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {filteredQuizzes.map((quiz) => (
            <div key={quiz._id} className="glass-panel" style={{ 
              padding: "1.5rem", 
              display: "flex", 
              flexDirection: "column", 
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/quiz/${quiz._id}`)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(139, 92, 246, 0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <span style={{
                  background: "rgba(139, 92, 246, 0.15)",
                  color: "var(--accent-color)",
                  padding: "4px 10px",
                  borderRadius: "100px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  {quiz.category || "General"}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: "500" }}>
                  <FileText size={14} /> {quiz.questions?.length || 0} Qs
                </span>
              </div>
              
              <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.25rem", lineHeight: "1.4" }}>{quiz.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", flex: 1, marginBottom: "1.5rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {quiz.description || "No description provided for this quiz."}
              </p>
              
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1rem", borderTop: "1px solid var(--border-color)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  <Clock size={14} /> {quiz.questions?.length ? quiz.questions.length * 15 : 0}s est.
                </span>
                <button 
                  style={{ 
                    background: "transparent", 
                    border: "none", 
                    color: "var(--accent-color)", 
                    fontWeight: "600", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "6px", 
                    cursor: "pointer" 
                  }}
                >
                  Start <PlayCircle size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default QuizList;