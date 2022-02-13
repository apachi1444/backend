const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  profession: {
    type: String,
    required: [true, "Choose your profession please!"],
    enum: {
      values: ["Student", "Professional"],
      message: "{VALUE} is not supported",
    },
  },
  firstName: {
    type: String,
    required: [true, "Type your firstname please!"],
    min: [3, "Must be at least 6, got {VALUE}"],
  },
  lastName: {
    type: String,
    required: [true, "type your  lastname please!"],
    min: [3, "Must be at least 6, got {VALUE}"],
  },
  gender: {
    type: String,
    required: [true, "Choose your gender please!"],
    enum: { values: ["Male", "Female"], message: "{VALUE} is not supported" },
  },
  phone: {
    type: String,
    required: [true, "Type your phone number please!"],
    unique: true,
    validate: {
      validator: function (v) {
        return /(\+212|0)\d{3}\d{3}\d{3}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    min: [10, "Must be at least 6, got {VALUE}"],
  },
  city: {
    type: String,
    required: [true, "Choose your city please!"],
    enum: {
      values: ["Kech", "Casa"],
      message: "{VALUE} is not supported",
    },
  },
  userName:{
    type:String,
    required:[true,'Choose a username'],
    unique:true,
    trim:true
  },
  email: {
    type: String,
    required: [true, "Type an email please!"],
    unique: true,
    min: [6, "Must be at least 6, got {VALUE}"],
    valide: {
      validator:(email)=>{
        return isEmail(email);
      }
    },
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Type a password please!"],
    min: [6, "Must be at least 6, got {VALUE}"],
    max: 1024,
  },
  imageUrl: {
    type: String,
    required: true,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  followers: {
    type: [String],
  },
  following: {
    type: [String],
  },
  date: { 
    type: Date, 
    default: Date.now() 
  },
});

userSchema.plugin(uniqueValidator);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//this method will be called if the user just create his account so he won't see the original password
//we will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    throw new Error("Incorrect password");
  }
  throw new Error("Email is not valid");
};

const User = mongoose.model('User', userSchema);
module.exports = { User, userSchema };
