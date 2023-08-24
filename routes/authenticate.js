const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const logger = require("../utils/logger");
const validateLogin = require("../middleware/expressValidator/validateLogin");

router.post("/api/authenticate", validateLogin, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "Login successful", token: token, email: email });
  } catch (error) {
    logger.error("Error during login:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
