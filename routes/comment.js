const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const isAuthenticated = require("../middleware/authentication");
const logger = require("../utils/logger");
const validateMongoId = require("../middleware/expressValidator/validateMongoId");

router.post(
  "/api/comment/:id",
  isAuthenticated,
  validateMongoId,
  [body("text").notEmpty().withMessage("Comment text cannot be empty")],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const postId = req.params.id;
      const authenticatedUserId = req.user.id;
      const commentText = req.body.text;

      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }

      const newComment = new Comment({
        text: commentText,
        createdBy: authenticatedUserId,
        post: post._id,
      });

      await newComment.save();

      res.status(201).json({ commentId: newComment._id });
    } catch (error) {
      logger.error("An error occurred while adding a comment", error);
      res
        .status(500)
        .json({ message: "An error occurred while adding a comment." });
    }
  }
);

module.exports = router;
