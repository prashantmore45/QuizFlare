const express = require("express");
const Message = require("../models/Message");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");
const router = express.Router();

// Middleware to check if user is admin
const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user); // req.user is just the ID from protect
    if (user && user.role === "admin") {
      next();
    } else {
      res.status(401).json({ message: "Not authorized as an admin" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error checking admin role" });
  }
};

// @route   POST /api/contact
// @desc    Submit a contact form message (public)
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = await Message.create({ name, email, message });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages (admin only)
router.get("/", protect, admin, async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
