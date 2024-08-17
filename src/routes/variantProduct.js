import VariantProductController from "../controllers/VariantProductController.js";
import BaseRouter from "./BaseRouter.js";

class VariantProductRouter extends BaseRouter {
  constructor() {
    super(new VariantProductController(), "variantProducts");
  }
}

export default VariantProductRouter;
