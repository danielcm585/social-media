const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  username: { type: String, required: true },
  photo: { type: String, required: true },
  caption: { type: String },
  
  likes: [],
  comments: [],

  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
}, {collection: "posts"});

module.exports = mongoose.model("Posts", PostSchema);