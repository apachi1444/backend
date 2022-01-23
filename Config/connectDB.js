const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db is connected ");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
