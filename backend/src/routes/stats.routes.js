import { Router } from "express";
import { getDashboardStats } from "../controllers/admin.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", protect, authorize("super_admin", "admin"), getDashboardStats);

export default router;
