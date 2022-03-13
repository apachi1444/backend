const express = require("express");
// const multer = require("../middlewares/multer/multer-config.js");
const commentController = require("../Controllers/commentController/commentController");
const postController = require("../controllers/postController/postController.js");
const router = express.Router();
const protect = require("../middlewares/security/auth.js");

router.get("/", protect, postController.getPub);
router
  .route("/:id")
  .get(postController.getPubById)
  .delete(protect, postController.DeletePub)
  .put(protect, postController.UpdatePub);
router.post("/new-post", postController.CreatePub);

//  the comments are represented by single stringified tree so
//  editing, deleting, submitting a comment means modifying the tree
//  which is done on the frontend and sent here to change comment string. Simple right!!

router.patch("/comment-post/", commentController.editCommentPost);
module.exports = router;
