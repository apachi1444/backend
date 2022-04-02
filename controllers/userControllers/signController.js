const User = require("../../Models/User");
const jwt = require("jsonwebtoken");
const { SignUpSchema, SignInSchema } = require("../../logic/joi/sign");
const {
  digest,
  isInDatabase,
  validPassword,
} = require("../../logic/hash/hash.js");
const response = require("../../utils/response.js");
const generateToken = require("../../Utils/generateToken");
// const { sendMail } = require("../../logic/nodemailer/nodeMailer");
const { Settings } = require("../../Models/Settings");

// const visibleUserProperties={
//   joinedAt: 1, isAdmin: 1, username: 1, email: 1, phone: 1, city: 1, foreGroundImage: 1,
//   backGroundImage: 1, followers: 1, following: 1, friends: 1, network: 1, posts: 1, messages: 1,
//   notifications: 1, videoCalls: 1, audioCalls: 1, invitations: 1, stars, bio: 1, settings: 1
// };

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
      const token = generateToken(req.body._id, req.body.email);
      console.log("this is the token", token);
      res["authToken"] = token;
      return response(res, false, "", user, 200);
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
    password: hashed,
    phone: req.body.phone,
  });

  userInstance
    .save()
    .then((u) => {
      const token = generateToken(u._id, u.email);
      res.token = token;

      // No need to send the email in the signup(no website does this! it's not necessary) but if the user
      //forgot password this endpoint will be added

      // const confirmation = await sendMail(res, u.email, Math.floor(1000 + Math.random() * 9000));
      // console.log(confirmation);

      // Creating the settings for the user
      const settings = new Settings({ ownerId: u._id });
      settings
        .save()
        .then((s) => {
          User.findOneAndUpdate(
            { _id: u._id },
            {
              settings: s._id,
            }
          )
            .then(() => {
              const token = jwt.sign(
                { _id: u._id, email: u.email },
                process.env.JWT_KEY
              );
              return res
                .header("auth-token", token)
                .send({ error: false, message: "", data: u });
            })
            .catch((e) => response(res, true, "", e.errors, 400));
        })
        .catch((e) => {
          return response(res, true, "", e.errors, 400);
        });
    })
    .catch((e) => {
      // console.log(e?.errors);
      return response(
        res,
        true,
        "Connection error, can't save your credentials, please try later",
        [],
        400
      );
    });
};
