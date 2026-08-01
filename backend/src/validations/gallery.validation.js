import { body, param } from "express-validator";
import { GALLERY_CATEGORIES } from "../constants/index.js";

export const createGalleryValidation = [
  body("title").trim().notEmpty().withMessage("Title is required")
    .isLength({ max: 150 }).withMessage("Title cannot exceed 150 characters"),
  body("image.url").notEmpty().withMessage("Image URL is required").isURL(),
  body("category").optional().isIn(Object.values(GALLERY_CATEGORIES)),
  body("description").optional().trim()
    .isLength({ max: 500 }).withMessage("Description cannot exceed 500 characters"),
  body("sortOrder").optional().isInt({ min: 0 }),
];

export const updateGalleryValidation = [
  param("id").isMongoId().withMessage("Invalid gallery ID"),
  body("title").optional().trim()
    .isLength({ max: 150 }).withMessage("Title cannot exceed 150 characters"),
  body("category").optional().isIn(Object.values(GALLERY_CATEGORIES)),
  body("isActive").optional().isBoolean(),
];

export const galleryIdValidation = [
  param("id").isMongoId().withMessage("Invalid gallery ID"),
];
