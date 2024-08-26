import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema({
  orderDetailID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  name: {
    type: String,
  },
  categoryName: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  variantID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  orderID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  color: {
    type: String,
  },
  material: {
    type: String,
  },
  image: {
    type: String,
    default: "/images/default.png",
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

const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);

export default OrderDetail;
