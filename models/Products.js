const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    category: { type: String, required: true},
    vendor: { type: String, required: true},
    vendor_id: { type: String, required: true},
    stock: { type: Number, required: true},
    price:{type:Number,required:true},
    size:{
        type: String,
        required:true,
        enum: ["SM","MD","LG","XL","XXL"],
    },
    tags: [{
        type: String
    }],
    image: { type: String,required:true },
    rating:{
        type:Number,
        enum:[0,1,2,3,4,5]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", ProductSchema);