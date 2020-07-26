const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //authorization === Bearer xrdgvbhbvcxrcgujjnbvcxrctvybhjnmnbvrerctvbujmk
  if (!authorization) {
    res.status(401).json({
      error: "user must be logged in",
    });
  }
  const token = authorization.replace("Bearer ", ""); //replace bearer with an empty string
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      res.status(401).json({
        error: "user must be logged in",
      });
    }
    const { _id } = payload;
    User.findById(_id)
      .then((userData) => {
        req.user = userData; //assigning data to req.user
        next();
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
