const bcrypt = require("bcrypt");
const User = require("../../Models/User");
const jwt = require("jsonwebtoken");
const generateToken = require("../../Utils/generateToken");
const { signInErrors } = require("../../Utils/errorsUtils");

// exports.signup = async (req, res, next) => {
//   /*********salt determines how many times we apply the hashing algorithms********/
//   console.log(req.body.password);
//   console.log(req.body.email);
//   bcrypt
//     .hash(req.body.password, 10)
//     .then(async (hash) => {
//       const email = req.body.email;
//       const user = await User.create({
//         email,
//         password: hash,
//       });
//       if (user) {
//         res.status(201).json({
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//         });
//       } else {
//         res.status(400);
//         throw new Error("User not found");
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({ error: error.message });
//     });
// };

// exports.register = async (req, res, next) => {
//   const existOrNot = await User.findOne({ email: req.body.email });
//   if (existOrNot) {
//     return res.status(400).json({ response: "Email Already exists" });
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hashPassword = await bcrypt.hash(req.body.password, salt);
//   const user = new User({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     profession: req.body.profession,
//     gender: req.body.gender,
//     phone: req.body.phone,
//     city: req.body.city,
//     email: req.body.email,
//     password: hashPassword,
//     // imageUrl: `${req.protocol}://${req.get("host")}/images/${
//     //   req.file.filename
//     // }`,
//   });
//   try {
//     const usersaved = await user.save();
//     res.json({ token: generateToken(usersaved._id) });
//   } catch (error) {
//     const errors = SignupError(error);
//     res.status(200).json({ errors });
//   }
// };

/**************************Line Break************************/

exports.signIn = async (req, res) => {
  const valid = SignInSchema.validate(req.body);
  if (valid.error) {
    return response(res, true, valid.error.details[0].message, [], 400);
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const isValid = await validPassword(req.body.password, user.password);
      if (!isValid) {
        return response(res, true, "Wrong password, please try again", [], 400);
      }
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_KEY
      );
      res["authToken"] = token;
      return response(res, true, "", user, 200);
    }
    return response(
      res,
      true,
      "You don't have an account, please register",
      [],
      400
    );
  } catch (error) {
    return response(res, true, "Connection error, please try later", [], 400);
  }
};

exports.signUp = async (req, res) => {
  if (req.body.password !== req.body.confirm) {
    return response(
      res,
      true,
      "Please make sure the passwords do match!",
      [],
      400
    );
  }

  const result = SignUpSchema.validate(req.body);
  if (result.error) {
    return response(res, true, result.error.details[0].message, [], 400);
  }

  let hashed;
  try {
    hashed = await digest(req.body.password);
  } catch (e) {
    return response(res, true, "Networking error, please try again", [], 400);
  }

  try {
    const inDatabase = await isInDatabase(req.body);
    if (inDatabase !== null) {
      return response(res, true, inDatabase, {}, 400);
    }
  } catch (error) {
    return response(
      res,
      true,
      "This email might have been used before, please use another one",
      [],
      400
    );
  }

  const userInstance = new User({
    username: req.body.username,
    email: req.body.email,
    location: req.body.location,
    occupation: req.body.occupation,
    password: hashed,
  });

  try {
    const savedUser = await userInstance.save();
    const token = jwt.sign(
      { email: savedUser.email, _id: savedUser._id },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.token = token;
    return response(res, true, savedUser, [], 400);
  } catch (err) {
    return response(res, true, "Connection error, please try later", [], 400);
  }
};

/*****************************************************
 ******************************************************/

exports.logout = (req, res) => {
  //if we are using passport.js
  //req.logout() or req.logOut();
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

/*****************************************************
 ******************************************************/
// exports.login = (req, res, next) => {
//   User.findOne({ email: req.body.email })
//     .then((user) => {
//       /********401 unauthorized********/
//       if (!user) return res.status(401).json({ error: "user not found !" });
//       bcrypt
//         .compare(req.body.password, user.password)
//         .then((valid) => {
//           if (!valid)
//             return res.status(400).json({ error: "Password Incorrect" });
//           res.status(200).json({
//             userId: user._id,
//             /*****first argument in the jwt is the payload our data , second it is the secret key to encode it*****/
//             /*********et pourquoi on utlise le token pour ne pas permettre aux users de modifier les objets des autres users******/
//             token: jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//               expiresIn: "24H",
//             }),
//           });
//         })
//         .catch((err) => {
//           res.status(500).json({ error: err });
//         });
//     })
//     /********catch for example a server error**********************/
//     .catch((error) => {
//       res.status(500).json({ error: error });
//     });
// };
