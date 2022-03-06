const express = require("express");
const router = express.Router();
const protect = require("../middlewares/security/auth");
const userCtrl = require("../controllers/user/user");
const  signIn = require("../controllers/user/signIn");
const  signUp = require("../controllers/user/signUp");
const multerConfig = require("../middlewares/multer/multer-config");
const multer = require("multer");
const upload = multer();
// const passport = require('../middlewares/passport/passport-config');
const { uploadImage } = require("../controllers/upload/uploadImage");

router.post("/signup", signUp);
router.post("/signin", signIn);

router.post("/updateProfile/:id", protect, userCtrl.updateProfile);
router.delete("/deleteProfile/:id", userCtrl.deleteProfile);
router.get("/:id", userCtrl.getUserInfo);
router.get("/", userCtrl.getAllUsers);
router.patch("/follow/:id", userCtrl.follow);
router.patch("/unfollow/:id", userCtrl.unfollow);

router.post("/upload", upload.single("file"), uploadImage);

module.exports = router;
