const express = require("express");
const router = express.Router();
const userAuthController = require("../Controllers/userControllers/userAuthController");
const multerConfig = require("../Middlewares/multer/multer-config");
// const passport = require('../middlewares/passport/passport-config');
const {
  uploadImage,
} = require("../Controllers/uplodadControllers/uploadImage");

router.post("/signup", userAuthController.signUp);
router.post("/signin", userAuthController.signIn);
router.post("/register", userAuthController.register);
const protect = require("../middlewares/security/auth");
const userCtrl = require("../controllers/userControllers/userController");
const signController = require("../controllers/userControllers/signController");
// const multerConfig = require("../middlewares/multer/multer-config");
const multer = require("multer");
const upload = multer();

// router.post("/signup", signController.signUp);
// router.post("/signin", signController.signIn);

router.post("/updateProfile/:id", protect, userCtrl.updateProfile);
router.delete("/deleteProfile/:id", userCtrl.deleteProfile);
router.get("/:id", userCtrl.getUserInfo);
router.get("/", userCtrl.getAllUsers);
router.patch("/follow/:id", userCtrl.follow);
router.patch("/unfollow/:id", userCtrl.unfollow);

router.post("/upload", upload.single("file"), uploadImage);

module.exports = router;
