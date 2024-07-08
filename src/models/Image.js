import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  imageID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
});

const Image = mongoose.model("Image", imageSchema);

export default Image;