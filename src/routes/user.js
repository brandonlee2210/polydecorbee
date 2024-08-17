import UserController from "../controllers/UserController.js";
import BaseRouter from "../router/BaseRouter.js";

export class UserRouter extends BaseRouter {
  constructor() {
    super(new UserController());
  }
}
