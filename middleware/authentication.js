const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const isAuthenticated = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Bearer token not provided." });
  }

  const token = authorizationHeader.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("Token verification failed:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = isAuthenticated;
