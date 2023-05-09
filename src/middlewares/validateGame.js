const gameSchema = require("../schemas/gameSchema");

function validateGame(req, res, next) {
  const { error } = gameSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

module.exports = validateGame;
