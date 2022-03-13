const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  postedAt:{
    type: Date,
    default: ()=>Date.now()
  },
  posterId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  },
  city: {
    type: String,
    required: [true, "Please choose the city where the apartment/room is at"],
    enum: {
      values: ["Kech", "Casa"],
      message: "{VALUE} is not supported",
    },
  },
  address: {
    type: String,
    required: [true, "Please add the address of the apartment/room"],
  },
  category: {
    type: String,
    required: [true, "Pick up a city please!"],
    enum: {
      values: ["apartment", "room"],
      message: "{VALUE} is not neither a room nor an apartment",
    },
  },
  roomsNumber: {
    type: Number,
    required: [true, "Please specify the number of rooms"],
    enum: {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      message: "{VALUE} is not supported as a number of rooms",
    },
  },
  livingRooms: {
    type: Number,
    required: [true, "Please specify the number of living rooms."],
    enum: {
      values: [0, 1, 2, 3, 4],
      message: "{VALUE} is not supported",
    },
  },
  floor: {
    type: String,
    required: [true, "Please choose the floor of the apartment/room"],
    enum: {
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      message: "{VALUE} is not a floor!",
    },
  },
  guardPrice: {
    type: Number,
    required: [true, "Specify the price for the security please"],
  },
  description: {
    type: String,
    required: true,
    min: 5,
  },
  price: {
    type: Number,
    required: true,
    min: 10,
  },
  imagesVideos: {//these are the urls of vid/images showing the app/room
    type: [ String ],
  },
  comments: {
    type: String, //We ll just stringify the data structure to make it simple
    required: false,
  },
  moreServices:{
    type: [ String ]
  }
});

const Post=mongoose.model("Post", postSchema);
module.exports = { Post, postSchema };
