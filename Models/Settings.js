const mongoose = require("mongoose");
const permissions=[
    'Allow only my friends',
    'Allow only my network',
    'Allow only my network and my friends',
    'Private',
    'Public'
];
const settingsSchema = mongoose.Schema({
  ownerId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  },
  activeStatus:{
    type: String,
    enum: {
        values: permissions,
        message: "{VALUE} is not a valid permission for active status!",
    },
    default: 'Public'
  },
  location:{
    type: String,
    enum: {
        values: permissions,
        message: "{VALUE} is not a valid permission for location",
    },
    default: 'Public'
  },
  emailVisibility:{
    type: String,
    enum: {
        values: ['Public', 'Private'],
        message: "{VALUE} is not neither public or private",
    },
    default: 'Public'
  },
  phoneVisibility:{
    type: String,
    enum: {
        values: ['Public', 'Private'],
        message: "{VALUE} is not neither public or private",
    },
  },
  friendsListVisibility:{
    type: String,
    enum: {
        values: ['Public', 'Private'],
        message: "{VALUE} is not neither public or private",
    },
    default: 'Public'
  },
  starsVisibility:{
    type: String,
    enum: {
        values: ['Public', 'Private'],
        message: "{VALUE} is not neither public or private",
    },
    default: 'Public'
  },
  postsVisibility:{
    type: String,
    enum: {
        values: permissions,
        message: "{VALUE} is not valid as a post permission",
    },
  },
  cookies:{
    type: String,
    enum: {
        values: ['Allow Cookies', 'No Cookies'],
        message: "{VALUE} is not valid as a cookie permission",
    },
    default: 'Allow Cookies'
  }
});

const Settings=mongoose.model("Settings", settingsSchema);
module.exports = { Settings, settingsSchema };
