// Tao class tu base
import BaseController from "./BaseController.js";
import Review from "../models/Review.js";
// create class Review with CRUD

export default class ReviewController extends BaseController {
  constructor() {
    super(Review);
  }
}
