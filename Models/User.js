const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    // required: [true, "Type your username please!"],
    min: [5, "Must be at least of length 5, got {VALUE}"],
  },
  email: {
    type: String,
    required: [true, "Type your email please!"],
    unique: true,
    min: [6, "Must be at least 6, got {VALUE}"],
    valide: {
      validator: (email) => {
        return isEmail(email);
      },
    },
    trim: true,
  },
  phone: {
    type: String,
    required: false,
    unique: true,
    validate: {
      validator: (v) => {
        return /(\+212|0)\d{3}\d{3}\d{3}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    min: [10, "Must be at least 10, got {VALUE}"],
  },
  city: {
    type: String,
    // required: [true, "Choose your city please!"],
  },
  password: {
    type: String,
    required: [true, "Type your password please!"],
    min: [6, "Must be at least 6, got {VALUE}"],
    max: 1024,
  },
  foreGroundImage: {
    type: String,
    required: false,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  backGroundImage: {
    type: String,
    required: false,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  followers: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  following: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  friends: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  networks: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  posts: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  messages: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  notifications: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  videoCalls: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  audioCalls: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  invitations: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  stars: {
    type: Number,
    default: 0,
  },
  bio: {
    type: String,
    default: "No Bio",
  },
  settings: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  joiningDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
