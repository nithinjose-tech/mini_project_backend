const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");
const productController = require('../controllers/product.controller');
const multer = require('multer');
let path = require('path');
const { v4: uuidv4 } = require('uuid');



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
  }
  
  let upload = multer({ storage, fileFilter });


router.get("/",verifyToken,productController.findAllProducts);
router.get("/:id",verifyToken,productController.findProductById);
router.route("/").post(upload.single('image'),verifyToken,productController.createProduct);
router.put("/:id",verifyToken,productController.updateProduct);
router.delete("/:id",verifyToken,productController.deleteProduct);
// router.get("/images",productController.imageController);






module.exports = router