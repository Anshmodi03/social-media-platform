const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Like = require("../models/Like"); // Import Like model

const createPost = async (req, res) => {
  const { content, image } = req.body;

  // Ensure userId is available
  if (!req.userId) {
    return res.status(400).json({ message: "User not authenticated" });
  }

  const post = new Post({
    userId: req.userId,
    content,
    image,
  });

  try {
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error); // Log error details for debugging
    res.status(500).json({ message: "Error creating post" });
  }
};

const likePost = async (req, res) => {
  const postId = req.params.id;

  if (!req.userId) {
    return res.status(400).json({ message: "User not authenticated" });
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Check if this user has already liked the post
  const existingLike = await Like.findOne({ userId: req.userId, postId });
  if (existingLike) {
    return res.status(400).json({ message: "Already liked" });
  }

  // Create new like document
  const like = new Like({
    userId: req.userId,
    postId,
  });

  try {
    // Save the like
    await like.save();

    // Optionally, you can also update the `Post` document to store the like's reference
    post.likes.push(like._id); // Push the like reference to the post's likes array
    await post.save();

    res.status(200).json({ message: "Post liked" });
  } catch (error) {
    console.error(error); // Log error details for debugging
    res.status(500).json({ message: "Error liking post" });
  }
};

const commentOnPost = async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;

  if (!req.userId) {
    return res.status(400).json({ message: "User not authenticated" });
  }

  const newComment = new Comment({
    userId: req.userId,
    postId,
    content,
  });

  try {
    await newComment.save();

    // Add the comment to the post's comment list
    const post = await Post.findById(postId);
    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error); // Log error details for debugging
    res.status(500).json({ message: "Error commenting on post" });
  }
};

module.exports = { createPost, likePost, commentOnPost };
