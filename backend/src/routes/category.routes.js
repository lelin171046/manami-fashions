import { Router } from "express";
import {
  getPublicCategories,
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../validations/index.js";
import {
  createCategoryValidation,
  updateCategoryValidation,
  categoryIdValidation,
} from "../validations/category.validation.js";

const router = Router();

router.get("/public", getPublicCategories);
router.get("/slug/:slug", getCategoryBySlug);

router.use(protect);

router.get("/", authorize("super_admin", "admin"), getCategories);
router.get("/:id", categoryIdValidation, validate, getCategoryById);
router.post("/", authorize("super_admin", "admin"), createCategoryValidation, validate, createCategory);
router.put("/:id", authorize("super_admin", "admin"), updateCategoryValidation, validate, updateCategory);
router.delete("/:id", authorize("super_admin"), categoryIdValidation, validate, deleteCategory);

export default router;
