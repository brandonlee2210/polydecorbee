import BaseController from "./BaseController.js";
import VariantProduct from "../models/VariantProduct.js";
// create class Variant with CRUD

export default class VariantController extends BaseController {
  constructor() {
    super(VariantProduct);
  }
}
