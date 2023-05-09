const customerSchema = require("../schemas/customerSchema");

function validateCustomer(req, res, next) {
  const { error } = customerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

module.exports = validateCustomer;
