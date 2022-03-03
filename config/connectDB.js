const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to db");
  } catch (error) {
    console.log({
      Message: "Can't connect to db",
      error,
    });
  }
};
module.exports = connectDB;
