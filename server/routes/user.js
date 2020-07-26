const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requireLogin = require("../middleware/requireLogin");
const User = mongoose.model("User");
mongoose.set(`useFindAndModify`, false);

router.get("/user/:id", requireLogin, (req, res) => {
  User.findOne({ _id: req.params.id }) // query to findd the deertails of the user except the password
    .select("-password") //get everything except the password
    .then((user) => {
      Post.find({ postedBy: req.params.id }) // find all the posts posted by that user
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts }); //sending user details and it's posts
        });
    })
    .catch((err) => res.status(404).json({ error: "User not found" }));
});

router.put("/follow", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ err });
      }
    }
  );
  User.findByIdAndUpdate(
    req.user._id,
    { $push: { following: req.body.followId } },
    { new: true }
  )
    .select("-password")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(422).json({ err });
    });
});
router.put("/unfollow", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ err });
      }
    }
  );
  User.findByIdAndUpdate(
    req.user._id,
    { $pull: { following: req.body.unfollowId } },
    { new: true }
  )
    .select("-password")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(422).json({ err });
    });
});

router.put("/updatepic", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { pic: req.body.pic } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      res.json(result);
    }
  );
});

module.exports = router;
