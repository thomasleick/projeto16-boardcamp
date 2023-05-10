const querySchema = require("../schemas/querySchema");

function validateQuery(req, res, next) {
    const { error } = querySchema.validate(req?.query);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  }
  
  module.exports = validateQuery;
  