const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const validateGame = require("../middlewares/validateGame");
const validateIdAsParams = require("../middlewares/validateParams");

router.post("/", validateGame, gameController.postGame);
router.get("/", gameController.getGames);
router.get("/:id", validateIdAsParams, gameController.getGameById);

module.exports = router;
