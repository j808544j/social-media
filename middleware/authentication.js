const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("Token verification failed:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = isAuthenticated;
