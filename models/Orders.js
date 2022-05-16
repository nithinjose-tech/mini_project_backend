const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
  
    customer_id: { type: String, required: true},
    orders:[{
      prodcuct_id : {type:String},
      time:{ type : Date, default: Date.now },
      paymentStatus:{type:Boolean},
    }],
    // stock: { type: Number, required: true},
    // price:{type:Number,required:true},
    // description:{type:String,required:true},
    // size:{
    //     type: String,
    //     required:true,
    //     enum: ["SM","MD","LG","XL","XXL"],
    // },
    // tags: [{
    //     type: String
    // }],
    // image: { type: String,required:true },
    // rating:{
    //     type:Number,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);