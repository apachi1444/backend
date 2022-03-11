const Pub = require("../../Models/Post.js");
const { response } = require("../../utils/response.js");
const { postSchema } = require('../../logic/joi/post.js');

const getPub = async (req, res) => {
  try {
    const pub = await Pub.findOne({ user: req.user._id })
    return response(res, false, '', pub, 200);
  } catch (error) {
    return response(res, true, 'We could not get the post, bad connection or not found', error, 400);
  };
};

const getPubById=async (req, res)=>{
  try {
    const pub = await Pub.findOne({ user: req.params._id })
    return response(res, false, '', pub, 200);
  } catch (error) {
    return response(res, true, 'We could not get the post, bad connection or not found', error, 400);
  };
}
const CreatePub = async (req, res) => {
  //we ll add the images/videos later on
  const result=postSchema.validate(req.body);
  if (result.error) return response(res, true, result.error.details[0].message, [], 400);
  const pub = new Pub(req.body);
  try {
    const createdPub = await pub.save();
    response(res, false, createdPub, [], 201);
  } catch (err) {
    response(res, true, err, [], 400);
  }
};

const DeletePub = (req, res) => {
  Pub.deleteOne({_id: req.params.id})
    .then(post=>response(res, false, '', post, 200))
    .catch(e=>response(res, true, "Post couldn't be deleted, try again!", e, 400));
};

const UpdatePub = (req, res) => {
  //some validation on the req.body would be done here
  Pub.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(post=>response(res, false, '', post, 200))
    .catch(e=>response(res, true, "Post couldn't be updated, try again!", e, 400));
};

module.exports = { getPubById, getPub, CreatePub, DeletePub, UpdatePub };
