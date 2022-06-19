const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");
const customerController = require('../controllers/customer.controller');

router.get("/",customerController.diplayProducts)
router.get("/categories",customerController.viewCategories)
router.get("/viewOrders",verifyToken,customerController.viewOrders)
router.get("/:id",customerController.findProductById)


router.post("/buy",verifyToken,customerController.purchaseProduct)


module.exports =router;