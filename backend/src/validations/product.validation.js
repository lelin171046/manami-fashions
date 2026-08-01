import { body, param } from "express-validator";

export const createProductValidation = [
  body("title").trim().notEmpty().withMessage("Title is required")
    .isLength({ max: 150 }).withMessage("Title cannot exceed 150 characters"),
  body("category").isMongoId().withMessage("Valid category ID is required"),
  body("description").optional().trim()
    .isLength({ max: 2000 }).withMessage("Description cannot exceed 2000 characters"),
  body("fabric").optional().trim(),
  body("gsm").optional().trim(),
  body("sizes").optional().isArray().withMessage("Sizes must be an array"),
  body("sizes.*").optional().trim(),
  body("colors").optional().isArray().withMessage("Colors must be an array"),
  body("colors.*.name").optional().trim(),
  body("colors.*.hex").optional().trim(),
  body("moq").optional().trim(),
  body("images").optional().isArray().withMessage("Images must be an array"),
  body("images.*.url").optional().isURL().withMessage("Valid image URL required"),
  body("images.*.publicId").optional().trim(),
  body("featured").optional().isBoolean(),
  body("status").optional().isIn(["active", "draft", "archived"]),
];

export const updateProductValidation = [
  param("id").isMongoId().withMessage("Invalid product ID"),
  body("title").optional().trim()
    .isLength({ max: 150 }).withMessage("Title cannot exceed 150 characters"),
  body("category").optional().isMongoId().withMessage("Invalid category ID"),
  body("description").optional().trim()
    .isLength({ max: 2000 }).withMessage("Description cannot exceed 2000 characters"),
  body("status").optional().isIn(["active", "draft", "archived"]),
];

export const productIdValidation = [
  param("id").isMongoId().withMessage("Invalid product ID"),
];

export const productSlugValidation = [
  param("slug").trim().notEmpty().withMessage("Slug is required"),
];
