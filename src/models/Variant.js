import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  variantID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  material: {
    type: String,
  },
  color: {
    type: String,
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
});

const Variant = mongoose.model("Variant", variantSchema);

export default Variant;
