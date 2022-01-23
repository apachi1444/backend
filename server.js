const http = require("http");
const app = require("./app");

// si on use ( middleware ) it means it's the global code that we should execute
// app.use nous permet d'attribuer un middleware pour chaque route
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// le premier setHeader means all the external servers can get access to our api server

global.setTimeout(() => {
  //// this is equivalent to directly doing the setTimeout here
  console.log("object");
}, 3000);

const server = http.createServer(app);

server.listen(process.env.PORT || 5000, () => {
  console.log("the server is listening on port  5000 ");
});

const socket = require("socket.io");
let io = socket(server); // we want that socket to be functionning in this server
// it will wait in the server for a user making a websocket

io.on("connection", (socket) => {
  console.log("made socket connection");
});

console.log(`${__dirname}`);

// when one particular client connects we gonna listen up to this connection method
// and the socket refers the socket between the server and the client
