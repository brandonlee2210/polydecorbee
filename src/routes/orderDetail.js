import OrderDetailController from "../controllers/OrderDetailController.js";
import BaseRouter from "./BaseRouter.js";

class OrderDetailRouter extends BaseRouter {
  constructor() {
    super(new OrderDetailController(), "orderDetails");
  }
}

export default OrderDetailRouter;
