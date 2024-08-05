import { Router } from "express";

import CategoryRouter from "./category.js";
import VariantRouter from "./variant.js";
import OrderRouter from "./order.js";
import authRouter from "./auth.js";
import OrderDetailRouter from "./orderDetail.js";

const router = Router();

router.use("/", new CategoryRouter().route);
// router.use("/", new ProductRouter().route);
router.use("/", authRouter);
router.use("/", new VariantRouter().route);
router.use("/", new OrderRouter().route);
router.use("/", new OrderDetailRouter().route);

const orderRouter = new OrderRouter();
orderRouter.addRouter(
  "post",
  "/orders/save-order",
  orderRouter.controller.saveOrder
);
orderRouter.addRouter(
  "get",
  "/ordersByUser/:userId",
  orderRouter.controller.getOrdersByUserId
);
orderRouter.addRouter(
  "get",
  "/orders/variants/:categoryName",
  orderRouter.controller.getVariantsByCategoryId
);
orderRouter.addRouter(
  "post",
  "/orders/update-stock",
  orderRouter.controller.updateStock
);
orderRouter.addRouter(
  "get",
  "/orders/details/:orderId",
  orderRouter.controller.getOrderDetailsByOrderId
);

router.use("/", orderRouter.route);

export default router;
