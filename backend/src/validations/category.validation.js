import { body, param } from "express-validator";

export const createCategoryValidation = [
  body("name").trim().notEmpty().withMessage("Category name is required")
    .isLength({ max: 50 }).withMessage("Name cannot exceed 50 characters"),
  body("description").optional().trim()
    .isLength({ max: 300 }).withMessage("Description cannot exceed 300 characters"),
  body("sortOrder").optional().isInt({ min: 0 }),
];

export const updateCategoryValidation = [
  param("id").isMongoId().withMessage("Invalid category ID"),
  body("name").optional().trim()
    .isLength({ max: 50 }).withMessage("Name cannot exceed 50 characters"),
  body("description").optional().trim()
    .isLength({ max: 300 }).withMessage("Description cannot exceed 300 characters"),
  body("isActive").optional().isBoolean(),
  body("sortOrder").optional().isInt({ min: 0 }),
];

export const categoryIdValidation = [
  param("id").isMongoId().withMessage("Invalid category ID"),
];
