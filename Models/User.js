const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  joinedAt: {
    type: Date,
    default: () => Date.now(),
  },
  googleId: {
    type: String,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    //required: [true, "Type your username please!"],
    min: [5, "Must be at least of length 5, got {VALUE}"],
  },
  email: {
    type: String,
    //required: [true, "This is an email, make sure your email is valid"],
    unique: true,
    min: [6, "Email must be at least of length 6"],
    valide: {
      validator: (email) => {
        return isEmail(email);
      },
    },
    trim: true,
    validator: (email) => isEmail(email),
  },
  password: {
    type: String,
    //required: [true, "Password is required, please provide one"],
    min: [6, "Must be at least 6, got {VALUE}"],
    max: 1024,
  },
  phone: {
    type: String,
    //required: true,
    unique: true,
    validate: {
      validator: (v) => {
        return /(\+212|0)\d{3}\d{3}\d{3}/.test(v);
      },
      validator: (v) => /(\+212|0)\d{3}\d{3}\d{3}/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    min: [10, "Must be at least 10, got {VALUE}"],
  },
  city: {
    type: String,
  },
  foreGroundImage: {
    type: String,
    //required: false,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  backGroundImage: {
    type: String,
    //required: false,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  followers: {
    type: [mongoose.Types.ObjectId],
  },
  following: {
    type: [mongoose.Types.ObjectId],
  },
  friends: {
    type: [mongoose.Types.ObjectId],
  },
  networks: {
    type: [mongoose.Types.ObjectId],
  },
  posts: {
    type: [mongoose.Types.ObjectId],
  },
  messages: {
    type: [mongoose.Types.ObjectId],
  },
  notifications: {
    type: [mongoose.Types.ObjectId],
  },
  videoCalls: {
    type: [mongoose.Types.ObjectId],
  },
  audioCalls: {
    type: [mongoose.Types.ObjectId],
  },
  invitations: {
    type: [mongoose.Types.ObjectId],
    default: [],
    type: [mongoose.SchemaTypes.ObjectId],
  },
  following: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  friends: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  network: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  posts: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  messages: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  notifications: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  videoCalls: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  audioCalls: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  invitations: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  stars: {
    type: Number,
    default: 0,
  },
  bio: {
    type: String,
    default: "People Like Bios, Get One!",
  },
  settings: {
    type: mongoose.SchemaTypes.ObjectId,
    //required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
