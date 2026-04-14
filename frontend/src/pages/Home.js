import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <span style={{ fontSize: "3rem", display: "block" }}>⚡</span>
      <h1 style={{ 
          margin: "0", 
          background: "linear-gradient(90deg, #8b5cf6, #3b82f6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "2rem"
        }}>
          Quiz Master Pro
      </h1>
      <p>Level up your knowledge. Create and take quizzes instantly.</p>
      
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button onClick={() => navigate("/login")}>Login</button>
        <button 
          onClick={() => navigate("/register")} 
          style={{ backgroundColor: "transparent", border: "1px solid #8b5cf6" }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Home;