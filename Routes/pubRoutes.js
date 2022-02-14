const express = require("express");
const pubController = require("../controllers/pubControllers/pubController.js");
const router = express.Router();
const protect = require("../middlewares/security/auth.js");
const multer = require("../middlewares/multer/multer-config.js");
const controllerController = require("../controllers/pubControllers/commentController");

router.route("/").get(protect, pubController.getPub);
router.route("/:id")
    .get(pubController.getPubById)
    .delete(protect, pubController.DeletePub)
    .put(protect, pubController.UpdatePub);
router.route("/create").post(pubController.CreatePub);

// id de la pub faite par un utilisateur donnee
router.route("/comment-post/:id").patch(controllerController.commentPost);
router.route("/edit-comment-post/:id").patch(controllerController.editCommentPost);
router.route("/delete-comment-post/:id").patch(controllerController.deleteCommentPost);

module.exports = router;
