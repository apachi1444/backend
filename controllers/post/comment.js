const ObjectId = require("mongoose").Types.ObjectId;
const Post = require("../../Models/Post");
const { response } = require("../../utils/response");

module.exports.editCommentPost = async(req,res) => {
  const { ID } = req.params;
  const newText = req.body.newText;
  if(!ObjectID.isValid(ID)){
  return response(res, true, "ID does not exist: " + req.params.id, {}, 400);
  };
  await Post.update({ "comments.commenterId" : ID }, { $set : {"comments.$.text" : newText } })
    .then( result =>{
       response(res, false, 'Comment deleted successfully', {}, 200);                                            
     })
     .catch(e=>{
      response(res, false, "Comment coudn't be deleted, try later", {}, 200); 
     }); 
};

module.exports.commentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commentorID: req.body.commentorID,
            commentorName: req.body.commentorName,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) {
          res.send(docs);
        } else {
          res.status(400).send(err);
        }
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.deleteCommentPost = async(req,res) => {
  const {ID} = req.params;
  if(!ObjectID.isValid(ID)){
    return res.status(400).send("ID does not exist: " + req.params.id);
  };
  await Post.findOneAndUpdate({" comments.commenterId" : ID },{$pull : { comments : { commenterId : ID } }})
      .then(result=>{
         res.status(200).json({message:"Comment deleted successfully"});                                            
       })
       .catch(e=>{
         res.status(400).send(err);
       });                                                                                                                                                                                      
};
