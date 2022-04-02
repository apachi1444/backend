const jwt = require("jsonwebtoken");
const response = require("../../utils/response");

module.exports = async(req, res, next) => {
  const token = req.header('auth-token');
  console.log(token);
  if(!token) 
    return response(res, true, 'Cannot access this route, please get logged in first or create account', [], 401);
  try{
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.payload=payload;
    next();
  } catch {
    response(
      res,
      true,
      "The request is not valid, your are not authorized to visite this route!",
      {},
      401
    );
  }
};
