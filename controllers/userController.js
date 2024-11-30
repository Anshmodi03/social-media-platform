const User = require("../models/User");

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user);
};

module.exports = { getUserProfile };
