// Tao class tu base
import BaseController from "./BaseController.js";
import OrderDetail from "../models/OrderDetail.js";
// create class OrderDetail with CRUD

export default class OrderDetailController extends BaseController {
  constructor() {
    super(OrderDetail);
  }
}
