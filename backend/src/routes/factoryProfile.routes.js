import { Router } from "express";
import {
  getPublicProfile,
  getProfile,
  createOrUpdateProfile,
  updateProfile,
} from "../controllers/factoryProfile.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../validations/index.js";
import { updateProfileValidation } from "../validations/factoryProfile.validation.js";

const router = Router();

router.get("/public", getPublicProfile);

router.use(protect);

router.get("/", authorize("super_admin", "admin"), getProfile);
router.post("/", authorize("super_admin", "admin"), updateProfileValidation, validate, createOrUpdateProfile);
router.put("/", authorize("super_admin", "admin"), updateProfileValidation, validate, updateProfile);

export default router;
