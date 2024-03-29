const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const storage = new CloudinaryStorage({
folder: "miniProject",
allowedFormats: ["jpg", "png"],
transformation: [{
width: 500,
height: 500,
crop: "limit"
}],
cloudinary: cloudinary
});
module.exports = multer({storage: storage});


// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const express = require('express');
// const multer = require('multer');
 
// const app = express();
 
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'some-folder-name',
//     format: async (req, file) => 'png', // supports promises as well
//     public_id: (req, file) => 'computed-filename-using-request',
//   },
// });