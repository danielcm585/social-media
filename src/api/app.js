const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv/config");

const auth = require("./middlewares/auth");
const users = require("./controllers/users");
const posts = require("./controllers/posts");
const likes = require("./controllers/likes");
const comments = require("./controllers/comments");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(cors());

// Routes
app.post("/users/register", users.register);
app.post("/users/login", users.login);

app.get("/users/me", cors, auth.authenticateToken, users.getMyAccount);
app.post("/users/update", auth.authenticateToken, users.updateProfile);
app.post("/users/change-password", auth.authenticateToken, users.changePassword);

app.post("/users/follow", auth.authenticateToken, users.followUser);
app.post("/users/unfollow", auth.authenticateToken, users.unfollowUser);

app.post("/users/prof-pic", users.getProfilePicture);

app.get("/posts", posts.getAllPosts);
app.get("/posts/friends", auth.authenticateToken, posts.getFriendsPosts);

app.get("/posts/me", auth.authenticateToken, posts.getMyPosts);
app.get("/posts/:username", posts.getUsersPosts);

app.get("/posts/:postId", posts.getSpecificPost);

app.post("/posts/create", /*auth.authenticateToken,*/ posts.createPost);
app.post("/posts/edit", auth.authenticateToken, posts.editPost);
app.post("/delete/:postId", auth.authenticateToken, posts.deletePost);

app.get("/likes/:postId", likes.getPostsLikes);

app.post("/likes/like/:postId", auth.authenticateToken, likes.likePost);
app.post("/likes/unlike/:postId", auth.authenticateToken, likes.unlikePost);

app.get("/comments/:postId", comments.getPostsComments);

app.post("/comments/:postId/:replyId", auth.authenticateToken, comments.createComment);
app.post("/comments/:commentId", auth.authenticateToken, comments.editComment);

// Database
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(console.log("Connected to DB!"))
  .catch(err => console.log(err));

// Run server
app.listen(3001, () => console.log("Server is running"));