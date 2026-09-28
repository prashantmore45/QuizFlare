const Result = require("../models/Result");

exports.saveResult = async (req, res) => {
  try {
    const { quizId, score, totalQuestions } = req.body;
    
    if (score === undefined || !totalQuestions) {
      return res.status(400).json({ message: "Invalid result data" });
    }

    const result = await Result.create({
      user: req.user,
      quiz: quizId,
      score,
      totalQuestions
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error saving result" });
  }
};

exports.getUserResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user }).populate("quiz", "title").sort({ createdAt: -1 });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching results" });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Result.aggregate([
      {
        $group: {
          _id: "$user",
          totalScore: { $sum: "$score" },
          quizzesTaken: { $sum: 1 },
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          name: "$userInfo.name",
          totalScore: 1,
          quizzesTaken: 1
        }
      },
      { $sort: { totalScore: -1 } },
      { $limit: 10 }
    ]);
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching leaderboard" });
  }
};
