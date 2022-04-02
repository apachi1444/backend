const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const User = require("../../../Models/User");
passport.serializeUser(function (user, done) {
  // make it into a cookie
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: "http://localhost:5000/api/sign/google/callback",
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      const user = User.findOne({ googleId: profile.id }).then((user) => {
        if (user) {
          console.log("this profile is already in our database " + user);
        } else {
          const userSaved = new User({
            googleId: profile.id,
            username: profile.displayName,
          })
            .save()
            .then((userSaved) => {
              if (userSaved) {
                console.log("saved with sucess");
              }
            });
        }
      });
    }
  )
);
