const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");
const customProductController = require('../controllers/customProduct.controller');
const multer = require('multer');
let path = require('path');
const { v4: uuidv4 } = require('uuid');
require("../services/cloudinary.config");
const upload = require("../services/multer");


router.post("/request",verifyToken,upload.single("customPic"),customProductController.createCustomProduct)

router.get("/viewRequest",verifyToken,customProductController.findAllCustomProduct)

module.exports = router