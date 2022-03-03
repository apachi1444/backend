const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const requests = require("./requests/requests");
const { checkUser, requireAuth } = require("./middlewares/security/auth");
const passport = require("./middlewares/passport/passport-config");

// importing routes:
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/pubRoutes");
const connectDB = require("./config/connectDB");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();
app.use(
  session({
    secret: "Some secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: true,
      maxAge: "24H",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

app.use("/images", express.static(path.join(__dirname, "Images")));

app.listen(process.env.PORT || 5000, () => {
  console.log(`The server is up running on port: ${process.env.PORT || 5000}`);
});