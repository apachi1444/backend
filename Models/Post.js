const mongoose = require("mongoose");
const { userSchema } = require('./User');

const postSchema = mongoose.Schema({
    posterId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    city: {
      type: String,
      required: [true, "Choose your city please!"],
      enum: {
        values: ["Kech", "Casa"],
        message: "{VALUE} is not supported",
      },
    },
    address: {
      type: String,
      required: [true, "Please add your home address."],
    },
    specifiers: {
      type: {
        type: String,
        required: [true, "Choose your city please!"],
        enum: {
          values: ["app", "room"],
          message: "{VALUE} is not supported",
        },
      },
      roomsNumber: {
        type: Number,
        required: [true, "Please specify the number of rooms."],
        enum: {
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          message: "{VALUE} is not supported as a number of rooms",
        },
      },
      livingRooms: {
        type: Number,
        required: [true, "Please specify the number of living rooms."],
        enum: {
          values: [1, 2, 3, 4],
          message: "{VALUE} is not supported",
        },
      },
      floor: {
        type: String,
        required: [true, "Choose your city please!"],
        enum: {
          values: ["rez de chaussé", 1, 2, 3, 4],
          message: "{VALUE} is not supported as value",
        },
      },
      priceSyndical: {
        type: Number,
        required: [true, "Specify the price."],
      },
    },
    description: {
      intro: {
        type: String,
        required: true,
        min: 5,
      },
      price: {
        type: Number,
        required: true,
        min: 10,
      },
    },
    images: {
      type: [ String ],
    },
    comments: {
      type: String, //We ll just stringify the data structure to make it simple
      required: false,
    },
    postedAt:{
      type: Date,
      default: Date.now
    }
});

const Post=mongoose.model("Post", postSchema);
module.exports = { Post, postSchema };
