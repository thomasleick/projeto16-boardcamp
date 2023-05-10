const Joi = require("joi");

const querySchema = Joi.object({
    name: Joi.string(),
    offset: Joi.string().pattern(/^\d+$/),
    limit: Joi.string().pattern(/^\d+$/),
    order: Joi.string(),
  });

module.exports = querySchema;