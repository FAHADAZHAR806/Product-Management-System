const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A product must have a name"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "A product must have a price"],
    min: [0, "Price cannot be negative"],
  },
  description: {
    type: String,
    required: [true, "A product must have a description"],
  },
  category: {
    type: String,
    required: [true, "Please specify a category"],
  },
  stock: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
