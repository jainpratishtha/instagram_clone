const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = mongoose.model("User");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({
      error: "please add the fields",
    });
  }
  {
    // res.json({
    //     msg: "successfully posted"
    // });
  }

  User.findOne({
    email: email,
  })
    .then((user) => {
      if (user) {
        return res.status(422).json({
          error: "user exists",
        });
      }
      //hash password
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const newUser = new User({
          email,
          password: hashedpassword,
          name,
        });

        newUser
          .save()
          .then((user) => {
            res.json({
              msg: "saved successfully",
            });
          })
          .catch((err) => {
            console.error(err);
          });
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "fields required" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid credentials" });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            res.status(200).json({ msg: "successfully signed in" });
          } else {
            return res.status(422).json({ error: "Invalid credentials" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
});

module.exports = router; // now register this in app.js
