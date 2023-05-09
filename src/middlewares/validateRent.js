const rentSchema = require("../schemas/rentSchema");

function validateRent(req, res, next) {
  const { error } = rentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

module.exports = validateRent;
