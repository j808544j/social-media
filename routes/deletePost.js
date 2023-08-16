const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const Post = require("../models/Post");
const isAuthenticated = require("../middleware/authentication");
const logger = require("../utils/logger");
const validateMongoId = require("../middleware/expressValidator/validateMongoId");

router.delete(
  "/api/posts/:id",
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

      const post = await Post.findOne({
        _id: postId,
        createdBy: authenticatedUserId,
      });

      if (!post) {
        return res
          .status(404)
          .json({ message: "Post not found or unauthorised." });
      }

      await Post.deleteOne({ _id: postId });
      res.json({ message: "Post deleted successfully." });
    } catch (error) {
      logger.error("An error occurred while deleting a post", error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting a post." });
    }
  }
);

module.exports = router;
