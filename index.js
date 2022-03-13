const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const { checkUser, requireAuth } = require("./Middlewares/security/auth");
const passport = require("./Middlewares/passport/passport-config");

// importing routes:
const userRoutes = require("./Routes/userRoutes");
const postRoutes = require("./Routes/postRoutes");
const connectDB = require("./Config/connectDB");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();
// app.use(
//   session({
//     secret: "Some secret",
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//       secure: true,
//       maxAge: "24H",
//     },
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/users", checkUser, userRoutes);
app.use("/api/posts", requireAuth, postRoutes);
app.use("/api/images", express.static(path.join(__dirname, "images")));

app.listen(process.env.PORT || 5000, () => {
  console.log(`The server is up running on port: ${process.env.PORT || 5000}`);
});
