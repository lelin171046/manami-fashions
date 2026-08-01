import { body, param } from "express-validator";

export const createBuyerValidation = [
  body("brandName").trim().notEmpty().withMessage("Brand name is required")
    .isLength({ max: 100 }).withMessage("Brand name cannot exceed 100 characters"),
  body("website").optional().trim().isURL().withMessage("Valid URL required"),
  body("country").optional().trim(),
  body("featured").optional().isBoolean(),
  body("sortOrder").optional().isInt({ min: 0 }),
];

export const updateBuyerValidation = [
  param("id").isMongoId().withMessage("Invalid buyer ID"),
  body("brandName").optional().trim()
    .isLength({ max: 100 }).withMessage("Brand name cannot exceed 100 characters"),
  body("website").optional().trim().isURL().withMessage("Valid URL required"),
  body("isActive").optional().isBoolean(),
  body("featured").optional().isBoolean(),
];

export const buyerIdValidation = [
  param("id").isMongoId().withMessage("Invalid buyer ID"),
];
