const bcrypt = require("bcrypt");
const {User} = require("../../Models/userModel");
const jwt = require("jsonwebtoken");
const generateToken = require("../..//Utils/generateToken");
const expressAsyncHandler = require("express-async-handler");
const fs = require("fs");
const ObjectId = require("mongoose").Types.ObjectId;


/***this is for the update of the profile***/
exports.updateProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const userObject = req.file
    ? {
        ...JSON.parse(req.body),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  if (user) {
    user.name = req.body.name || user.name;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = User.updateOne(
      { _id: req.params.id },
      { ...userObject, _id: req.params.id }
    );

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

/****this is for the delete of the user****/

exports.deleteProfile = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const filename = user.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      User.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "User Deleted!" }))
        .catch((error) => res.status(400).json({ error }));
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

/****this is for the get all of the users*****/

exports.getAllUsers = expressAsyncHandler(async (req, res) => {
  // if we userModel.find().select('-name')
  // ca veut dire we must exclude the attribue name .
  const users = await User.find({});
  res.status(200).json({ users });
});
/*****Get a specific user information*****/
exports.getUserInfo = expressAsyncHandler(async (req, res) => {
  console.log(req.params.id);
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("ID unknown " + req.params.id);
  }
  User.findById(req.params.id, (err, user) => {
    if (!err) res.send(user);
    else {
      console.log("this user is not found " + req.params.id);
    }
  }).select("-password");
});
/*******Follow a user*****/
exports.follow = expressAsyncHandler(async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToFollow)
  )
    return res.status(404).send("ID unknown " + req.params.id);

  try {
    await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(200).json(docs);
        else return res.status(400).json(err);
      }
    );
    await User.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) return res.status(400).json(err);
      }
    );
  } catch (e) {
    console.error(e);
  }
});
/*****Unfollow a user******/
exports.unfollow = expressAsyncHandler(async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToUnFollow)
  )
    return res.status(404).send("ID unknown " + req.params.id);

  try {
    await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(200).json(docs);
        else return res.status(400).json(err);
      }
    );
    await User.findByIdAndUpdate(
      req.body.idToUnFollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) return res.status(400).json(err);
      }
    );
  } catch (e) {
    console.error(e);
  }
});
