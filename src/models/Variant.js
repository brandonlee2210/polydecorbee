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
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the updatedDate before saving
variantSchema.pre("save", function (next) {
  this.updatedDate = Date.now();
  next();
});

// Middleware to update the updatedDate before updating
variantSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedDate: Date.now() });
  next();
});

const Variant = mongoose.model("Variant", variantSchema);

export default Variant;
