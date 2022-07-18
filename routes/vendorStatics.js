const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");
const vendorStatisticsController = require('../controllers/vendorStatistics.controller');

router.get("/:id",verifyToken,vendorStatisticsController.findStatistics)

module.exports = router