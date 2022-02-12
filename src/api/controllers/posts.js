require("dotenv/config");

const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();
  console.log(posts);
  return res.json({ posts: posts })
}

exports.getFriendsPosts = (req, res) => {

}

exports.getMyPosts = (req, res) => {

}

exports.getUsersPosts = (req, res) => {

}

exports.getSpecificPost = (req, res) => {

}

exports.createPost = (req, res) => {
  // console.log(req);
  const newPost = new Post(req.body);
  // console.log(newPost);
  newPost.save(err => {
    if (err) return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err
    });
    return res.json({
      success: true,
      message: "Post created successfully"
    });
  });
}

exports.editPost = (req, res) => {

}

exports.deletePost = (req, res) => {

}