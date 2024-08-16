import CommentController from "../controllers/CategoryController.js";
import BaseRouter from "./BaseRouter.js";

class CommentRouter extends BaseRouter {
  constructor() {
    super(new CommentController(), "comments");
  }
}

export default CommentRouter;
