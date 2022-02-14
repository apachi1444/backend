const ObjectId = require("mongoose").Types.ObjectId;
const Pub = require("../../Models/pubModel");
module.exports.editCommentPost = async(req,res) => {
  const {ID} = req.params;
  const newText = req.body.newText;
  if(!ObjectID.isValid(ID)){
  return res.status(400).send("ID does not exist: " + req.params.id);
  };
  await Pub.update({" comments.commenterId" : ID },{$set : {"comments.$.text" : newText} })
    .then( result =>{
       res.status(200).json({message:"Comment deleted successfully"});                                            
     })
     .catch(e=>{
       res.status(400).send(err);
     }); 
};

module.exports.commentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    return Pub.findByIdAndUpdate(
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
  await Pub.findOneAndUpdate({" comments.commenterId" : ID },{$pull : { comments : { commenterId : ID } }})
      .then(result=>{
         res.status(200).json({message:"Comment deleted successfully"});                                            
       })
       .catch(e=>{
         res.status(400).send(err);
       });                                                                                                                                                                                      
};
