const mongoose = require("mongoose");

const CustomProductsSchema = new mongoose.Schema(
  {
    vendor_id: { type: String, required: true},
    customer_id:{type: String, required: true},
    description:{type: String, required: true},
    customPic: { type: String},
    deadline:{type: String, required: true},
    price:{type: Number, required: true}
    

    
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomProducts", CustomProductsSchema);