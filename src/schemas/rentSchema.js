const Joi = require("joi");

const rentSchema = Joi.object({
    customerId: Joi.number().integer().min(1).required(),
    gameId: Joi.number().integer().min(1).required(),
    rentDate: Joi.date().required(),
    daysRented: Joi.number().integer().min(1).required(),
    returnDate: Joi.date().allow(null),
    originalPrice: Joi.number().integer().min(1).required(),
    delayFee: Joi.number().integer().allow(null),
});

module.exports = rentSchema;