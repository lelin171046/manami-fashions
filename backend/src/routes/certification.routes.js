import { Router } from "express";
import {
  getPublicCertifications,
  getCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../controllers/certification.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../validations/index.js";
import {
  createCertificationValidation,
  updateCertificationValidation,
  certificationIdValidation,
} from "../validations/certification.validation.js";

const router = Router();

router.get("/public", getPublicCertifications);

router.use(protect);

router.get("/", authorize("super_admin", "admin"), getCertifications);
router.get("/:id", certificationIdValidation, validate, getCertificationById);
router.post("/", authorize("super_admin", "admin"), createCertificationValidation, validate, createCertification);
router.put("/:id", authorize("super_admin", "admin"), updateCertificationValidation, validate, updateCertification);
router.delete("/:id", authorize("super_admin"), certificationIdValidation, validate, deleteCertification);

export default router;
