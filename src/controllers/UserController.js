import BaseController from "./BaseController.js";
import User from "../models/User.js";
// create class product with CRUD

export default class UserController extends BaseController {
  constructor() {
    super(User);
  }
}
