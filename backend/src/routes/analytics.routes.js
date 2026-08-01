import { Router } from "express";
import { trackVisit, getAnalytics } from "../controllers/analytics.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/track", trackVisit);

router.use(protect);

router.get("/", authorize("super_admin", "admin"), getAnalytics);

export default router;
