const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const isAuthenticated = require("../middleware/authentication");
const logger = require("../utils/logger");
const validateMongoId = require("../middleware/expressValidator/validateMongoId");

router.post(
  "/api/unlike/:id",
  isAuthenticated,
  validateMongoId,
  async (req, res) => {
    try {
      const postId = req.params.id;
      const authenticatedUserId = req.user.id;

      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }

      if (!post.likes.includes(authenticatedUserId)) {
        return res
          .status(400)
          .json({ message: "You haven't liked this post." });
      }

      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: authenticatedUserId },
      });

      res.json({ message: "Post unliked successfully." });
    } catch (error) {
      logger.error("An error occurred while unliking a post", error);
      res
        .status(500)
        .json({ message: "An error occurred while unliking a post." });
    }
  }
);

module.exports = router;
