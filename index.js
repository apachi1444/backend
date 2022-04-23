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
const authorized = require("./middlewares/security/authorized");
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

//importing socket handlers
const connect = require("./sockets/connect/connect.js");
const disconnect = require("./sockets/disconnect/disconnect.js");

//setting the the session
const sharedsession = require("express-socket.io-session");
const store = new session.MemoryStore();

// const MongoDBStore = require('connect-mongodb-session')(session);
// const store = new MongoDBStore({
//   uri: process.env.URI,
//   collection: 'users',
// });

const sessionMiddleware = session({
  secret: `${process.env.SESSION_KEY}${Math.random() * 1337}`,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: "/",
    httpOnly: false,
    secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7, //it lasts for one week
  },
  store,
});
app.use(sessionMiddleware);

// importing routes:
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const thirdParty = require("./routes/signThirdPartyRoutes");
const connectDB = require("./config/connectDB");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

require("./controllers/thirdPartyController/google/googleSign"); // Need to pass in the argument
require("./controllers/thirdPartyController/linkedin/linkedinSign"); // Need to pass in the argument
require("./controllers/thirdPartyController/facebook/facebookSign"); // Need to pass in the argument
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Sessions
app.use(
  cookieSession({
    maxAge: 24 * 60 * 1000, // ms
    name: "google-auth-session",
    // keys to encrypt the id
    keys: [process.env.KEY_ENCRYPTION_SESSION],
  })
);

connectDB();
app.use("/api/users", authorized, userRoutes);
app.use("/api/posts", authorized, postRoutes);
app.use("/api/sign", thirdParty);

// Some people would upload videos instead of images or the other way around
app.use("/api/images", express.static(path.join(__dirname, "files", "images")));
app.use("/api/videos", express.static(path.join(__dirname, "files", "videos")));

//sockets handling
io.use(sharedsession(sessionMiddleware, { autoSave: true })); //socket.handshake.session <=> req.session now
io.on("connection", (socket) => {
  //handles all the triggered sockets events on both  sides while connected
  connect(io, socket);
  socket.on("disconnect", () => {
    //handles all the triggered sockets events on both  sides once disconnected as cleanup
    disconnect(io, socket);
    console.log(`The user with id ${socket.id} has been disconnected.`);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`The server is up running on port: ${process.env.PORT || 5000}`);
});
