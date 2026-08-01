import { Router } from "express";
import {
  getPublicBuyers,
  getBuyers,
  getBuyerById,
  createBuyer,
  updateBuyer,
  deleteBuyer,
  toggleFeatured,
} from "../controllers/buyer.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../validations/index.js";
import {
  createBuyerValidation,
  updateBuyerValidation,
  buyerIdValidation,
} from "../validations/buyer.validation.js";

const router = Router();

router.get("/public", getPublicBuyers);

router.use(protect);

router.get("/", authorize("super_admin", "admin"), getBuyers);
router.get("/:id", buyerIdValidation, validate, getBuyerById);
router.post("/", authorize("super_admin", "admin"), createBuyerValidation, validate, createBuyer);
router.put("/:id", authorize("super_admin", "admin"), updateBuyerValidation, validate, updateBuyer);
router.delete("/:id", authorize("super_admin"), buyerIdValidation, validate, deleteBuyer);
router.patch("/:id/toggle-featured", authorize("super_admin", "admin"), buyerIdValidation, validate, toggleFeatured);

export default router;
