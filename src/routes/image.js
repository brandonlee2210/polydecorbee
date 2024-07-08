import ImageController from "../controllers/ImageController.js";
import BaseRouter from "../router/BaseRouter.js";

export class ImageRouter extends BaseRouter {
  constructor() {
    super(new ImageController());
  }
}