const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET_KEY,
      callbackURL: "http://localhost:5000/api/sign/facebook/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log(profile);
    }
  )
);
