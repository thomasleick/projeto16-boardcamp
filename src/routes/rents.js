const express = require("express");
const router = express.Router();
const rentController = require("../controllers/rentController");
const validateRent = require("../middlewares/validateRent");
const validateIdAsParams = require("../middlewares/validateParams");

router.post("/", validateRent, rentController.postRent);
router.get("/", rentController.getRents);
router.get("/:id", validateIdAsParams, rentController.getRentById);
router.put("/:id", validateIdAsParams, validateRent, rentController.putRent);
router.delete("/:id", validateIdAsParams, rentController.deleteRent);

module.exports = router;
