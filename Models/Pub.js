const mongoose = require("mongoose");

const pubSchema = mongoose.Schema(
  {
    typeAnnouncement: {
      type: String,
      required: [true, "choose your type of annonce  please!"],
      enum: {
        values: ["Coloc", "Allocation"],
        message: "{VALUE} is not supported",
      },
    },
    city: {
      type: String,
      required: [true, "choose your city please!"],
      enum: {
        values: ["Kech", "Casa"],
        message: "{VALUE} is not supported",
      },
    },
    // this is for the secteur
    zone: {
      type: String,
      required: [true, "choose your zone please!"],
      enum: {
        values: ["jnane", "sidi Abbad"],
        message: "{VALUE} is not supported",
      },
    },
    address: {
      type: String,
      required: [true, "choose your zone please!"],
    },
    specifiers: {
      type: {
        type: String,
        required: [true, "choose your city please!"],
        enum: {
          values: ["app", "room"],
          message: "{VALUE} is not supported",
        },
      },
      number_rooms: {
        type: Number,
        required: [true, "choose your city please!"],
        enum: {
          values: [1, 2, 3, 4],
          message: "{VALUE} is not supported",
        },
      },
      livingRooms: {
        type: Number,
        required: [true, "choose your city please!"],
        enum: {
          values: [1, 2, 3, 4],
          message: "{VALUE} is not supported",
        },
      },
      floor: {
        type: String,
        required: [true, "choose your city please!"],
        enum: {
          values: ["rez de chaussé", 1, 2, 3, 4],
          message: "{VALUE} is not supported",
        },
      },
      priceSyndical: {
        type: Number,
        required: [true, "choose your city please!"],
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
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
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

const Pub = mongoose.model("Pub", pubSchema);

module.exports = Pub;
