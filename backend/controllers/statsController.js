const User = require("../models/User");
const Quiz = require("../models/Quiz");
const Result = require("../models/Result");

exports.getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const quizCount = await Quiz.countDocuments();
    const attemptCount = await Result.countDocuments();
    
    // We can hardcode user satisfaction or calculate an average score percentage
    const stats = {
      users: userCount || 0,
      quizzes: quizCount || 0,
      attempts: attemptCount || 0,
      satisfaction: 98 // Placeholder for now, could be dynamic later
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching stats" });
  }
};
