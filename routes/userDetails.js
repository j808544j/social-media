const express = require("express");
const router = express.Router();
const User = require("../models/User");
const isAuthenticated = require("../middleware/authentication");
const logger = require("../utils/logger");

router.get("/api/user", isAuthenticated, async (req, res) => {
  const authenticatedUserId = req.user.id;
  try {
    const user = await User.findById(authenticatedUserId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const followersCount = user.followers.length;
    const followingsCount = user.following.length;

    res.json({
      email: user.email,
      followers: followersCount,
      followings: followingsCount,
    });
  } catch (error) {
    logger.error("An error occurred while fetching user profile", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user profile." });
  }
});

module.exports = router;
