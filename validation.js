const Joi = require("joi");

const registerValidation = Joi.object({
  username: Joi.string().min(3).required().max(20),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])")),
});

const loginValidation = Joi.object({
  username: Joi.string().min(3).required().max(20),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])")),
});

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
