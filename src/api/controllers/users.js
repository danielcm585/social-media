const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const User = require("../models/User");

exports.register = async (req, res) => {
  const userReq = req.body;

  const usernameTaken = await User.findOne({ username: userReq.username });
  if (usernameTaken) return res.status(400).json({
    success: false,
    message: "Username is already taken"
  });

  const emailTaken = await User.findOne({ email: userReq.email });
  if (emailTaken) return res.status(400).json({
    success: false,
    message: "Email is already taken"
  });
      
  const newUser = new User(userReq);
  newUser.save(err => {
    if (err) return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err
    });
    return res.json({
      success: true,
      message: "User created successfully"
    });
  });
}

// FIXME: JWT token 
exports.login = async (req, res) => {
  const userReq = req.body;
  
  const user = await User.findOne({ username: userReq.username });
  if (!user) return res.status(400).json({
    success: false,
    message: "Username not found"
  });
  
  try {
    const validPassword = await bcrypt.compare(userReq.password, user.password);
    if (!validPassword) return res.status(400).json({
      success: false,
      message: "Wrong password"
    });
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      message: "Check password error",
      error: err
    });
  }
  
  try {
    const token = jwt.sign({
      email: user.email,
      followers: user.followers,
      posts: user.posts,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }, process.env.ACCESS_TOKEN_SECRET);
    return res.header("auth-token", token).send({
      success: true,
      message: "Logged in succesfully",
      username: user.username,
      photo: user.photo,
      token: token
    });
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      message: "JWT error",
      error: err
    });
  }
}

exports.getProfilePicture = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  return res.json({ photo: user.photo });
}

// FIXME: CORS error
exports.getMyAccount = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.sendStatus(400);
  return res.json({
    username: user.username,
    photo: user.photo,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  });
}

exports.updateProfile = (req, res) => {

}

exports.changePassword = (req, res) => {

}

exports.followUser = (req, res) => {

}

exports.unfollowUser = (req, res) => {

}