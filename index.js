const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authorized = require("./middlewares/security/authorized");

// importing routes:
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const connectDB = require("./config/connectDB");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/posts", authorized, postRoutes);

// Some people would upload videos instead of images or the other way around
app.use("/api/images", express.static(path.join(__dirname, "files", "images")));
app.use("/api/videos", express.static(path.join(__dirname, "files", "videos")));

app.listen(process.env.PORT || 5000, () => {
  console.log(`The server is up running on port: ${process.env.PORT || 5000}`);
});
