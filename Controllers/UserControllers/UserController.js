const bcrypt = require("bcrypt");
const { User } = require("../../Models/User");
const jwt = require("jsonwebtoken");
const generateToken = require("../../logic/generateToken.js");
const expressAsyncHandler = require("express-async-handler");
const fs = require("fs");
const { response } = require("../../Utils/response");
const ObjectId = require("mongoose").Types.ObjectId;

/***this is for the update of the profile***/

// Updating profile
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
      userObject.password = await digest(req.body.password);
    }
    const updatedUser = User.updateOne(
      { _id: req.params.id },
      { ...userObject, _id: req.params.id, ...user }
    );

    response(
      res,
      false,
      "",
      {
        _id: updatedUser._id,
        name: updatedUser.name,
        token: generateToken(updatedUser._id),
      },
      200
    );
  } else {
    response(res, true, "This user does not exists", {}, 404);
  }
});

// Deleting the user
exports.deleteProfile = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const filename = user.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      User.deleteOne({ _id: req.params.id })
        .then(() => response(res, false, "User deleted", {}, 200))
        .catch((error) =>
          response(
            res,
            true,
            "Could not delete the user, try later",
            error,
            400
          )
        );
    });
  } catch (error) {
    response(res, true, "Something went wrong please try later", error, 500);
  }
});

/*****Get a specific user information*****/
//getting all users
exports.getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find();
  console.log(users);
  response(res, false, "", users, 200);
});

//getting a specific user info
exports.getUserInfo = expressAsyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return response(
      res,
      true,
      "The passed id does not match any user, please choose another one",
      {},
      404
    );
  }
  User.findById(req.params.id, (err, user) => {
    if (!err) response(res, false, "", user, 200);
    else {
      response(
        res,
        true,
        "This user couldn't be found, the id is not valid",
        {},
        404
      );
    }
  });
});

// Follow a user
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
