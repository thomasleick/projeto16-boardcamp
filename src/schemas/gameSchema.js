const Joi = require("joi");

const gameSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  stockTotal: Joi.number().integer().min(1).required(),
  pricePerDay: Joi.number().integer().min(1).required(),
});

module.exports = gameSchema;
