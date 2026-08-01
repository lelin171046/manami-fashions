import { Router } from "express";
import {
  getPublicCirculars,
  getCirculars,
  getCircularById,
  createCircular,
  updateCircular,
  deleteCircular,
} from "../controllers/jobCircular.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../validations/index.js";
import {
  createCircularValidation,
  updateCircularValidation,
  circularIdValidation,
} from "../validations/jobCircular.validation.js";

const router = Router();

router.get("/public", getPublicCirculars);

router.use(protect);

router.get("/", authorize("super_admin", "admin"), getCirculars);
router.get("/:id", circularIdValidation, validate, getCircularById);
router.post("/", authorize("super_admin", "admin"), createCircularValidation, validate, createCircular);
router.put("/:id", authorize("super_admin", "admin"), updateCircularValidation, validate, updateCircular);
router.delete("/:id", authorize("super_admin"), circularIdValidation, validate, deleteCircular);

export default router;
