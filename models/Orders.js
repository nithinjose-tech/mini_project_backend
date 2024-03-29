const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  vendor_id:{
    type: String,
    required: true,
  },
  quantity:{
    type:Number,
    required:true,
  },
  image:{
    type:String,
    required:true,
  },
  rating:{
    type:Number,
  },
  description:{
    type:String,
  },
  price:{
    type:Number,
    required:true
  },
  
})

const OrderSchema = new mongoose.Schema(
  {
    customer_id: { type: String, required: true },
    items: [
      itemsSchema
    ],
   
    price: { type: Number },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      required: true,
    },
    shipTo:{
      type:String,
      required:true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

// const VendorSalesSchema = new mongoose.Schema(
//   {
//     vendor_id: { type: String, required: true },
//     items: [
//       {
//         product_id: { type: String },
//         quantity: { type: Number },
//         order_id: { type: String, required: true },
//       },
//     ],
//   },
//   { timestamps: true }
// );
