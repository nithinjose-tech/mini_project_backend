const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, defaut: "" },
    role: {
        type: String,
        required:true,
        enum: ["CUSTOMER", "VENDOR"],
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);