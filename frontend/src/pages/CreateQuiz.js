import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function CreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  
  const [questionText, setQuestionText] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [questions, setQuestions] = useState([]);

  const addQuestion = (e) => {
    e.preventDefault();
    if (!questionText || !option1 || !option2 || !correctAnswer) {
      alert("Please fill all fields for the question");
      return;
    }

    const newQuestion = {
      questionText,
      options: [option1, option2, option3, option4], 
      correctAnswer,
    };

    setQuestions([...questions, newQuestion]);
    
    setQuestionText("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrectAnswer("");
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
      alert("Quiz Created Successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to create quiz");
    }
  };

  return (
    <Layout>
      <div className="container" style={{ maxWidth: "800px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "32px", fontSize: "2rem" }}>Create a New Quiz</h2>
        
        <div className="glass-panel" style={{ padding: "32px", marginBottom: "32px" }}>
          <h3 style={{ marginBottom: "16px", color: "var(--accent-color)" }}>Quiz Details</h3>
          <input
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
          <textarea
            placeholder="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            style={{ resize: "none", marginBottom: "16px", width: "100%" }}
          />
          <div className="form-group" style={{ marginBottom: "0" }}>
            <label style={{ marginBottom: "8px", display: "block" }}>Quiz Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="General">General</option>
              <option value="Programming">Programming</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>
        </div>

        {questions.length > 0 && (
          <div style={{ marginBottom: "32px" }}>
            <h3 style={{ marginBottom: "16px" }}>Added Questions ({questions.length})</h3>
            {questions.map((q, i) => (
              <div key={i} className="question-block">
                <div className="question-header">
                  <h4>Question {i + 1}</h4>
                  <button className="remove-question-btn" onClick={() => removeQuestion(i)}>Remove</button>
                </div>
                <p style={{ color: "#fff", fontWeight: "500" }}>{q.questionText}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>Answer: <span style={{ color: "#4CAF50" }}>{q.correctAnswer}</span></p>
              </div>
            ))}
          </div>
        )}

        <div className="glass-panel" style={{ padding: "32px", marginBottom: "32px" }}>
          <h3 style={{ marginBottom: "24px" }}>Add New Question</h3>
          <input
            placeholder="Question Text (e.g., What is 2+2?)"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <input placeholder="Option A" value={option1} onChange={(e) => setOption1(e.target.value)} />
            <input placeholder="Option B" value={option2} onChange={(e) => setOption2(e.target.value)} />
            <input placeholder="Option C" value={option3} onChange={(e) => setOption3(e.target.value)} />
            <input placeholder="Option D" value={option4} onChange={(e) => setOption4(e.target.value)} />
          </div>
          
          <div className="form-group" style={{ marginBottom: "24px" }}>
            <label style={{ marginBottom: "8px", display: "block" }}>Select Correct Answer:</label>
            <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
              <option value="">-- Choose Option --</option>
              {option1 && <option value={option1}>Option A: {option1}</option>}
              {option2 && <option value={option2}>Option B: {option2}</option>}
              {option3 && <option value={option3}>Option C: {option3}</option>}
              {option4 && <option value={option4}>Option D: {option4}</option>}
            </select>
          </div>
          
          <button className="add-question-btn" onClick={addQuestion} style={{ width: "100%" }}>
            + Add Question to Quiz
          </button>
        </div>

        <button className="btn-primary-large" onClick={submitQuiz} style={{ width: "100%" }}>
          PUBLISH QUIZ 🚀
        </button>
      </div>
    </Layout>
  );
}

export default CreateQuiz;