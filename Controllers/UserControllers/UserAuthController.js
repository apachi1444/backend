const bcrypt = require("bcrypt");
const User = require("../../Models/userModel");
const jwt = require("jsonwebtoken");
const generateToken = require("../../Utils/generateToken");
const { signInErrors } = require("../../Utils/errorsUtils");

exports.signup = (req, res, next) => {
  /*********salt determines how many times we apply the hashing algorithms********/
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({ email: req.body.email, password: hash });
      user
        .save()
        .then(() => {
          res.status(200).json({ message: "user created with succes" });
        })
        .catch((err) => {
          res.status(400).json({ err: err.message });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.register = async (req, res, next) => {
  /*****
  to validate the data done with the user
  const validation = joi.va(req.body, schema)
  res.send(validation)
  *****/

  /*******the joi validate function is not available now*************/

  /********verifiy if the user already exists or not********/
  const existOrNot = await User.findOne({ email: req.body.email });
  if (existOrNot) {
    return res.status(400).josn({response:"Email Already exists"});
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profession: req.body.profession,
    gender: req.body.gender,
    phone: req.body.phone,
    city: req.body.city,
    email: req.body.email,
    password: hashPassword,
    // imageUrl: `${req.protocol}://${req.get("host")}/images/${
    //   req.file.filename
    // }`,
  });
  try {
    const usersaved = await user.save();
    res.json({ token: generateToken(usersaved._id) });
  } catch (error) {
    const errors = SignupError(error);
    res.status(200).json({ errors });
  }
};
/**************************Line Break************************/

exports.Signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      /******for the httponly is designed for allowing ( consultable que par notre serveur)*****/
      /******for the jwt is the name of the cookie*********/
      res.cookie("jwt", token, { httpOnly: true });
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      });
    }
  } catch (err) {
    const error = signInErrors(err);
    return res.status(401).json(error);
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
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      /********401 unauthorized********/
      if (!user) return res.status(401).json({ error: "user not found !" });
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid)
            return res.status(400).json({ error: "Password Incorrect" });
          res.status(200).json({
            userId: user._id,
            /*****first argument in the jwt is the payload our data , second it is the secret key to encode it*****/
            /*********et pourquoi on utlise le token pour ne pas permettre aux users de modifier les objets des autres users******/
            token: jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
              expiresIn: "24H",
            }),
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    /********catch for example a server error**********************/
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
