import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  body: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  image: {
    type: String,
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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
reviewSchema.pre("save", function (next) {
  this.updatedDate = Date.now();
  next();
});

// Middleware to update the updatedDate before updating
reviewSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedDate: Date.now() });
  next();
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
