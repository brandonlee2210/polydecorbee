import mongoose from "mongoose";

const variantProductSchema = new mongoose.Schema({
  variantProductID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  variantProductName: {
    type: String,
    required: true,
  },
  variantProductType: {
    type: String,
    required: true,
  },
});

const VariantProduct = mongoose.model("VariantProduct", variantProductSchema);

export default VariantProduct;
