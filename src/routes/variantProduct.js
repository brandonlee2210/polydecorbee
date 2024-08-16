import VariantController from "../controllers/VariantController.js";
import BaseRouter from "./BaseRouter.js";

class VariantProductRouter extends BaseRouter {
  constructor() {
    super(new VariantController(), "variantProducts");
  }
}

export default VariantProductRouter;
