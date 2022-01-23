const express = require("express");
const pubController = require("../Controllers/PubControllers/PubController.js");
const router = express.Router();
const protect = require("../Middlewares/auth.js");
const multer = require("../Middlewares/multer-config.js");
const ControllerController = require("../Controllers/PubControllers/CommentController");
router.route("/").get(protect, pubController.getPub);
router
  .route("/:id")
  .get(pubController.getPubById)
  .delete(protect, pubController.DeletePub)
  .put(protect, pubController.UpdatePub);
router.route("/create").post(pubController.CreatePub);

// id de la pub done by the user
router.route("/comment-post/:id").patch(ControllerController.commentPost);
router
  .route("/edit-comment-post/:id")
  .patch(ControllerController.editCommentPost);
router
  .route("/delete-comment-post/:id")
  .patch(ControllerController.deleteCommentPost);

module.exports = router;
