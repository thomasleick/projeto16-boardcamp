const Joi = require("joi");

const querySchema = Joi.object({
    name: Joi.string(),
    offset: Joi.string().pattern(/^\d+$/),
    limit: Joi.string().pattern(/^\d+$/),
    order: Joi.string(),
    cpf: Joi.string().pattern(/^\d+$/),
    customerId: Joi.string().pattern(/^\d+$/),
    gameId: Joi.string().pattern(/^\d+$/),
  });

module.exports = querySchema;