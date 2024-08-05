import BaseController from "./BaseController.js";
import Variant from "../models/Variant.js";
// create class Variant with CRUD

export default class VariantController extends BaseController {
  constructor() {
    super(Variant);
  }
}
