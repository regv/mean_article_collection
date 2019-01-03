const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Key = require("./keys").SECRET_KEY;

//Require User Schema
const User = require("../models/userSchema");

module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = Key;
  //opts.issuer = 'accounts.examplesoft.com';
  //opts.audience = 'yoursite.net';

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    //console.log(jwt_payload);
    User.findOne({_id: jwt_payload.user._id}, (err, user) => {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
};
