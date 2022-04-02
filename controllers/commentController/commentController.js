const Post = require("../../Models/Post");
const { User } = require("../../Models/User");
const { response } = require("../../utils/response");
const { Notification } =require('../../Models/media/Notification');

/*
the request would be in this format:
req.body={
    commenterId, posterId, 
    postId, commentsTree
  }
*/
module.exports.editCommentPost = async (req, res) => {
  const { commenterId, posterId, postId, commentsTree } = req.body;
  try {
    await Post.findOneAndUpdate({ _id: postId }, {
      $set: {
        comments: commentsTree
      }
    });
    await User.findOneAndUpdate({ _id: commenterId }, {
      $addToSet: {
        network: posterId
      }
    });
    const not=new Notification({ reacterId: commenterId, reactedId: posterId, reactionType: 'comment' });
    await not.save()
    await User.findOneAndUpdate({ _id:  posterId}, {
      $push: {
        notifications: not._id
      }
    });
    response(res, false, '', req.body, 200);
  } catch (error) {
    response(res, true, 'Could not save your comment', error, 404);
  };  
};
