const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const isAuthenticated = require("../middleware/authentication");
const logger = require("../utils/logger");

router.get("/api/all_posts", isAuthenticated, async (req, res) => {
  try {
    const authenticatedUserId = req.user.id;

    const posts = await Post.find({ createdBy: authenticatedUserId })
      .populate("likes", "_id")
      .sort({ createdAt: -1 });

    const postsWithCommentsAndLikes = await Promise.all(
      posts.map(async (post) => {
        const comments = await Comment.find({ post: post._id });
        const numberOfLikes = post.likes.length;

        return {
          id: post._id,
          title: post.title,
          desc: post.description,
          created_at: post.createdAt,
          comments: comments,
          likes: numberOfLikes,
        };
      })
    );

    res.json(postsWithCommentsAndLikes);
  } catch (error) {
    logger.error("An error occurred while fetching all posts", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching all posts." });
  }
});

module.exports = router;
