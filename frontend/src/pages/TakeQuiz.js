import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";
import { Timer, CheckCircle2, XCircle, ArrowRight, BrainCircuit } from "lucide-react";

function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15); 
  const [answerHistory, setAnswerHistory] = useState([]);
  
  // UX States
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
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
    if (!quiz || isTransitioning) return;
    if (timeLeft === 0) {
      handleAnswer(null); // Time's up, auto-submit wrong
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, quiz, current, isTransitioning]);

  if (!quiz) return <Layout><div style={{textAlign: "center", padding: "4rem", color: "var(--text-muted)"}}>Loading Quiz...</div></Layout>;

  const handleAnswer = async (selectedOption) => {
    if (isTransitioning) return; // Prevent double clicks
    
    setIsTransitioning(true);
    setSelectedAnswer(selectedOption);
    
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

    // Wait 1 second so user sees red/green feedback
    setTimeout(async () => {
      if (current + 1 < quiz.questions.length) {
        setCurrent(current + 1);
        setTimeLeft(15);
        setSelectedAnswer(null);
        setIsTransitioning(false);
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
    }, 1200);
  };

  const timerColor = timeLeft <= 5 ? "#ef4444" : "var(--accent-color)";
  const progressPercent = ((current) / quiz.questions.length) * 100;

  return (
    <Layout>
      <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "4rem" }}>
        
        {/* HEADER & PROGRESS */}
        <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h2 style={{ color: 'var(--text-main)', marginBottom: '8px', fontSize: '1.8rem', fontFamily: 'Georgia, serif' }}>{quiz.title}</h2>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <span style={{ color: "var(--accent-color)", fontWeight: "600", background: "rgba(139,92,246,0.1)", padding: "4px 12px", borderRadius: "100px", fontSize: "0.85rem" }}>
                Question {current + 1} of {quiz.questions.length}
              </span>
            </div>
          </div>
          
          {/* TIMER */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--bg-surface)",
            padding: "8px 16px",
            borderRadius: "100px",
            border: `1px solid ${timerColor}40`,
            color: timerColor,
            fontWeight: "bold",
            fontSize: "1.2rem",
            boxShadow: timeLeft <= 5 ? `0 0 15px ${timerColor}40` : "none",
            transition: "all 0.3s"
          }}>
            <Timer size={20} />
            {timeLeft}s
          </div>
        </div>
        
        {/* PROGRESS BAR */}
        <div style={{ width: "100%", height: "8px", background: "var(--border-color)", borderRadius: "4px", marginBottom: "3rem", overflow: "hidden" }}>
          <div style={{
            height: "100%", 
            background: "var(--accent-gradient)", 
            width: `${progressPercent}%`,
            transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          }}></div>
        </div>

        {/* QUESTION CARD */}
        <div className="glass-panel" style={{ padding: "3rem", position: "relative", overflow: "hidden" }}>
          <BrainCircuit size={150} color="var(--accent-color)" style={{ position: "absolute", top: "-20px", right: "-20px", opacity: 0.05, transform: "rotate(15deg)" }} />
          
          <h3 style={{ marginBottom: '2.5rem', fontSize: '1.6rem', lineHeight: '1.5', position: "relative", zIndex: 1 }}>
            {quiz.questions[current].questionText}
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", position: "relative", zIndex: 1 }}>
            {quiz.questions[current].options.map((opt, i) => {
              
              const isSelected = selectedAnswer === opt;
              const isActuallyCorrect = opt === quiz.questions[current].correctAnswer;
              
              // Determine styles based on transition state
              let borderColor = "var(--border-color)";
              let bgColor = "rgba(255,255,255,0.02)";
              let textColor = "var(--text-main)";
              let icon = null;

              if (isTransitioning) {
                if (isActuallyCorrect) {
                  // Always highlight correct answer in green during transition
                  borderColor = "rgba(16, 185, 129, 0.5)";
                  bgColor = "rgba(16, 185, 129, 0.1)";
                  textColor = "#10b981";
                  icon = <CheckCircle2 size={20} color="#10b981" />;
                } else if (isSelected && !isActuallyCorrect) {
                  // If they selected this and it's wrong, highlight in red
                  borderColor = "rgba(239, 68, 68, 0.5)";
                  bgColor = "rgba(239, 68, 68, 0.1)";
                  textColor = "#ef4444";
                  icon = <XCircle size={20} color="#ef4444" />;
                } else {
                  // Dim other options
                  textColor = "var(--text-muted)";
                  bgColor = "transparent";
                }
              }

              return (
                <button
                  key={i}
                  disabled={isTransitioning}
                  onClick={() => handleAnswer(opt)}
                  style={{ 
                    display: "flex", 
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "1.25rem 1.5rem",
                    borderRadius: "12px",
                    border: `1px solid ${borderColor}`,
                    background: bgColor,
                    color: textColor,
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    cursor: isTransitioning ? "default" : "pointer",
                    transition: "all 0.2s",
                    textAlign: "left"
                  }} 
                  onMouseOver={(e) => {
                    if (!isTransitioning) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.borderColor = "var(--accent-color)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isTransitioning) {
                      e.currentTarget.style.background = bgColor;
                      e.currentTarget.style.borderColor = borderColor;
                    }
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ 
                        fontWeight: "bold", 
                        marginRight: "16px", 
                        color: isTransitioning ? textColor : "var(--accent-color)", 
                        background: isTransitioning ? "transparent" : "rgba(139, 92, 246, 0.1)", 
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
                    <span>{opt}</span>
                  </div>
                  {icon}
                </button>
              );
            })}
          </div>
        </div>
        
        {isTransitioning && (
          <div style={{ textAlign: "center", marginTop: "2rem", color: "var(--text-muted)", animation: "fadeIn 0.3s ease" }}>
            Moving to next question <ArrowRight size={16} style={{ verticalAlign: "middle", marginLeft: "4px" }} />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default TakeQuiz;