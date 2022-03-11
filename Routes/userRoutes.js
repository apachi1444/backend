const express = require("express");
const router = express.Router();
const protect = require("../middlewares/security/auth");
const userCtrl = require("../controllers/userControllers/userController");
const signController = require("../controllers/userControllers/signController");
// const multerConfig = require("../middlewares/multer/multer-config");
const multer = require("multer");
const upload = multer();
const { uploadImage } = require("../controllers/uplodadControllers/uploadImage");

router.post("/signup", signController.signUp);
router.post("/signin", signController.signIn);

router.post("/updateProfile/:id", protect, userCtrl.updateProfile);
router.delete("/deleteProfile/:id", userCtrl.deleteProfile);
router.get("/:id", userCtrl.getUserInfo);
router.get("/", userCtrl.getAllUsers);
router.patch("/follow/:id", userCtrl.follow);
router.patch("/unfollow/:id", userCtrl.unfollow);

router.post("/upload", upload.single("file"), uploadImage);

module.exports = router;
