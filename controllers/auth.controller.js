const router = require("express").Router();
const Users = require("../models/Users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


exports.register = async(req, res) => {
    const newUser = new Users({
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString(),
        profilePic:req.body.profilePic,
        role:req.body.role

      });
      try {
        const user = await newUser.save();
        res.status(201).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
  };

exports.login = async(req,res) =>{
    try {
        const user = await Users.findOne({ email: req.body.email });
        !user && res.status(401).json("Wrong password or username!");
    
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    
        originalPassword !== req.body.password &&
          res.status(401).json("Wrong password or username!");
    
        const accessToken = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.SECRET_KEY,
          { expiresIn: "5d" }
        );
    
        const { password, ...info } = user._doc;
    
        res.status(200).json({ ...info, accessToken });
      } catch (err) {
        res.status(500).json(err);
      }
}