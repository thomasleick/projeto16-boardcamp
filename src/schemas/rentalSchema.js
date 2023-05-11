const Joi = require("joi");

const rentalSchema = Joi.object({
  customerId: Joi.number().integer().min(1).required(),
  gameId: Joi.number().integer().min(1).required(),
  rentDate: Joi.date(),
  daysRented: Joi.number().integer().min(1).required(),
  returnDate: Joi.date().allow(null),
  originalPrice: Joi.number().integer().min(1),
  delayFee: Joi.number().integer().allow(null),
});

module.exports = rentalSchema;
