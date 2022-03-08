const express = require("express");
const postController = require("../controllers/post/post.js");
const router = express.Router();
const protect = require("../middlewares/security/auth.js");
// const multer = require("../middlewares/multer/multer-config.js");
const commentController = require("../controllers/post/comment");

router.get("/", protect, postController.getPub);
router.route("/:id")
    .get(postController.getPubById)
    .delete(protect, postController.DeletePub)
    .put(protect, postController.UpdatePub);
router.post("/create", postController.CreatePub);

router.patch("/comment-post/:id", commentController.commentPost);
router.patch("/edit-comment-post/:id", commentController.editCommentPost);
router.patch("/delete-comment-post/:id", commentController.deleteCommentPost);

module.exports = router;