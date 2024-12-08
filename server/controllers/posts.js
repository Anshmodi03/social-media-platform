import Post from "../models/Post.js";
import User from "../models/User.js";
import Like from "../models/Like.js"; // Import Like model
import Comment from "../models/Comment.js"; // Import Comment model

/* CREATE POST */
export const createPost = async (req, res) => {
  const { userId, description, picturePath } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating post" });
  }
};

/* LIKE POST */
export const likePost = async (req, res) => {
  const { id: postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const existingLike = await Like.findOne({ userId, postId });
    if (existingLike) {
      // If already liked, remove the like
      await existingLike.deleteOne();
      post.likes.delete(userId);
    } else {
      // Otherwise, add a new like
      const like = new Like({ userId, postId });
      await like.save();
      post.likes.set(userId, true);
    }

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error liking post" });
  }
};

/* COMMENT ON POST */
export const commentOnPost = async (req, res) => {
  const { id: postId } = req.params;
  const { userId, content } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = new Comment({ userId, postId, content });
    await newComment.save();

    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error commenting on post" });
  }
};

/* GET POSTS FOR FEED */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("comments").populate("likes");
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

/* GET USER POSTS */
export const getUserPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await Post.find({ userId })
      .populate("comments")
      .populate("likes");
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user posts" });
  }
};
