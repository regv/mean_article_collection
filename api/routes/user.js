const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();

//Require User Schema
const User = require("../models/userSchema");
const Key = require("../config/keys").SECRET_KEY;

//Register User..........
router.post('/register', (req, res, next) => {
  User
    .find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: `invalid email id...`
        });
      } else {
        User
          .find({username: req.body.username})
          .exec()
          .then(user => {
            if (user.length >= 1) {
              return res.status(409).json({
              message: `invalid email id...`
              });
            } else {
              //Let's save user......
              bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                  console.log(err);
                } else {
                  bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) {
                      console.log(err);
                    } else {
                      let newUser = User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        username: req.body.username,
                        password: hash
                      });
                      return newUser
                        .save()
                        .then(user => {
                          return res.status(200).json({success: true});
                        })
                        .catch(err => {
                          return res.status(500).json(err);
                        });
                    }
                  });
                }
              });
            }
          })
          .catch(err => {
            return res.status(500).json(err);
          })
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

//Authenticate User..................
router.post('/authenticate', (req, res, next) => {
  User
  .findOne({username: req.body.username})
  .exec()
  .then(user => {
    if (!user) {
      return res.json({
        message: `no user found...`
      });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          console.log(err);
        } else {
          if (isMatch) {
            const token = jwt.sign(
              {user}, 
              Key, 
              { expiresIn: 3600 }
            );
            res.json({
              success: true,
              token: 'Bearer ' + token,
              user: {
                name: user.name,
                email: user.email,
                username: user.username,
                id: user._id
              }
            });
          } else {
            return res.json({message: `invalid password...`});
          }
        }
      });
    }
  })
  .catch(err => {
    return res.status(500).json(err);
  });
});


//Get Current User...................
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);


module.exports = router;