const Joi = require("joi");

const customerSchema = Joi.object({
  name: Joi.string().min(1).required(),
  phone: Joi.string().min(10).max(11).required(),
  cpf: Joi.string().pattern(/^[0-9]{11}$/).required(),
  birthday: Joi.date().required(),
});

module.exports = customerSchema;
