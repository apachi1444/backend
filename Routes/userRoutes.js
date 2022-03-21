const express = require("express");
const router = express.Router();
const sign = require("../controllers/userControllers/signController");
const {
  uploadImage,
} = require("../Controllers/uplodadControllers/uploadImage");

const passport = require("passport");
const protect = require("../middlewares/security/auth");
const userCtrl = require("../controllers/userControllers/userController");

const multer = require("multer");
const upload = multer();

router.post("/signup", sign.signUp);
router.post("/signin", sign.signIn);
// router.post("/register", register.register);

router.post("/updateProfile/:id", protect, userCtrl.updateProfile);
router.delete("/deleteProfile/:id", userCtrl.deleteProfile);
router.get("/:id", userCtrl.getUserInfo);
router.get("/", userCtrl.getAllUsers);
router.patch("/follow/:id", userCtrl.follow);
router.patch("/unfollow/:id", userCtrl.unfollow);

router.post("/upload", upload.single("file"), uploadImage);

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

module.exports = router;
