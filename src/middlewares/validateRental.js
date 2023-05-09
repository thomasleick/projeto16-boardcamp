const rentalSchema = require("../schemas/rentalSchema");

function validateRental(req, res, next) {
  const { error } = rentalSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

module.exports = validateRental;
