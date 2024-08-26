// Tao class tu base
import BaseController from "./BaseController.js";
import OrderDetail from "../models/OrderDetail.js";
import Order from "../models/Order.js";

import Variant from "../models/Variant.js";
import User from "../models/User.js";
// create class OrderDetail with CRUD

export default class OrderDetailController extends BaseController {
  constructor() {
    super(OrderDetail);
  }

  // get the most order detail created through each month
  async getMostOrderDetailCreatedThroughEachMonth(req, res) {
    const result = await OrderDetail.aggregate([
      {
        // Extract year and month from createdDate
        $group: {
          _id: {
            year: { $year: "$createdDate" },
            month: { $month: "$createdDate" },
            name: "$name", // Group by the item name as well
          },
          count: { $sum: 1 }, // Count the occurrences
        },
      },
      {
        // Sort by the count in descending order
        $sort: { count: -1 },
      },
      {
        // Group again to get the top item for each month
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month",
          },
          topItem: { $first: "$_id.name" },
          itemCount: { $first: "$count" },
        },
      },
      {
        // Optionally, sort by year and month for better readability
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    return res.status(200).json(result);
  }

  // Get all orders, variants, users
  async getAllOrdersWithDetailsAndUsers(req, res) {
    const orders = await Order.find();
    const variants = await Variant.find();
    const users = await User.find();

    // Calculate total revenue
    const totalRevenue = orders.reduce((sum, order) => {
      return sum + order.total;
    }, 0);

    return res.status(200).json({
      orders: orders.length,
      variants: variants.length,
      users: users.length,
      totalRevenue,
    });
  }

  async getAllRevenueEachMonth(req, res) {
    const result = await Order.aggregate([
      {
        // Extract year and month from createdDate
        $group: {
          _id: {
            year: { $year: "$createdDate" },
            month: { $month: "$createdDate" },
          },
          totalRevenue: { $sum: "$total" }, // Sum up the total revenue
        },
      },
      {
        // Sort by the year and month for better readability
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
    return res.status(200).json(result);
  }
}
