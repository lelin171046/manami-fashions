import { Router } from "express";
import {
  subscribe,
  unsubscribe,
  getSubscribers,
  deleteSubscriber,
} from "../controllers/newsletter.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../validations/index.js";
import { subscribeValidation, subscriberIdValidation } from "../validations/newsletter.validation.js";

const router = Router();

router.post("/subscribe", subscribeValidation, validate, subscribe);
router.post("/unsubscribe", subscribeValidation, validate, unsubscribe);

router.use(protect);

router.get("/", authorize("super_admin", "admin"), getSubscribers);
router.delete("/:id", authorize("super_admin"), subscriberIdValidation, validate, deleteSubscriber);

export default router;
