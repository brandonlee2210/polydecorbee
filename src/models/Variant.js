import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  variantID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  price: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  categoryName: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  // colors array contains objecs value and quantity
  variants: {
    type: Array,
    default: [],
    schema: {
      color: String,
      material: String,
      quantity: Number,
      price: Number,
    },
  },
});

const Variant = mongoose.model("Variant", variantSchema);

export default Variant;
