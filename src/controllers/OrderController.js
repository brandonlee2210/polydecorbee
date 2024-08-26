import BaseController from "./BaseController.js";
import Order from "../models/Order.js";
import OrderDetail from "../models/OrderDetail.js";
import Variant from "../models/Variant.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
// create class Order with CRUD

export default class OrderController extends BaseController {
  constructor() {
    super(Order);
  }

  getVariantsByCategoryId = async (request, response) => {
    try {
      const { categoryName } = request.params;
      const variants = await Variant.find({ categoryName: categoryName });
      let page = parseInt(request.query.page) || 1;
      let limit = parseInt(request.query.limit) || 4;
      let startIndex = (page - 1) * limit;
      let endIndex = page * limit;
      let results = {};

      results.total = variants.length;
      results.data = variants.slice(startIndex, endIndex);

      results.data = results.data.sort((a, b) => a._id - b._id);

      let pagination = {
        current: page,
        pageSize: 4,
        total: results.data.length,
      };

      results.pagination = pagination;

      return response.status(200).json(results);
      // res.json(variants);
    } catch (error) {
      console.error("Error getting variants by category ID:", error);
      response.status(500).json({ message: "Error getting variants" });
    }
  };

  // get orders by userID
  getOrdersByUserId = async (req, res) => {
    try {
      // const { userId } = req.params;
      // const user = await User.findById(userId);
      // if (!user) {
      //   return res.status(404).json({ message: "User not found" });
      // }
      const orders = await Order.find({ userID: "60d5ec49f8d2c72b8c8e4b8b" });
      res.json(orders);
    } catch (error) {
      console.error("Error getting orders by user ID:", error);
      res.status(500).json({ message: "Error getting orders" });
    }
  };

  // update stock of each variant after change status order to != 1
  updateStock = async (req, res) => {
    try {
      const { orderId, status } = req.body;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      if (status === 1) {
        return res.status(400).json({ message: "Order is already delivered" });
      }
      const orderDetails = await OrderDetail.find({ orderID: orderId });

      const variant = await Variant.findById(orderDetails[0].variantID);

      orderDetails.map((o) => {
        variant.variants.forEach((v) => {
          v.quantity = +v.quantity;
          if (v.color == o.color && v.material == o.material) {
            v.quantity -= +o.quantity;
          }
        });
      });

      // save new variant

      let response = await Variant.findByIdAndUpdate(
        variant._id,
        { variants: variant.variants },
        { new: true }
      );
      // console.log(response);

      order.status = parseInt(status);
      await order.save();
      res.json(order);
    } catch (error) {
      console.error("Error updating stock:", error);
      res.status(500).json({ message: "Error updating stock" });
    }
  };

  saveOrderFromVNP = async (orderDataSave) => {
    try {
      const { orderData, orderDetailsData } = orderDataSave;

      let orderRes = await Order.create(orderData);

      // create order details array with order id
      orderDetailsData.forEach((detail, index) => {
        detail.orderID = orderRes._id;
        detail.color = orderDetailsData[index].color;
        detail.material = orderDetailsData[index].material;
        detail.price = orderDetailsData[index].price;
        detail.quantity = +orderDetailsData[index].quantity;
      });

      // console.log(orderDetailsData, "VNP");

      // Create and save order details
      const orderDetails = await OrderDetail.insertMany(orderDetailsData);
    } catch (error) {
      console.error("Error saving order and order details:", error);
    }
  };

  saveOrder = async (req, res) => {
    try {
      const { orderData, orderDetailsData } = req.body;

      let orderRes = await Order.create(orderData);

      // create order details array with order id
      orderDetailsData.forEach((detail, index) => {
        detail.orderID = orderRes._id;
        detail.color = orderDetailsData[index].color;
        detail.material = orderDetailsData[index].material;
        detail.price = orderDetailsData[index].price;
        detail.quantity = +orderDetailsData[index].quantity;
      });

      // console.log(orderDetailsData);

      // Create and save order details
      const orderDetails = await OrderDetail.insertMany(orderDetailsData);

      // console.log(orderDetails);
      res.status(201).json({
        order: orderRes,
        orderDetails: orderDetails,
      });
    } catch (error) {
      console.error("Error saving order and order details:", error);
      res.status(500).json({ message: "Error saving order" });
    }
  };

  getOrderDetailsByOrderId = async (req, res) => {
    try {
      const { orderId } = req.params;
      const orderDetails = await OrderDetail.find({ orderID: orderId });

      // console.log("orderDetails", orderDetails);

      // create list promist to wait all  and call find variant by id
      // const variantPromises = orderDetails.map(async (detail) => {
      //   return Variant.findById(detail.variantID);
      // });

      // console.log(orderDetails.map((x) => x.variantID));

      // // wait for all promises to resolve
      // const variants = await Promise.all(variantPromises);
      // console.log("variants", variants);

      // add color , material from order detail to vaariant

      // handle pagination
      let page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;
      let startIndex = (page - 1) * limit;
      let endIndex = page * limit;
      let results = {};

      results.total = res.length;
      results.data = orderDetails.slice(startIndex, endIndex);

      let pagination = {
        current: page,
        pageSize: limit,
        total: res.length,
      };

      results.pagination = pagination;

      return res.status(200).json(results);
    } catch (error) {
      console.error("Error getting order details:", error);
      res.status(500).json({ message: "Error getting order details" });
    }
  };
}
