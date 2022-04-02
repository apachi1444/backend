const router = require("express").Router();
const commentController = require("../Controllers/commentController/commentController");
const postController = require("../controllers/postController/postController.js");
const authorized = require("../middlewares/security/authorized.js");

router.get("/match-id", authorized, postController.getPost);
router.get("/limited-posts", authorized, postController.getPosts);
router.get("/filter-posts", authorized, postController.getPostsByFilter);

router
  .route("/:id")
  .delete(authorized, postController.deletePost)
  .put(authorized, postController.updatePost);
router.post("/new-post", authorized, postController.createPost);

//  the comments are represented by single stringified tree so
//  editing, deleting, submitting a comment means modifying the tree
//  which is done on the frontend and sent here to change comment string. Simple right!!

router.patch("/comment-post/", authorized, commentController.editCommentPost);
module.exports = router;
