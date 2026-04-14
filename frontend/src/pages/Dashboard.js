import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Welcome! What would you like to do today?</p>
      
      <div style={{ margin: "20px 0" }}>
        <button 
          onClick={() => navigate("/create-quiz")} 
          style={{ marginRight: "10px", padding: "10px" }}
        >
          Create New Quiz
        </button>

        <button 
          onClick={() => navigate("/quizzes")}
          style={{ padding: "10px" }}
        >
          Take a Quiz
        </button>
      </div>

      <button onClick={handleLogout} style={{ backgroundColor: "#f44336" }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;