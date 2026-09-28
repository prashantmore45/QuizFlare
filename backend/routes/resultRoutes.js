const express = require("express");
const { saveResult, getUserResults, getLeaderboard } = require("../controllers/resultController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, saveResult);
router.get("/my-results", authMiddleware, getUserResults);
router.get("/leaderboard", getLeaderboard);

module.exports = router;
