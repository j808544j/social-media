const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const User = require("../models/User");
const logger = require("../utils/logger");
const isAuthenticated = require("../middleware/authentication");
const validateMongoId = require("../middleware/expressValidator/validateMongoId");

router.post(
  "/api/follow/:id",
  validateMongoId,
  isAuthenticated,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const authenticatedUserId = req.user.id;
      const followedUserId = req.params.id;

      const authenticatedUser = await User.findByIdAndUpdate(
        authenticatedUserId,
        { $addToSet: { following: followedUserId } }
      );

      if (!authenticatedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res.json({ message: "Successfully followed the user." });
    } catch (error) {
      logger.error("error while following a user", error);
      res
        .status(500)
        .json({ message: "An error occurred while following the user." });
    }
  }
);

module.exports = router;
