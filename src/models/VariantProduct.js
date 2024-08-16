import mongoose from "mongoose";

const variantProductSchema = new mongoose.Schema({
  variantProductID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  price: {
    type: Number,
  },
  color: {
    type: String,
    required: true,
  },
  material: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

const VariantProduct = mongoose.model("VariantProduct", variantProductSchema);

export default VariantProduct;
