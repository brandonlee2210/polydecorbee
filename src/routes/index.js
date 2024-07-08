import { Router } from "express";

import CategoryRouter from "./category.js";
import authRouter from "./auth.js";

const router = Router();

router.use("/", new CategoryRouter().route);
// router.use("/", new ProductRouter().route);
router.use("/", authRouter);

export default router;
