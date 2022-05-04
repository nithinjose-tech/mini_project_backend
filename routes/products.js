const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");
const productController = require('../controllers/product.controller');

router.get("/",verifyToken,productController.findAllProducts);
router.get("/:id",verifyToken,productController.findProductById);
router.post("/",verifyToken,productController.createProduct);
router.put("/:id",verifyToken,productController.updateProduct);
router.delete("/:id",verifyToken,productController.deleteProduct);





module.exports = router