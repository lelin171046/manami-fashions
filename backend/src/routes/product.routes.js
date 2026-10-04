import { Router } from "express";
import {
  getProducts,
  getPublicProducts,
  getFeaturedProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleFeatured,
  updateStatus,
} from "../controllers/product.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../validations/index.js";
import {
  createProductValidation,
  updateProductValidation,
  productIdValidation,
  productSlugValidation,
  publicProductsValidation,
} from "../validations/product.validation.js";

const router = Router();

router.get("/public", publicProductsValidation, validate, getPublicProducts);
router.get("/featured", getFeaturedProducts);
router.get("/slug/:slug", productSlugValidation, validate, getProductBySlug);

router.use(protect);

router.get("/", authorize("super_admin", "admin"), getProducts);
router.post("/", authorize("super_admin", "admin"), createProductValidation, validate, createProduct);
router.get("/:id", productIdValidation, validate, getProductById);
router.put("/:id", authorize("super_admin", "admin"), updateProductValidation, validate, updateProduct);
router.delete("/:id", authorize("super_admin"), productIdValidation, validate, deleteProduct);
router.patch("/:id/toggle-featured", authorize("super_admin", "admin"), productIdValidation, validate, toggleFeatured);
router.patch("/:id/status", authorize("super_admin", "admin"), updateStatus);

export default router;
