import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  commentOnPost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

/* COMMENT */
router.post("/:id/comment", verifyToken, commentOnPost); // Add this line for commenting

export default router;
