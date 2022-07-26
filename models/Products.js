const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: [
      {
        type: String,
        required: true,
        enum: [
          "Pottery",
          "Paintings",
          "Apparel",
          "Used",
          "Books",
          "Crockery",
          "Antiques",
          "Utensils",
          "Textiles",
          "Handicrafts",
          "Wood Crafts",
          "Paper Crafts",
          "Ornaments",
          "Digital"
        ],
      },
    ],
    vendor: { type: String, required: true },
    vendor_id: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    // size:{
    //     type: String,
    //     required:true,
    //     enum: ["SM","MD","LG","XL","XXL"],
    // },
    tags: [
      {
        type: String,
      },
    ],
    image: { type: String, required: true },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", ProductSchema);
