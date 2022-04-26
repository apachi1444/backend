const router = require("express").Router();
const passport = require("passport");
const response = require("../utils/response");

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return response(res, true, "U Are not logged In ! Try Later !", {}, 401);
  }
};

// ******************************** this is for the google login **************************

router.get("/google/login/success", isLoggedIn, (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

router.get(
  // how we gonna authenticate the user
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
  // will check if the passport google Strategy is available or not
  // for the scope property we want to tell the passport what we gonna retrieve from the user profile
  // we will call the callback function and then do the treatement
);

router.get(
  "/google/callback",
  // this is for the exchanging the user informations which are inside the url coming back from the redirect and then fires the passpor function callback
  // before doing the function which under the passport.authenticate
  // after finishing the call back function he should fires the function /login/succes
  passport.authenticate("google", {
    failureRedirect: "login/failed",
  }),
  function (req, res) {
    // here normally it should be the profile routes in routes auth
    res.redirect("login/success");
  }
);

// ******************************** End Of Google ***********************************

// ******************************** this is for the linkedin login *****************************

router.get(
  "/linkedin",
  passport.authenticate("linkedin", { state: "email" }),
  function (req, res) {
    console.log("this is the req " + req);
  }
);

// for callback

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", { failureRedirect: "/" }),
  function (req, res) {
    console.log(req);
  }
);

// ******************************** End Of Linkedin Login ***********************************

// ******************************** this is for the facebook login ********************************

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "login/succes",
    failureRedirect: "login/failed",
  }),
  (req, res) => {
    console.log(req);
  }
);

router.get("/facebook/login/succes", (req, res) => {
  res.status(200).json({
    succes: "u have successfully logged in our website",
  });
});

// ******************************** End Of FacebookStrategy ********************************

// ******************************** this is for the github login ********************************

// router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     successRedirect: "localhost:5000/login/succes",
//     failureRedirect: "/login/failed",
//   })
// );

// ******************************** End Of GithubStrategy ********************************

module.exports = router;
