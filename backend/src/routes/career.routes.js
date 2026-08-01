import { Router } from "express";
import {
  submitApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/career.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../validations/index.js";
import { submitApplicationValidation, updateApplicationStatusValidation } from "../validations/career.validation.js";
import { uploadSingle, handleMulterError } from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/", uploadSingle, handleMulterError, submitApplicationValidation, validate, submitApplication);

router.use(protect);

router.get("/", authorize("super_admin", "admin"), getApplications);
router.get("/:id", authorize("super_admin", "admin"), getApplicationById);
router.patch("/:id/status", authorize("super_admin", "admin"), updateApplicationStatusValidation, validate, updateApplicationStatus);
router.delete("/:id", authorize("super_admin"), deleteApplication);

export default router;
