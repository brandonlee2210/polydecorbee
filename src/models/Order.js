import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  total: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  orderDetailID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  paymentID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
