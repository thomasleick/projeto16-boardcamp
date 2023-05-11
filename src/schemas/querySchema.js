const Joi = require("joi");

const querySchema = Joi.object({
  name: Joi.string(),
  offset: Joi.string().pattern(/^\d+$/),
  limit: Joi.string().pattern(/^\d+$/),
  order: Joi.string(),
  cpf: Joi.string().pattern(/^\d+$/),
  customerId: Joi.string().pattern(/^\d+$/),
  gameId: Joi.string().pattern(/^\d+$/),
  desc: Joi.string().valid("true", "false").optional(),
  status: Joi.string().valid("open", "closed").optional(),
  startDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

module.exports = querySchema;
