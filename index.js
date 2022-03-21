require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const session = require("express-session");
const { checkUser, requireAuth } = require("./middlewares/security/auth");
// importing routes:
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const signRoutes = require("./routes/signRoutes");
const connectDB = require("./config/connectDB");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

require("./logic/google/googleSign"); // Need to pass in the argument
require("./logic/linkedin/linkedinSign"); // Need to pass in the argument
require("./logic/facebook/facebookSign"); // Need to pass in the argument

// Sessions
app.use(
  cookieSession({
    maxAge: 24 * 60 * 1000, // ms
    name: "google-auth-session",
    // keys to encrypt the id
    keys: [process.env.KEY_ENCRYPTION_SESSION],
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

connectDB();
app.use("/api/users", checkUser, userRoutes);
app.use("/api/posts", requireAuth, postRoutes);
app.use("/api/sign", signRoutes);
app.use("/api/images", express.static(path.join(__dirname, "images")));

app.listen(process.env.PORT || 5000, () => {
  console.log(`The server is up running on port: ${process.env.PORT || 5000}`);
});
