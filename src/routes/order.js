import OrderController from "../controllers/OrderController.js";
import BaseRouter from "../router/BaseRouter.js";

export class OrderRouter extends BaseRouter {
  constructor() {
    super(new OrderController());
  }
}