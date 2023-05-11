const Joi = require("joi");

const customerSchema = Joi.object({
  name: Joi.string().min(1).required(),
  phone: Joi.string()
    .pattern(/^\d{10,11}$/)
    .required(),
  cpf: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .required(),
  birthday: Joi.date().required(),
});

module.exports = customerSchema;
