import BaseController from "./BaseController.js";
import Comment from "../models/Comment.js";
// create class product with CRUD

export default class CommentController extends BaseController {
  constructor() {
    super(Comment);
  }
}
