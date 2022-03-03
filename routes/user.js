const express = require("express");
const router = express.Router();
const protect = require("../Middlewares/auth");

//const verifyLogin = require("../Middlewares/auth")

const userCtrl = require("../controllers/user/user");
const userCtrlAuth = require("../controllers/user/userAuth");
const uploadProfile = require("../controllers/uploaded/uploadProfile");
const multerConfig = require("../middlewares/multer/multer-config");
const multer = require("multer");
const upload = multer();
const passport = require('../middlewares/passport-config');

router.post("/signup", userCtrlAuth.signup);
router.post("/login",
    passport.authenticate('local',{successRedirect:'/',session:true,
    successFlash:'Login was successful'}),
    userCtrlAuth.login);
router.post("/signin", userCtrlAuth.Signin);
router.post("/register", multerConfig, userCtrlAuth.register);

router.post("/updateProfile/:id", protect, userCtrl.updateProfile);
router.delete("/deleteProfile/:id", userCtrl.deleteProfile);
router.get("/:id", userCtrl.getUserInfo);
router.get("/", userCtrl.getAllUsers);
router.patch("/follow/:id", userCtrl.follow);
router.patch("/unfollow/:id", userCtrl.unfollow);

router.post("/upload", upload.single("file"), uploadProfile.updateProfile);

module.exports = router;
