import BaseController from "./BaseController.js";
import Variant from "../models/Variant.js";
// create class Variant with CRUD

export default class ImageController extends BaseController {
  constructor() {
    super(Variant);
  }
}
