const {
  createGame,
  findGames,
  findGameById,
  findGameByName,
} = require("../services/gameService");

const postGame = async (req, res) => {
  try {
    const foundGame = await findGameByName(req.body.name);
    if (foundGame) {
      return res
        .status(409)
        .json({ message: "Already have a game with this name" });
    }
    const game = await createGame(req.body);
    res.status(201).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getGames = async (req, res) => {
  try {
    const { name, order, offset, limit, desc } = req?.query;
    const games = await findGames({ name, order, offset, limit, desc });
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getGameById = async (req, res) => {
  try {
    const game = await findGameById(req.params.id);
    res.status(200).json(game);
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
