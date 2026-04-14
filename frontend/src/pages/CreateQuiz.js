import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
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
    alert("Question Added!");
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
        questions,
      });
      alert("Quiz Created Successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to create quiz");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "600px", marginTop: "50px", marginBottom: "50px" }}>
      <h2 style={{ marginTop: "10px", marginBottom: "30px" }}>Create a New Quiz</h2>
      
      <input
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <input
        placeholder="Description (Optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", marginBottom: "20px", width: "100%" }}
      />

      <hr />

      <h3>Add Question ({questions.length} added so far)</h3>
      
      <input
        placeholder="Question Text (e.g., What is 2+2?)"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      
      <div className="options-grid-form">
        <input placeholder="Option A" value={option1} onChange={(e) => setOption1(e.target.value)} />
        <input placeholder="Option B" value={option2} onChange={(e) => setOption2(e.target.value)} />
        <input placeholder="Option C" value={option3} onChange={(e) => setOption3(e.target.value)} />
        <input placeholder="Option D" value={option4} onChange={(e) => setOption4(e.target.value)} />
      </div>

      <p>Correct Answer:</p>
      <select 
        value={correctAnswer} 
        onChange={(e) => setCorrectAnswer(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      >
        <option value="">Select Correct Option</option>
        <option value={option1}>Option A</option>
        <option value={option2}>Option B</option>
        <option value={option3}>Option C</option>
        <option value={option4}>Option D</option>
      </select>

      <button onClick={addQuestion} style={{ display: "block", marginBottom: "20px" }}>
        Add Question to List
      </button>

      <hr />

      {/* SECTION 3: Submit Everything */}
      <button onClick={submitQuiz} style={{ backgroundColor: "#4CAF50", width: "100%" }}>
        PUBLISH QUIZ
      </button>
    </div>
  );
}

export default CreateQuiz;