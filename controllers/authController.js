const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Create JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};

module.exports = { register, login };
