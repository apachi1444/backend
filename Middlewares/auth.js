const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
// c est pour verifier si le user est touhours connected or not
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      req.user = decodedToken;
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookies("jwt", "", { maxAge: 1 });
      } else {
        console.log("this is the id of the decodedToken", decodedToken.id);
        const user = User.findOne(decodedToken.id);
        res.locals.user = user;
        console.log(res.locals.user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send("no token");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("no token");
  }
};
