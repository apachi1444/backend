const express = require("express");
const router = express.Router();
const protect = require("../Middlewares/auth");
//const verifyLogin = require("../Middlewares/auth")

const userCtrl = require("../Controllers/UserControllers/UserController");
const userCtrlAuth = require("../Controllers/UserControllers/UserAuthController");
const UploadProfile = require("../Controllers/UplodadControllers/UploadProfile");
const multerConfig = require("../Middlewares/multer-config");
const multer = require("multer");
const upload = multer();
const passport = require('../Middlewares/passport-config');

router.route("/signup").post(userCtrlAuth.signup);
router.route("/login").post(passport.authenticate('local',{
    successRedirect:'/', session:true, successFlash:'Login was successful'}
    ),userCtrlAuth.login);
router.route("/signin").post(userCtrlAuth.Signin);
router.route("/register").post(multerConfig, userCtrlAuth.register);

router.route("/updateProfile/:id").post(protect, userCtrl.updateProfile);
router.route("/deleteProfile/:id").delete(userCtrl.deleteProfile);
router.route("/:id").get(userCtrl.getUserInfo);
router.route("/").get(userCtrl.getAllUsers);
router.route("/follow/:id").patch(userCtrl.follow);
router.route("/unfollow/:id").patch(userCtrl.unfollow);

router.route("/upload").post(upload.single("file"), UploadProfile.updateProfile);

// pour verifier le token
// router.get("/", verifyLogin, (req, res) => {
//   res.json({ user: req.user });
// });

module.exports = router;
