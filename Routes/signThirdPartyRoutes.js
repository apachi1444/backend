const router = require("express").Router();
const passport = require("passport");
const response = require("../Utils/response");

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return response(res, true, "U Are not logged In ! Try Later !", {}, 401);
  }
};

router.get("/login/success", isLoggedIn, (req, res) => {
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
  "/google",
  passport.authenticate("google", { scope: ["profile", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/sign/login/failed",
  }),
  function (req, res) {
    res.redirect("api/sign/login/succes");
  }
);

router.get("/linkedin", passport.authenticate("linkedin"));

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/api/sign/login/succes",
    failureRedirect: "/api/sign/login/failed",
  })
);

// router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     successRedirect: "localhost:5000/login/succes",
//     failureRedirect: "/login/failed",
//   })
// );

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/api/sign/login/succes",
    failureRedirect: "/api/sign/login/failed",
  })
);
module.exports = router;
