const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const logger = require("../utils/logger");
const validateRegistration = require("../middleware/expressValidator/validateRegistration");

router.post("/register", validateRegistration, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    logger.info(`New user registered with email: ${email}`);
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    logger.error("Error registering user:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

module.exports = router;
