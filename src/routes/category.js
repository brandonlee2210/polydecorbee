import CategoryController from "../controllers/CategoryController.js";
import BaseRouter from "./BaseRouter.js";

class CategoryRouter extends BaseRouter {
  constructor() {
    super(new CategoryController(), "categories");
  }
}

export default CategoryRouter;
