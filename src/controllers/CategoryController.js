import BaseController from "./BaseController.js";
import Category from "../models/Category.js";
// create class product with CRUD

export default class CategoryController extends BaseController {
  constructor() {
    super(Category);
  }
}
