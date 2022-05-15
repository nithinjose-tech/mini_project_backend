const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    category: { 
           type: String,
           required: true,
           enum:["Electronics","Pottery","Digital","Paintings","Sculptures","Crokery","Jewellery","Bags"]
          },
    vendor: { type: String, required: true},
    vendor_id: { type: String, required: true},
    stock: { type: Number, required: true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
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
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", ProductSchema);