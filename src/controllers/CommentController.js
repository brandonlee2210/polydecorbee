import BaseController from "./BaseController.js";
import Comment from "../models/Comment.js";
// create class product with CRUD

export default class CommentController extends BaseController {
  constructor() {
    super(Comment);
  }

  // get comments by product id

  async getCommentsByProductId(req, res) {
    const { id } = req.params;
    const comments = await Comment.find({ productId: id });

    if (comments.length === 0) {
      return res.status(404).json({ message: "No comments found" });
    } else {
      return res.status(200).json(comments);
    }
  }

  async addNewCommment(req, res) {
    const { productId, userId, body } = req.body;
    const newComment = new Comment({ productId, userId, body });

    try {
      const savedComment = await newComment.save();
      return res.status(201).json(savedComment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error saving comment" });
    }
  }
}
