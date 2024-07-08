import VariantController from "../controllers/VariantController.js";
import BaseRouter from "../router/BaseRouter.js";

export class VariantRouter extends BaseRouter {
  constructor() {
    super(new VariantController());
  }
}