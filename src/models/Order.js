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
  fullname: {
    type: String,
    default: "gia bảo",
  },
  email: {
    type: String,
    default: "sonpnph",
  },
  phoneNumber: {
    type: String,
    default: "0364350578",
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  paymentID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  paymentMethod: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  address: {
    type: String,
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

const Order = mongoose.model("Order", orderSchema);

export default Order;
