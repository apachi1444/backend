const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      // clientID:
      //   "283428968836-n4rvvn4t7ipckhm8hrmb6b5127st4k25.apps.googleusercontent.com",
      // clientSecret: "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",
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_ID_SECRET_KEY,
      callbackURL: "http://localhost:5000/api/sign/facebook/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
