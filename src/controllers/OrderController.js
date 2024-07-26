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

  saveOrder = async (req, res) => {
    try {
      const { orderData, orderDetailsData } = req.body;

      let orderRes = await Order.create(orderData);

      // create order details array with order id
      orderDetailsData.forEach((detail, index) => {
        detail.orderID = orderRes._id;
      });

      // Create and save order details
      const orderDetails = await OrderDetail.insertMany(orderDetailsData);

      console.log(orderDetails);
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

      console.log("orderDetails", orderDetails);

      // create list promist to wait all  and call find variant by id
      const variantPromises = orderDetails.map(async (detail) => {
        return Variant.findById(detail.variantID);
      });

      console.log(orderDetails.map((x) => x.variantID));

      // wait for all promises to resolve
      const variants = await Promise.all(variantPromises);
      console.log("variants", variants);

      // add color , material from order detail to vaariant

      // handle pagination
      let page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;
      let startIndex = (page - 1) * limit;
      let endIndex = page * limit;
      let results = {};

      results.total = res.length;
      results.data = variants.slice(startIndex, endIndex);

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
