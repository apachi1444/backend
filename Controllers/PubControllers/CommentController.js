const ObjectId = require("mongoose").Types.ObjectId;
const Pub = require("../../Models/pubModel");
module.exports.editCommentPost = () => {};

module.exports.commentPost = (res, req) => {
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

module.exports.deleteCommentPost = () => {};
