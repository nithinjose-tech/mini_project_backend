const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth.controller')
const upload = require("../services/multer");

router.post("/register",upload.single("profilePic"), authController.register);
router.post("/login", authController.login);




module.exports = router