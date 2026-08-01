import { Router } from "express";
import {
  getPublicGallery,
  getGallery,
  getGalleryById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../controllers/gallery.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../validations/index.js";
import {
  createGalleryValidation,
  updateGalleryValidation,
  galleryIdValidation,
} from "../validations/gallery.validation.js";

const router = Router();

router.get("/public", getPublicGallery);

router.use(protect);

router.get("/", authorize("super_admin", "admin"), getGallery);
router.get("/:id", galleryIdValidation, validate, getGalleryById);
router.post("/", authorize("super_admin", "admin"), createGalleryValidation, validate, createGalleryItem);
router.put("/:id", authorize("super_admin", "admin"), updateGalleryValidation, validate, updateGalleryItem);
router.delete("/:id", authorize("super_admin"), galleryIdValidation, validate, deleteGalleryItem);

export default router;
