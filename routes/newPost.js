const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const Post = require("../models/Post");
const isAuthenticated = require("../middleware/authentication");
const logger = require("../utils/logger");
const validatePost = require("../middleware/expressValidator/validatePost");

router.post("/api/posts", isAuthenticated, validatePost, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const authenticatedUserId = req.user.id;
    const { title, description } = req.body;

    const newPost = new Post({
      title,
      description,
      createdBy: authenticatedUserId,
    });

    await newPost.save();

    const responseData = {
      postId: newPost._id,
      title: newPost.title,
      description: newPost.description,
      createdAt: newPost.createdAt,
    };

    res.status(201).json(responseData);
  } catch (error) {
    logger.error("An error occurred while creating a post", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating a post." });
  }
});

module.exports = router;
