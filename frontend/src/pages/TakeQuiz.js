import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  
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

  if (!quiz) return <div className="container">Loading Quiz...</div>;

  const handleAnswer = (selectedOption) => {
    const currentQuestion = quiz.questions[current];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
    }
    setScore(newScore);

    const newHistoryItem = {
      question: currentQuestion.questionText,
      selected: selectedOption,
      correct: currentQuestion.correctAnswer,
      isCorrect: isCorrect
    };
    
    const updatedHistory = [...answerHistory, newHistoryItem];
    setAnswerHistory(updatedHistory);

    if (current + 1 < quiz.questions.length) {
      setCurrent(current + 1);
    } else {
      navigate("/result", {
        state: {
          score: newScore,
          total: quiz.questions.length,
          history: updatedHistory 
        },
      });
    }
  };

  return (
    <div className="container">
      <h2 style={{color: '#fff'}}>{quiz.title}</h2>
      <p>Question {current + 1} / {quiz.questions.length}</p>

      <div className="card" style={{background: 'transparent', boxShadow: 'none', padding: 0}}>
        <h3 style={{marginBottom: '20px'}}>{quiz.questions[current].questionText}</h3>
        
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
                  color: "#8b5cf6", 
                  background: "rgba(139, 92, 246, 0.1)", 
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  flexShrink: 0 
              }}>
                {optionLabels[i] || i + 1}
              </span>
              <span>{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TakeQuiz;