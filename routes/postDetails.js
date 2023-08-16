const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const logger = require("../utils/logger");
const validateMongoId = require("../middleware/expressValidator/validateMongoId");

router.get("/api/posts/:id", validateMongoId, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const postId = req.params.id;

    const post = await Post.findById(postId).populate("likes", "_id");

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const comments = await Comment.find({ post: postId });

    const responseData = {
      post: post,
      numberOfLikes: post.likes.length,
      numberOfComments: comments.length,
    };

    res.json(responseData);
  } catch (error) {
    logger.error("An error occurred while fetching a post", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching a post." });
  }
});

module.exports = router;
