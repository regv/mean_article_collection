const express = require("express");
const passport = require("passport");
const router = express.Router();

//Get User & Protect Dashboard
router.get('/dashboard', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.status(200).json({
    user: req.user
  });
})

module.exports = router;