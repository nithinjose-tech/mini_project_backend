const mongoose = require("mongoose");

const CustomProductsSchema = new mongoose.Schema(
  {
    vendor_id: { type: String, required: true },
    customer_id: { type: String, required: true },
    product_id: { type: String },
    description: { type: String, required: true },
    customPic: { type: String },
    deadline: { type: String, required: true },
    quantity: { type: Number, required: true },
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomProducts", CustomProductsSchema);
