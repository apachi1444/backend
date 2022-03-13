const jwt = require("jsonwebtoken");

const generateToken = (id, email) => {
  return jwt.sign({ email, id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
