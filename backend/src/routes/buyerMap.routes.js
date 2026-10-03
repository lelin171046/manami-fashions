import { Router } from "express";
import {
  getPublicBuyerMaps,
  getBuyerMaps,
  getBuyerMapById,
  createBuyerMap,
  updateBuyerMap,
  deleteBuyerMap,
  toggleFeatured,
  seedBuyerMaps,
} from "../controllers/buyerMap.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../validations/index.js";
import {
  createBuyerMapValidation,
  updateBuyerMapValidation,
  buyerMapIdValidation,
  getBuyerMapsValidation,
} from "../validations/buyerMap.validation.js";

const router = Router();

router.get("/public", getPublicBuyerMaps);
router.post("/seed", seedBuyerMaps);

router.use(protect);

router.get("/", authorize("super_admin", "admin"), getBuyerMapsValidation, validate, getBuyerMaps);
router.get("/:id", authorize("super_admin", "admin"), buyerMapIdValidation, validate, getBuyerMapById);
router.post("/", authorize("super_admin", "admin"), createBuyerMapValidation, validate, createBuyerMap);
router.put("/:id", authorize("super_admin", "admin"), updateBuyerMapValidation, validate, updateBuyerMap);
router.delete("/:id", authorize("super_admin"), buyerMapIdValidation, validate, deleteBuyerMap);
router.patch("/:id/toggle-featured", authorize("super_admin", "admin"), buyerMapIdValidation, validate, toggleFeatured);

export default router;