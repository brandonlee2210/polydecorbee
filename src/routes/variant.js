import VariantController from "../controllers/VariantController.js";
import BaseRouter from "./BaseRouter.js";

class VariantRouter extends BaseRouter {
  constructor() {
    super(new VariantController(), "variants");
  }
}

export default VariantRouter;
