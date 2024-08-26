import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryID: {
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Middleware to update the updatedDate before saving
categorySchema.pre("save", function (next) {
  this.updatedDate = Date.now();
  next();
});

// Middleware to update the updatedDate before updating
categorySchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedDate: Date.now() });
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
