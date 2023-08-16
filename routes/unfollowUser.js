const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const User = require("../models/User");
const logger = require("../utils/logger");
const isAuthenticated = require("../middleware/authentication");
const validateMongoId = require("../middleware/expressValidator/validateMongoId");

router.post(
  "/api/unfollow/:id",
  validateMongoId,
  isAuthenticated,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const authenticatedUserId = req.user.id;
      const unfollowedUserId = req.params.id;

      const authenticatedUser = await User.findByIdAndUpdate(
        authenticatedUserId,
        { $pull: { following: unfollowedUserId } }
      );

      if (!authenticatedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res.json({ message: "Successfully unfollowed the user." });
    } catch (error) {
      logger.error("An error occurred while unfollowing the user", error);
      res
        .status(500)
        .json({ message: "An error occurred while unfollowing the user." });
    }
  }
);

module.exports = router;
