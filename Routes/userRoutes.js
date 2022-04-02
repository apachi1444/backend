const router = require("express").Router();
const sign = require("../controllers/userControllers/signController");
const { uploadImage } = require("../controllers/uploadControllers/uploadImage");
const userCtrl = require("../controllers/userControllers/userController");
const authorized = require("../middlewares/security/authorized");
const settings = require("../controllers/userControllers/settings");

const multer = require("multer");
const upload = multer();

router.post("/signup", sign.signUp);
router.post("/signin", sign.signIn);
router.post("/settings", authorized, settings);

router.post("/update-profile/:id", authorized, userCtrl.updateProfile);
router.delete("/delete-profile/:id", authorized, userCtrl.deleteProfile);
router.get("/:id", authorized, userCtrl.getUserInfo);
router.get("/", authorized, userCtrl.getAllUsers);
router.patch("/follow/:id", authorized, userCtrl.follow);
router.patch("/unfollow/:id", authorized, userCtrl.unfollow);

router.post("/upload", authorized, upload.single("file"), uploadImage);

module.exports = router;
