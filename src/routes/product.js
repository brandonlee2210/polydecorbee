import ProductController from "../controllers/ProductController.js";
import BaseRouter from "../router/BaseRouter.js";

export class ProductRouter extends BaseRouter {
  constructor() {
    super(new ProductController());
  }
}
