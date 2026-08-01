import { Router } from "express";
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getDashboardStats,
} from "../controllers/admin.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../validations/index.js";
import {
  createAdminValidation,
  updateAdminValidation,
  adminIdValidation,
} from "../validations/admin.validation.js";

const router = Router();

router.use(protect);
router.use(authorize("super_admin", "admin"));

router.get("/dashboard", getDashboardStats);

router.get("/", getAllAdmins);
router.get("/:id", adminIdValidation, validate, getAdminById);
router.post("/", createAdminValidation, validate, createAdmin);
router.put("/:id", updateAdminValidation, validate, updateAdmin);
router.delete("/:id", authorize("super_admin"), adminIdValidation, validate, deleteAdmin);

export default router;
