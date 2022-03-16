const Post = require("../../Models/Post.js");
const { response } = require("../../utils/response.js");
const { postSchema } = require('../../logic/joi/post.js');

const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ user: req.user._id })
    return response(res, false, '', post, 200);
  } catch (error) {
    return response(res, true, 'We could not get the post, bad connection or not found', error?.errors, 400);
  };
};

const getPostById=async (req, res)=>{
  try {
    const post = await Post.findOne({ user: req.params._id })
    return response(res, false, '', post, 200);
  } catch (error) {
    return response(res, true, 'We could not get the post, bad connection or not found', error?.errors, 400);
  };
}
const createPost = async (req, res) => {
  //we ll add the images/videos later on
  const result=postSchema.validate(req.body);
  if (result.error) return response(res, true, result.error.details[0].message, [], 400);
  const post = new Post(req.body);
  try {
    const createdPost = await Post.save();
    response(res, false, createdPost, [], 201);
  } catch (err) {
    response(res, true, 'Something went wrong!', err?.errors, 400);
  }
};

const deletePost = (req, res) => {
  Post.deleteOne({_id: req.params.id})
    .then(post=>response(res, false, '', post, 200))
    .catch(e=>response(res, true, "Post couldn't be deleted, try again!", e?.errors, 400));
};

const updatePost = (req, res) => {
  //some validation on the req.body would be done here
  Post.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(post=>response(res, false, '', post, 200))
    .catch(e=>response(res, true, "Post couldn't be updated, try again!", e?.errors, 400));
};

module.exports = { getPostById, getPost, createPost, deletePost, updatePost };
