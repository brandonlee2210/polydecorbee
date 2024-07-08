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
});

const Category = mongoose.model("Category", categorySchema);

export default Category;