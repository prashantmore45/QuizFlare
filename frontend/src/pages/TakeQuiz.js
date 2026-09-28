import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15); 
  const [answerHistory, setAnswerHistory] = useState([]);
  
  const optionLabels = ["A", "B", "C", "D"];

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`/quizzes/${id}`);
        setQuiz(res.data);
      } catch (error) {
        console.error("Failed to load quiz");
      }
    };
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (!quiz) return;
    if (timeLeft === 0) {
      handleAnswer(null); // Time's up, auto-submit wrong
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, quiz, current]);

  if (!quiz) return <Layout><div className="container" style={{textAlign: "center", padding: "40px"}}>Loading Quiz...</div></Layout>;

  const handleAnswer = async (selectedOption) => {
    const currentQuestion = quiz.questions[current];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
    }
    setScore(newScore);

    const newHistoryItem = {
      question: currentQuestion.questionText,
      selected: selectedOption || "Time's Up!",
      correct: currentQuestion.correctAnswer,
      isCorrect: isCorrect
    };
    
    const updatedHistory = [...answerHistory, newHistoryItem];
    setAnswerHistory(updatedHistory);

    if (current + 1 < quiz.questions.length) {
      setCurrent(current + 1);
      setTimeLeft(15); // reset timer for next question
    } else {
      // Save result to backend
      try {
        await API.post("/results", {
          quizId: quiz._id,
          score: newScore,
          totalQuestions: quiz.questions.length
        });
      } catch (err) {
        console.error("Failed to save result:", err);
      }

      navigate("/result", {
        state: {
          score: newScore,
          total: quiz.questions.length,
          history: updatedHistory 
        },
      });
    }
  };

  const timerColor = timeLeft <= 5 ? "#ef4444" : "var(--accent-color)";

  return (
    <Layout>
      <div className="container" style={{ position: "relative" }}>
        
        {/* Timer UI */}
        <div style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: `3px solid ${timerColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
          color: timerColor,
          boxShadow: `0 0 15px ${timerColor}40`
        }}>
          {timeLeft}s
        </div>

        <h2 style={{color: '#fff', marginBottom: '8px', paddingRight: '60px'}}>{quiz.title}</h2>
        <p style={{marginBottom: '24px'}}>Question {current + 1} of {quiz.questions.length}</p>
        
        {/* Progress bar */}
        <div style={{width: "100%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", marginBottom: "32px", overflow: "hidden"}}>
          <div style={{
            height: "100%", 
            background: "var(--accent-gradient)", 
            width: `${((current) / quiz.questions.length) * 100}%`,
            transition: "width 0.3s ease"
          }}></div>
        </div>

        <div className="card" style={{background: 'transparent', boxShadow: 'none', padding: 0}}>
          <h3 style={{marginBottom: '24px', fontSize: '1.4rem'}}>{quiz.questions[current].questionText}</h3>
          <div className="options-vertical-list">
            {quiz.questions[current].options.map((opt, i) => (
              <button
                key={i}
                className="option-btn"
                onClick={() => handleAnswer(opt)}
                style={{ display: "flex", alignItems: "center" }} 
              >
                <span style={{ 
                    fontWeight: "bold", 
                    marginRight: "15px", 
                    color: "var(--accent-color)", 
                    background: "rgba(139, 92, 246, 0.1)", 
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    flexShrink: 0 
                }}>
                  {optionLabels[i] || i + 1}
                </span>
                <span style={{ fontSize: "1.05rem" }}>{opt}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TakeQuiz;