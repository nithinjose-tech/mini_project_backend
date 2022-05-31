const router = require("express").Router();
const Users = require("../models/Users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const userData = JSON.parse(req.body.userData);
  console.log(userData)
  const newUser = new Users({
    username: userData.username,
    fullname: userData.fullname,
    email: userData.email,
    password: CryptoJS.AES.encrypt(
      userData.password,
      process.env.SECRET_KEY
    ).toString(),
    profilePic: req.file.path,
    role: userData.role,
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong password or username!");
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong password or username!");
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "5d",
    });

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    // res.status(500).json(err);
    res.send(err);
  }
};