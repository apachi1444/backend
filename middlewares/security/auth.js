const jwt = require("jsonwebtoken");
const { User } = require("../../Models/User");
const { response }= require('../../utils/response');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      response(res, true, 'Your id is ether not valid or you are accessing wrong account', {}, 400);
    } else {
      req.user = decodedToken;
      next();
    }
  } catch {
    response(res, true, 'The request is not valid, plz change id or get one', {}, 401);
  }
};

//Check if the user does exists on the db
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookies("jwt", "", { maxAge: 1 });
      } else {
        const user = User.findOne(decodedToken.id);
        res.locals.user = user;
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
        response(res, true, 'The token of this user is not valid, plz change id or get one', {}, 400);
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    response(res, true, 'The token of this user is not valid, plz change id or get one', {}, 400);
  }
};
