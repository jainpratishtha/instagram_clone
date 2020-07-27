const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requireLogin = require("../middleware/requireLogin");
mongoose.set(`useFindAndModify`, false);

router.get("/allPosts", requireLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name") //expand the postedBy and show just id and name
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((posts) => {
      return res.json({
        posts,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/followingPosts", requireLogin, (req, res) => {
  Post.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name") //expand the postedBy and show just id and name
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((posts) => {
      return res.json({
        posts,
      });
    })
    .catch((err) => console.error(err));
});

router.post("/createPost", requireLogin, (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    res.status(422).json({
      error: "fields required",
    });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      return res.status(200).json({
        post: result,
      });
    })
    .catch((err) => {
      return console.error(err);
    });
});

router.get("/myPosts", requireLogin, (req, res) => {
  Post.find({
    postedBy: req.user._id,
  })
    .populate("postedBy", "_id name")
    .then((mypost) => {
      res.json({
        mypost,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.delete("/deletepost/:postId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});
// router.delete("/deletecomment/:postId/:commentId", requireLogin, (req, res) => {
//   console.log(req.params.commentId, req.params.postId);
//   Post.findOne({ _id: req.params.postId })
//     .populate("comments.postedBy", "_id")

//     .exec((err, post) => {
//       if (err || !post) {
//         return res.status(422).json({ error: err });
//       }

//       if (post.comments[i]._id === req.params.commentId)
//           return post.comment._id
//             .remove()
//             .then((result) => {
//               res.json(result);
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         else {
//           res.json({ error: "cannot find the comment" });
//         }

//     });
// });

module.exports = router;
