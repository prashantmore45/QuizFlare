const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createQuiz, getAllQuizzes, getQuizById } = require("../controllers/quizController");

router.get("/", protect, getAllQuizzes);
router.get("/:id", protect, getQuizById);
router.post("/", protect, createQuiz);

module.exports = router;
