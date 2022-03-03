const express = require("express");
const router = express.Router();
const protect = require("../Middlewares/auth");
//const verifyLogin = require("../Middlewares/auth")

const userCtrl = require("../controllers/userControllers/userController");
const userCtrlAuth = require("../controllers/userControllers/userAuthController");
const uploadProfile = require("../controllers/uplodadControllers/uploadProfile");
const multerConfig = require("../middlewares/multer/multer-config");
const multer = require("multer");
const upload = multer();
const passport = require('../middlewares/passport-config');

/********au cas ou on va protéger notre route par le middleware on doit inseree l auth avant notre controller******/
/********route.post("/delete" , auth , deletePost)********/
router.route("/signup").post(userCtrlAuth.signup);
router.route("/login").post(
    passport.authenticate('local',{successRedirect:'/',session:true,successFlash:'Login was successful'}),
    userCtrlAuth.login);
router.route("/signin").post(userCtrlAuth.Signin);
router.route("/register").post(multerConfig, userCtrlAuth.register);

router.route("/updateProfile/:id").post(protect, userCtrl.updateProfile);
router.route("/deleteProfile/:id").delete(userCtrl.deleteProfile);
router.route("/:id").get(userCtrl.getUserInfo);
router.route("/").get(userCtrl.getAllUsers);
router.route("/follow/:id").patch(userCtrl.follow);
router.route("/unfollow/:id").patch(userCtrl.unfollow);

router.route("/upload").post(upload.single("file"), uploadProfile.updateProfile);

module.exports = router;
