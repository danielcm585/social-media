const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  username: { type: String },
  content: { type: String },
  
  replies: [],

  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
}, {collection: "comments"});

module.exports = mongoose.model("Comments", CommentSchema);