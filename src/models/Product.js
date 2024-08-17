import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  imageID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  categoryID: {
    // Changed from 'category' to 'categoryID' to reference the Category model
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Reference to the Category model
    required: true,
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
