const mongoose = require("mongoose");



const VendorStatisticsSchema = new mongoose.Schema(
  {

    vendor_id: { type: String, required: true },
   
    product_id:{ type: String, required: true },

    name:{type: String, required:true },
   
    price: { type: Number,required: true },

    quantity:{type:Number,required:true}
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("VendorStatistics", VendorStatisticsSchema);


