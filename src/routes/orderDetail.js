import OrderDetailController from "../controllers/OrderDetailController.js";
import BaseRouter from "../router/BaseRouter.js";

export class OrderDetailRouter extends BaseRouter {
  constructor() {
    super(new OrderDetailController());
  }
}