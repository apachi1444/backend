const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const User = require("../../../Models/User");
require("dotenv").config();
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET_KEY,
      callbackURL: "http://localhost:5000/api/sign/linkedin/callback",
      passReqToCallback: true,
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    function (token, tokenSecret, profile, done) {
      // asynchronous verification, for effect...
      const user = User.findOne({ linkedinId: profile.id }).then((user) => {
        if (user) {
          console.log("this profile is already in our database " + user);
          done(null, user.id);
        } else {
          console.log(profile.emails[0].value);
          let email = profile.emails[0].value;
          const userSaved = new User({
            linkedinId: profile.id,
            username: profile.displayName,
            email: email,
          })
            .save()
            .then((userSaved) => {
              if (userSaved) {
                console.log("saved with sucess");
                done(null, userSaved);
              }
            });
        }
      });
    }
  )
);
