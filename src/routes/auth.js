import {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,
} from "../controllers/AuthController.js";
import { Router } from "express";

const router = Router();

router.get("/auth/signup", signup_get);
router.post("/auth/signup", signup_post);
router.get("/auth/login", login_get);
router.post("/auth/login", login_post);
router.get("/auth/logout", logout_get);

export default router;
