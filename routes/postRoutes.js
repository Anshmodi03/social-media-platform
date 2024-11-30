const express = require("express");
const {
  createPost,
  likePost,
  commentOnPost,
} = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.post("/like/:id", authMiddleware, likePost);
router.post("/comment/:id", authMiddleware, commentOnPost);

module.exports = router;
