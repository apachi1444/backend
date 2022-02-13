const mongoose = require("mongoose");
const { userSchema } = require('./User');

const Post = mongoose.Schema(
  {
    typeAnnouncement: {
      type: String,
      required: [true, "Choose your type of post  please!"],
      enum: {
        values: ["Coloc", "Allocation"],
        message: "{VALUE} is not supported",
      },
    },
    city: {
      type: String,
      required: [true, "Choose your city please!"],
      enum: {
        values: ["Kech", "Casa"],
        message: "{VALUE} is not supported",
      },
    },
    /*******This is for region****/
    zone: {
      type: String,
      required: [true, "Choose your zone please!"],
      enum: {
        values: ["Jnane Awrad", "Sidi Abbad"],
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
      number_rooms: {
        type: Number,
        required: [true, "Please specify the number of rooms."],
        enum: {
          values: [1, 2, 3, 4],
          message: "{VALUE} is not supported",
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
          message: "{VALUE} is not supported",
        },
      },
      priceSyndical: {
        type: Number,
        required: [true, "Specify the price."],
      },
    },
    description: {
      title: {
        type: String,
        required: true,
        min: 5,
      },
    content: {
        type: String,
        required: true,
        min: 10,
      },
     price: {
        type: Number,
        required: true,
        min: 10,
      },
    },
    images: {
      data: Buffer,
      contentType: String,
    },
    user: {
      type:userSchema,
      required:true,
    },
    posterId: {
      type: String,
      required: true,
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterName: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },

  {
    timestamps: true,
  },
  {
    collection: "pubs",
  }
);

module.exports = mongoose.model("Post", Post);
