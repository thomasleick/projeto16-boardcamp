const express = require("express");
const router = express.Router();
const rentalController = require("../controllers/rentalController");
const validateRent = require("../middlewares/validateRental");
const validateIdAsParams = require("../middlewares/validateParams");

router.post("/", validateRent, rentalController.postRental);
router.get("/", rentalController.getRentals);
router.post("/:id/return", validateIdAsParams, rentalController.returnRental);
router.delete("/:id", validateIdAsParams, rentalController.deleteRental);

module.exports = router;
