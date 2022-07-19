const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");
const vendorStatisticsController = require('../controllers/vendorStatistics.controller');

router.get("/",verifyToken,vendorStatisticsController.findStatistics)

module.exports = router