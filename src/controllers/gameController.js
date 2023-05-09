const { createGame, findGames, findGameById } = require("../services/gameService");

const postGame = async (req, res) => {
  try {
    const game = await createGame(req.body);
    res.status(201).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getGames = async (req, res) => {
  try {
    const games = await findGames();
    res.status(201).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getGameById = async (req, res) => {
  try {
    const games = await findGameById(req.params.id);
    res.status(201).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postGame,
  getGames,
  getGameById,
};
