import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Safety Check
  if (!state) {
    return (
      <div className="container">
        <p>No result found. Please take a quiz first.</p>
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: "800px", marginTop: "50px", marginBottom: "50px" }}>
      <h2>Quiz Completed 🎉</h2>
      
      <div style={{ marginBottom: "30px", padding: "20px", borderBottom: "1px solid #334155" }}>
        <h3>Your Score</h3>
        <h1 style={{ color: "#4CAF50", fontSize: "3rem", margin: "10px 0" }}>
          {state.score} / {state.total}
        </h1>
        <p>{state.score === state.total ? "Perfect Score! 🌟" : "Good job! Check your answers below."}</p>
      </div>

      <h3 style={{ textAlign: "left", marginBottom: "20px" }}>Answer Review:</h3>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {state.history && state.history.map((item, index) => (
          <div key={index} style={{ 
              textAlign: "left", 
              background: "#0f172a", 
              padding: "15px", 
              borderRadius: "8px",
              borderLeft: item.isCorrect ? "5px solid #4CAF50" : "5px solid #f44336"
          }}>
            <p style={{ fontWeight: "bold", color: "#fff", marginBottom: "5px" }}>
              Q{index + 1}: {item.question}
            </p>
            
            <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
              Your Answer: <span style={{ color: item.isCorrect ? "#4CAF50" : "#f44336" }}>{item.selected}</span>
            </p>
            
            {!item.isCorrect && (
              <p style={{ margin: "5px 0", fontSize: "0.9rem", color: "#94a3b8" }}>
                Correct Answer: <span style={{ color: "#4CAF50" }}>{item.correct}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      <button 
        onClick={() => navigate("/dashboard")}
        style={{ marginTop: "30px", width: "200px" }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default Result;