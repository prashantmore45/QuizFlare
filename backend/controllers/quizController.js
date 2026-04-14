const Quiz = require("../models/Quiz");

exports.createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({ message: "Quiz data incomplete" });
    }

    const quiz = await Quiz.create({
      title,
      description,
      questions,
      createdBy: req.user,
    });

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().select("title description");
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

