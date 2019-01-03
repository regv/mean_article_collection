const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

//Require Post Model
const Post = require("../models/postSchema");

//Get All Posts .................................
router.get('/posts', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  Post
    .find()
    .sort({date: -1})
    .select('title body author _id')
    .exec()
    .then(posts => {
      if (posts.length < 1) {
        return res.status(409).json({
          message: `no posts found...`
        });
      } else {
        return res.status(200).json(posts);
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});


//Add Post............................
router.post('/post/add', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const newPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    body: req.body.body,
    author: req.body.author
  });
  return newPost
    .save()
    .then(post => {
      return res.status(200).json({
        success: true
      });
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});


//Get Post By Id...............................
router.get('/post/:id', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const postId = req.params.id;
  Post
  .findOne({_id: postId})
  .select('_id title body author')
  .exec()
  .then(post => {
    if (post.length < 1) {
      return res.status(409).json({
        message: `post not found...`
      });
    } else {
      return res.status(200).json(post);
    }
  })
  .catch(err => {
    return res.status(500).json(err);
  });
});


//Patch Post..................................
router.patch('/post/:id', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const postId = req.params.id;
  Post
  .find({_id: postId})
  .select('_id title body author')
  .exec()
  .then(post => {
    if (post.length < 1) {
      return res.status(409).json({
        message: `post not found...`
      });
    } else {
      const newPost = {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
      };
      Post
        .updateOne({_id: postId}, {$set: newPost})
        .exec()
        .then(post => {
          res.status(200).json({success: true});
        })
    }
  })
  .catch(err => {
    return res.status(500).json(err);
  });
});


//Delete Post...............................
router.delete('/post/:id', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const postId = req.params.id;
  Post
    .find({_id: postId})
    .exec()
    .then(posts => {
      if (posts.length < 1) {
        return res.status(409).json({
          message: `no posts found...`
        });
      } else {
        Post
          .deleteOne({_id: postId})
          .exec()
          .then(post => {
            return res.status(200).json({success: true});
          })
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    })
});

module.exports = router;