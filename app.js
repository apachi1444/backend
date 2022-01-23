const express = require("express");
const path = require("path");
// cette application va recevoir les requetes et les demandes
const app = express();
const { checkUser, requireAuth } = require("./Middlewares/auth");
const cookieParser = require("cookie-parser");

//Avec ceci, Express prend toutes les requêtes qui ont comme Content-Type  application/json  et met à disposition leur  body  directement sur l'objet req
app.use(express.json());
const userRoutes = require("./Routes/userRoutes");
const pubRoutes = require("./Routes/pubRoutes");
const connectDB = require("./config/connectDB");
connectDB();
app.use(cookieParser());
// const mongoose = require("mongoose");
// mongoose
//   .connect(
//     "mongodb+srv://Forzajuventus18:Forzajuventus18@cluster0.ggpqd.mongodb.net/loaction?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => console.log("Connexion à MongoDB réussie !"))
//   .catch(() => console.log("Connexion à MongoDB échouée !"));
//avec ce middleware Express prend toutes les requetes qui ont comme content tuype application/json et met leur body sur l'object req
// app.use(express.json());
// app.post("/api/add", (req, res, next) => {
//   console.log(req.body);

//   // 201 means that the request made a creation of data successfully
//   res.status(201).json({
//     message: "Objet créé !",
//   });
// });
// app.use("/api/add", (req, res) => {
//   const stuff = [
//     {
//       _id: "oeihfzeoi",
//       title: "Mon premier objet",
//       description: "Les infos de mon premier objet",
//       imageUrl:
//         "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
//       price: 4900,
//       userId: "qsomihvqios",
//     },
//     {
//       _id: "oeihfzeomoihi",
//       title: "Mon deuxième objet",
//       description: "Les infos de mon deuxième objet",
//       imageUrl:
//         "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
//       price: 2900,
//       userId: "qsomihvqios",
//     },
//   ];
//   res.status(200).json(stuff);
// });
// app.get("*", checkUser);
// app.get("/jwtid", requireAuth, (req, res) => {
//   res.status(200).send(res.locals.user._id);
// });
app.use("/api/auth", userRoutes);
app.use("/api/pubs", pubRoutes);

// to know about the request made to this route, we need to
// http://localhost:3000/images/<image-name>.jpg
app.use("/images", express.static(path.join(__dirname, "Images")));

module.exports = app;
// module.exports = {first function , second function };
