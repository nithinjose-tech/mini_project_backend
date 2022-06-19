const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");
const productController = require('../controllers/product.controller');
const multer = require('multer');
let path = require('path');
const { v4: uuidv4 } = require('uuid');
require("../services/cloudinary.config");
const upload = require("../services/multer");






router.get("/",verifyToken,productController.findAllProducts);
router.get("/:id",verifyToken,productController.findProductById);
router.post('/',verifyToken,upload.single("productPic"),productController.createProduct);
router.put("/:id",verifyToken,upload.single("productPic"),productController.updateProduct);
router.delete("/:id",verifyToken,productController.deleteProduct);







module.exports = router