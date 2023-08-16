const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const Post = require("../models/Post");
const isAuthenticated = require("../middleware/authentication");
const logger = require("../utils/logger");
const validateMongoId = require("../middleware/expressValidator/validateMongoId");

router.post(
  "/api/like/:id",
  isAuthenticated,
  validateMongoId,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const authenticatedUserId = req.user.id;
      const postId = req.params.id;

      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }

      const alreadyLiked = await Post.exists({
        _id: post._id,
        likes: authenticatedUserId,
      });

      if (alreadyLiked) {
        return res
          .status(400)
          .json({ message: "You have already liked this post." });
      }

      await Post.updateOne(
        { _id: post._id },
        { $push: { likes: authenticatedUserId } }
      );

      res.json({ message: "Post liked successfully." });
    } catch (error) {
      logger.error("An error occurred while liking a post", error);
      res
        .status(500)
        .json({ message: "An error occurred while liking a post." });
    }
  }
);

module.exports = router;
