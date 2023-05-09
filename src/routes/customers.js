const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const validateCustomer = require("../middlewares/validateCustomer");
const validateIdAsParams = require("../middlewares/validateParams");

router.post("/", validateCustomer, customerController.postCustomer);
router.get("/", customerController.getCustomers);
router.get("/:id", validateIdAsParams, customerController.getCustomerById);
router.put("/:id", validateIdAsParams, validateCustomer, customerController.putCustomer)

module.exports = router;
