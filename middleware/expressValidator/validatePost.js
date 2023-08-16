const { body } = require("express-validator");

const validatePost = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
];

module.exports = validatePost;
