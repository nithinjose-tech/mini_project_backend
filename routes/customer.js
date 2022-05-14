const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");
const customerController = require('../controllers/customer.controller');

router.get("/",customerController.diplayProducts)
router.get("/:id",verifyToken,customerController.purchaseProduct)


module.exports =router;