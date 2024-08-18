import UserController from "../controllers/UserController.js";
import BaseRouter from "./BaseRouter.js";

export default class UserRouter extends BaseRouter {
  constructor() {
    super(new UserController(), "users");
  }
}
