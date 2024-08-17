import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  commentID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  body: {
    type: String,
    required: true,
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
commentSchema.pre("save", function (next) {
  this.updatedDate = Date.now();
  next();
});

// Middleware to update the updatedDate before updating
commentSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedDate: Date.now() });
  next();
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
