import CommentController from "../controllers/ReviewController.js";
import BaseRouter from "./BaseRouter.js";

class ReviewRouter extends BaseRouter {
  constructor() {
    super(new CommentController(), "reviews");
  }
}

export default ReviewRouter;
