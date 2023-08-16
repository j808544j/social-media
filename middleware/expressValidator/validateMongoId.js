const { param } = require("express-validator");

const unfollowUser = [
  param("id").isMongoId().withMessage("Invalid user ID format"),
];

module.exports = unfollowUser;
