const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../../Models/User");
const jwt = require("jsonwebtoken");
const generateToken = require("../../Utils/generateToken");
const response = require("../../Utils/response");
const { SignUpSchema, SignInSchema } = require("../../logic/joi/sign");

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

exports.register = async (req, res, next) => {
  const existOrNot = await User.find({ email: req.body.email });
  console.log(existOrNot);
  if (!existOrNot) {
    console.log("jlkqsdflksd");
    return res.status(400).json({ response: "Email Already exists" });
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

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    try {
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass,
        },
        // if we are in the localhost environment
        // tls: {
        //   rejectUnauthorized: false, // we are not doing it from the actual domain
        // },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Node Mailer Contact 👻" <loca@gmail.com>', // sender address
        to: "yessinejawa@gmail.com", // sender addresslist of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (e) {
      console.log(e);
    }

    return res.status(200).json({ token: generateToken(usersaved._id) });
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    // const errors = SignupError(error);
    return res.status(200).json({ error });
  }
};

/**************************Line Break************************/

exports.signIn = async (req, res) => {
  const valid = SignInSchema.validate(req.body);
  if (valid.error) {
    return () => response(res, true, valid.error.details[0].message, [], 400);
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // so here is the problem

      // const isValid = await validPassword(req.body.password, user.password);
      // if (!isValid) {
      //   return response(res, true, "Wrong password, please try again", [], 400);
      // }
      const token = generateToken(user._id, user.email);
      res["authToken"] = token;
      console.log("this is the token of the sign in  " + token);
      return response(res, false, "", user, 200);
    }
    return response(
      res,
      true,
      "You don't have an account, please register rec96wiehkh",
      [],
      200
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
  console.log(result);
  if (result.error) {
    return response(res, true, result.error.details[0].message, [], 400);
  }

  // here the problem

  // let hashed;
  // try {
  //   hashed = await digest(req.body.password);
  //   // c mieux je pense de travailler avec le sha 2 que digest ( md )
  // } catch (e) {
  //   return response(res, true, "Networking error, please try again", [], 400);
  // }

  const existOrNot = await User.findOne({ email: req.body.email });
  console.log(existOrNot);
  if (existOrNot) {
    return res.status(400).json({ response: "Email Already exists" });
  }

  const userInstance = new User({
    username: req.body.username,
    email: req.body.email,
    location: req.body.location,
    occupation: req.body.occupation,
    password: req.body.password,
  });

  try {
    const savedUser = await userInstance.save();
    const token = generateToken(savedUser._id, savedUser.email);
    res.token = token;
    console.log("this is the token of our user who just signed up " + token);
    // this part is for the node mailer
    return response(res, true, savedUser, [], 200);
  } catch (err) {
    return response(res, true, "Connection error, please try later", [], 400);
  }
};

/*****************************************************
 ******************************************************/

// exports.logout = (req, res) => {
//   //if we are using passport.js
//   //req.logout() or req.logOut();
//   res.cookie("jwt", "", { maxAge: 1 });
//   res.redirect("/");
// };

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
