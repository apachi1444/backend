const Joi = require("joi");

const SignUpSchema = Joi.object({
  username: Joi.string().min(4).max(100).required(),
  email: Joi.string().email().max(200).required(),
  phone: Joi.string().max(13).required(),
  password: Joi.string().min(8).max(1024).required(),
  confirm: Joi.ref("password"),
});

const SignInSchema = Joi.object({
  email: Joi.string().email().max(200).required(),
  password: Joi.string().min(8).required(),
});

module.exports = { SignUpSchema, SignInSchema };
