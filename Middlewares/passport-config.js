const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../Models/userModel');
/*******Initialize the passport local strategy****/
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, async(username, password, done) => {
    await User.findOne({ username })
      .then((user) => {
        if(!user) {
          return done(null, false);
        }
        if(!user.matchPassword(password)){
          return done(null,false,{})
        }
        return done(null, user);
      }).catch(done);
  }));
/**Serialize the user by storing the user id*******/
passport.serializeUser((user, done)=>{
    done(null, user._id);
});
/***Deserialize the user by using the stored id****/
passport.deserializeUser((id, done)=>{
    User.findById(id, function(err, user){
    if(err || !user) return done(err, null);
    done(null, user);
    });
});
/*****Export passport********/
module.exports = passport;