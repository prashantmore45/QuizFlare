import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";
import { Plus, Trash2, Save, ArrowRight, ArrowLeft, Settings, LayoutList, CheckCircle2, AlertCircle } from "lucide-react";

function CreateQuiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Quiz Details
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  
  // Current Question Draft
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

  // Added Questions
  const [questions, setQuestions] = useState([]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addQuestion = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return alert("Question text is required");
    if (options.some(opt => !opt.trim())) return alert("All 4 options must be filled");
    if (correctAnswerIndex === null) return alert("Please select the correct answer");

    const newQuestion = {
      questionText,
      options: [...options], 
      correctAnswer: options[correctAnswerIndex],
    };

    setQuestions([...questions, newQuestion]);
    
    // Reset draft
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswerIndex(null);
  };

  const removeQuestion = (index) => {
    const newQs = [...questions];
    newQs.splice(index, 1);
    setQuestions(newQs);
  };

  const submitQuiz = async () => {
    if (!title || questions.length === 0) {
      alert("Please add a title and at least one question");
      return;
    }

    try {
      await API.post("/quizzes", {
        title,
        description,
        category,
        questions,
      });
      alert("Quiz Created Successfully! 🎉");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to create quiz");
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* WIZARD HEADER */}
        <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", fontFamily: "Georgia, serif", color: "var(--text-main)", marginBottom: "0.5rem" }}>
              Quiz Creator
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
              Design and publish your own custom quiz.
            </p>
          </div>
          
          {/* STEP INDICATOR */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", background: "var(--bg-surface)", padding: "0.75rem 1.5rem", borderRadius: "100px", border: "var(--glass-border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: step >= 1 ? "var(--accent-color)" : "var(--text-muted)", fontWeight: "600" }}>
              <Settings size={18} /> <span style={{ display: step === 1 ? "block" : "none" }}>1. Setup</span>
            </div>
            <div style={{ width: "40px", height: "2px", background: step >= 2 ? "var(--accent-color)" : "var(--border-color)", opacity: 0.5 }}></div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: step >= 2 ? "var(--accent-color)" : "var(--text-muted)", fontWeight: "600" }}>
              <LayoutList size={18} /> <span style={{ display: step === 2 ? "block" : "none" }}>2. Questions</span>
            </div>
          </div>
        </div>

        {/* STEP 1: QUIZ DETAILS */}
        {step === 1 && (
          <div className="glass-panel" style={{ padding: "3rem", maxWidth: "700px", margin: "0 auto", animation: "fadeIn 0.4s ease" }}>
            <h2 style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Settings className="text-accent" /> Quiz Settings
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "var(--text-muted)" }}>Quiz Title</label>
                <input
                  placeholder="e.g. Advanced JavaScript Concepts"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}
                />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "var(--text-muted)" }}>Description (Optional)</label>
                <textarea
                  placeholder="Briefly describe what this quiz is about..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  style={{ width: "100%", padding: "1rem", fontSize: "1rem", resize: "vertical" }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "var(--text-muted)" }}>Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: "100%", padding: "1rem", fontSize: "1rem", cursor: "pointer" }}
                >
                  {["General", "Programming", "Math", "Science", "History", "Entertainment"].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div style={{ marginTop: "3rem", display: "flex", justifyContent: "flex-end" }}>
              <button 
                className="btn-primary" 
                onClick={() => {
                  if (!title.trim()) return alert("Title is required");
                  setStep(2);
                }}
                style={{ padding: "1rem 2rem", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                Next Step: Add Questions <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: QUESTION BUILDER */}
        {step === 2 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", animation: "fadeIn 0.4s ease" }}>
            
            {/* LEFT: ADD QUESTION FORM */}
            <div className="glass-panel" style={{ padding: "2rem", alignSelf: "start", position: "sticky", top: "100px" }}>
              <button 
                onClick={() => setStep(1)}
                style={{ background: "transparent", border: "none", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", marginBottom: "2rem" }}
              >
                <ArrowLeft size={16} /> Back to Settings
              </button>
              
              <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Plus className="text-accent" /> Build a Question
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <textarea
                  placeholder="Type your question here..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  rows="2"
                  style={{ width: "100%", padding: "1rem", fontSize: "1.1rem", resize: "vertical" }}
                />
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <label style={{ fontWeight: "500", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    Options & Correct Answer
                  </label>
                  
                  {options.map((opt, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <button 
                        onClick={() => setCorrectAnswerIndex(idx)}
                        style={{ 
                          width: "30px", height: "30px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                          border: correctAnswerIndex === idx ? "none" : "2px solid var(--border-color)",
                          background: correctAnswerIndex === idx ? "#10b981" : "transparent",
                          color: "#fff", cursor: "pointer", transition: "0.2s"
                        }}
                        title="Mark as correct answer"
                      >
                        {correctAnswerIndex === idx && <CheckCircle2 size={16} />}
                      </button>
                      <input 
                        placeholder={`Option ${String.fromCharCode(65 + idx)}`} 
                        value={opt} 
                        onChange={(e) => handleOptionChange(idx, e.target.value)} 
                        style={{ flex: 1, padding: "0.75rem 1rem", border: correctAnswerIndex === idx ? "1px solid #10b981" : "" }}
                      />
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={addQuestion} 
                  style={{ 
                    marginTop: "1rem", padding: "1rem", background: "rgba(139, 92, 246, 0.1)", color: "var(--accent-color)", 
                    border: "1px dashed var(--accent-color)", borderRadius: "8px", fontWeight: "600", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", transition: "0.2s"
                  }}
                  onMouseOver={(e) => e.target.style.background = "rgba(139, 92, 246, 0.2)"}
                  onMouseOut={(e) => e.target.style.background = "rgba(139, 92, 246, 0.1)"}
                >
                  <Plus size={20} /> Add to Quiz
                </button>
              </div>
            </div>

            {/* RIGHT: QUESTION PREVIEW LIST */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0 }}>Quiz Preview <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: "normal" }}>({questions.length} questions)</span></h3>
                {questions.length > 0 && (
                  <button className="btn-primary" onClick={submitQuiz} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1.5rem" }}>
                    <Save size={18} /> Publish Quiz
                  </button>
                )}
              </div>

              {questions.length === 0 ? (
                <div style={{ padding: "4rem 2rem", textAlign: "center", background: "var(--bg-surface)", borderRadius: "16px", border: "1px dashed var(--border-color)" }}>
                  <AlertCircle size={48} color="var(--text-muted)" style={{ marginBottom: "1rem", opacity: 0.5 }} />
                  <h4 style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>No questions yet</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", opacity: 0.7 }}>Build your first question on the left to see a preview here.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {questions.map((q, i) => (
                    <div key={i} className="glass-panel" style={{ padding: "1.5rem", position: "relative" }}>
                      <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                        <button 
                          onClick={() => removeQuestion(i)}
                          style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "none", padding: "8px", borderRadius: "8px", cursor: "pointer", transition: "0.2s" }}
                          title="Remove Question"
                          onMouseOver={(e) => e.target.style.background = "rgba(239, 68, 68, 0.2)"}
                          onMouseOut={(e) => e.target.style.background = "rgba(239, 68, 68, 0.1)"}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <span style={{ background: "rgba(139, 92, 246, 0.2)", color: "var(--accent-color)", padding: "4px 10px", borderRadius: "100px", fontSize: "0.8rem", fontWeight: "600", display: "inline-block", marginBottom: "1rem" }}>
                        Question {i + 1}
                      </span>
                      <h4 style={{ fontSize: "1.1rem", marginBottom: "1.5rem", lineHeight: "1.5" }}>{q.questionText}</h4>
                      
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        {q.options.map((opt, optIdx) => {
                          const isCorrect = opt === q.correctAnswer;
                          return (
                            <div key={optIdx} style={{ 
                              padding: "0.75rem 1rem", 
                              borderRadius: "8px", 
                              border: isCorrect ? "1px solid rgba(16, 185, 129, 0.5)" : "1px solid var(--border-color)",
                              background: isCorrect ? "rgba(16, 185, 129, 0.1)" : "rgba(255,255,255,0.02)",
                              display: "flex", alignItems: "center", gap: "0.5rem",
                              fontSize: "0.95rem"
                            }}>
                              {isCorrect ? <CheckCircle2 size={16} color="#10b981" /> : <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid var(--text-muted)", opacity: 0.5 }}></div>}
                              <span style={{ color: isCorrect ? "#10b981" : "var(--text-muted)" }}>{opt}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}

export default CreateQuiz;