import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const CATEGORIES = ["All", "General", "Programming", "Math", "Science", "History", "Entertainment"];

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await API.get("/quizzes");
        setQuizzes(res.data);
      } catch (error) {
        console.error("Failed to fetch quizzes");
      }
    };
    fetchQuizzes();
  }, []);

  const filteredQuizzes = selectedCategory === "All" 
    ? quizzes 
    : quizzes.filter(q => q.category === selectedCategory);

  return (
    <Layout>
      <div className="quiz-list-container" style={{ marginBottom: "50px", width: "100%", maxWidth: "1200px" }}>
        <h2 style={{ marginBottom: "20px" }}>Available Quizzes</h2>
        
        {/* Category Filter */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid rgba(139, 92, 246, 0.4)",
                background: selectedCategory === cat ? "var(--accent-gradient)" : "transparent",
                color: selectedCategory === cat ? "#fff" : "var(--text-muted)",
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.2s"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredQuizzes.length === 0 ? (
          <div className="glass-panel" style={{ padding: "40px", textAlign: "center" }}>
             <h3>No quizzes found in this category.</h3>
             <p>Be the first to create one!</p>
          </div>
        ) : null}

        <div className="quiz-grid">
          {filteredQuizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-card glass-panel" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <h3 style={{ margin: 0 }}>{quiz.title}</h3>
                <span style={{
                  background: "rgba(139, 92, 246, 0.1)",
                  color: "var(--accent-color)",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  textTransform: "uppercase"
                }}>
                  {quiz.category || "General"}
                </span>
              </div>
              <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>{quiz.description}</p>
              <Link to={`/quiz/${quiz._id}`} style={{ width: "100%" }}>
                <button className="btn-primary" style={{ width: "100%" }}>Start Quiz</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default QuizList;