import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div style={{ width: "100%" }}>
        <h2 style={{ textAlign: "left", marginBottom: 8 }}>Dashboard</h2>
        <p style={{ textAlign: "left", color: "var(--text-muted)", marginBottom: 32 }}>
          Welcome back! What would you like to do today?
        </p>
        <div className="dashboard-grid">
          <div className="dashboard-card" onClick={() => navigate("/create-quiz")}> 
            <div className="dashboard-icon">📝</div>
            <h3>Create New Quiz</h3>
            <p>Design and publish a new quiz for others to take.</p>
          </div>
          <div className="dashboard-card" onClick={() => navigate("/quizzes")}> 
            <div className="dashboard-icon">🎯</div>
            <h3>Take a Quiz</h3>
            <p>Browse and attempt quizzes created by others.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;