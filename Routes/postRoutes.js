const router = require("express").Router();
const commentController = require("../Controllers/commentController/commentController");
const postController = require("../controllers/postController/postController.js");
const authorized = require("../middlewares/security/authorized.js");

router.get("/", authorized, postController.getPost);
router
  .route("/:id")
  .get(authorized, postController.getPostById)
  .delete(authorized, postController.deletePost)
  .put(authorized, postController.updatePost);
router.post("/new-post", authorized, postController.createPost);

//  the comments are represented by single stringified tree so
//  editing, deleting, submitting a comment means modifying the tree
//  which is done on the frontend and sent here to change comment string. Simple right!!

router.patch("/comment-post/", authorized, commentController.editCommentPost);
module.exports = router;
