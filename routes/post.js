const express = require("express");
const pubController = require("../controllers/post/post.js");
const router = express.Router();
const protect = require("../middlewares/security/auth.js");
// const multer = require("../middlewares/multer/multer-config.js");
const controllerController = require("../controllers/post/comment");

router.get("/", protect, pubController.getPub);
router.route("/:id")
    .get(pubController.getPubById)
    .delete(protect, pubController.DeletePub)
    .put(protect, pubController.UpdatePub);
router.post("/create", pubController.CreatePub);

router.patch("/comment-post/:id", controllerController.commentPost);
router.patch("/edit-comment-post/:id", controllerController.editCommentPost);
router.patch("/delete-comment-post/:id", controllerController.deleteCommentPost);

module.exports = router;
