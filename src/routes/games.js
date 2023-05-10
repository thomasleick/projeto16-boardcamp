const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const validateGame = require("../middlewares/validateGame");
const validateIdAsParams = require("../middlewares/validateParams");
const validateQuery = require("../middlewares/validateQuery");

router.post("/", validateGame, gameController.postGame);
router.get("/", validateQuery, gameController.getGames);
router.get("/:id", validateIdAsParams, gameController.getGameById);

module.exports = router;
