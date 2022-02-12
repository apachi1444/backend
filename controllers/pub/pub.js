const asyncHandler = require("express-async-handler");
const Pub = require("../../Models/pubModel");
const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../../Models/userModel");

const getPub = asyncHandler(async (req, res) => {
  const pubs = await Pub.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notes);
});

const getPubById = asyncHandler(async (req, res) => {
  const pub = await Pub.findById(req.params.id);

  if (pub) {
    res.json(pub);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(pub);
});

const CreatePub = asyncHandler(async (req, res) => {
  const { posterId, title, content, category } = req.body;

  if (!posterId || !title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
  } else {
    const pub = new Pub({ posterId, title, content, category });
    try {
      const createdPub = await pub.save();
      res.status(201).json(createdPub);
    } catch (err) {
      res.status(00).send(err);
    }
  }
});

const DeletePub = asyncHandler(async (req, res) => {
  const pub = await Pub.findById(req.params.id);

  if (pub.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (pub) {
    await pub.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});

const UpdatePub = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const pub = await Pub.findById(req.params.id);

  if (pub.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (pub) {
    pub.title = title;
    pub.content = content;
    pub.category = category;

    const updatedPub = await pub.save();
    res.json(updatedPub);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

module.exports = { getPubById, getPub, CreatePub, DeletePub, UpdatePub };
