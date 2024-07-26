import OrderController from "../controllers/OrderController.js";
import BaseRouter from "./BaseRouter.js";

class OrderRouter extends BaseRouter {
  constructor() {
    super(new OrderController(), "orders");
  }
}

export default OrderRouter;
