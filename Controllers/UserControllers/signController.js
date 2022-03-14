const User = require("../../Models/User");
const jwt = require("jsonwebtoken");
const { SignUpSchema, SignInSchema } = require('../../logic/joi/sign');
const { digest, isInDatabase, validPassword } = require('../../logic/hash/hash.js');
const response=require('../../utils/response.js');

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
      return response(res, false, "", user, 200);
    };
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
    phone: req.body.phone
  });

  userInstance.save()
    .then(u=>{
      console.log(u);
      const token = jwt.sign(
        { email: u.email, _id: u._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.token = token;
      return response(res, false, "", u, 200);
    }).catch(e=>{
      console.log(e);
      return response(res, true, "Connection error, can't save your credentials, please try later", [], 400);
    });
};
