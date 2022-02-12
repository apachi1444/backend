const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  profession: {
    type: String,
    required: [true, "choose your role please!"],
    enum: {
      values: ["Student", "Professional"],
      message: "{VALUE} is not supported",
    },
  },
  name: {
    type: String,
    required: [true, "type a name please!"],
    min: [3, "Must be at least 6, got {VALUE}"],
  },
  lastname: {
    type: String,
    required: [true, "type a lastname please!"],
    min: [3, "Must be at least 6, got {VALUE}"],
  },
  gender: {
    type: String,
    required: [true, "choose a gender please!"],
    enum: { values: ["Male", "Female"], message: "{VALUE} is not supported" },
  },
  phone: {
    type: String,
    required: [true, "type a number please!"],
    unique: true,
    // validate: {
    //   validator: function (v) {
    //     return /\d{3}-\d{3}-\d{4}/.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid phone number!`,
    // },
    min: [10, "Must be at least 6, got {VALUE}"],
  },
  // pays: {
  //   type: String,
  //   required: [true, "choose your country please!"],
  //   enum: {
  //     values: ["Maroc", "Togo"],
  //     message: "{VALUE} is not supported",
  //   },
  // },
  city: {
    type: String,
    required: [true, "choose your city please!"],
    enum: {
      values: ["Kech", "Casa"],
      message: "{VALUE} is not supported",
    },
  },
  email: {
    type: String,
    required: [true, "type a email please!"],
    unique: true,
    min: [6, "Must be at least 6, got {VALUE}"],
    valide: [isEmail],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "type a password please!"],
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
  date: { type: Date, default: Date.now() },
  // nom  , prenom , date naissance , image,  adresse , ville , zone , pays  , profession
  // etudiant ou propeiétaire
});

userSchema.plugin(uniqueValidator);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// this method will be called if the user just create his account so he won't see the originla password
// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error("Password Incorrect ");
  }
  throw new Error("email is not valid");
};

// we should add the option that we can mask the phone in the pub

module.exports = mongoose.model("User", userSchema);
