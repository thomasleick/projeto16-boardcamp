const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const validateCustomer = require("../middlewares/validateCustomer");
const validateIdAsParams = require("../middlewares/validateParams");
const validateQuery = require("../middlewares/validateQuery");

router.post("/", validateCustomer, customerController.postCustomer);
router.get("/", validateQuery, customerController.getCustomers);
router.get("/:id", validateIdAsParams, customerController.getCustomerById);
router.put("/:id", validateIdAsParams, validateCustomer, customerController.putCustomer)

module.exports = router;
