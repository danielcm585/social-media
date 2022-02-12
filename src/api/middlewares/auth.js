const jwt = require("jsonwebtoken");
require("dotenv/config");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
  
  // try {
  //   user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  //   req.user = user;
  //   next();
  // }
  // catch (err) {
  //   console.log(err);
  //   return res.sendStatus(403);
  // }
}