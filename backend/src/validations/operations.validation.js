import { body, param } from "express-validator";

export const createOperationValidation = [
  body("title").trim().notEmpty().withMessage("Title is required")
    .isLength({ max: 100 }).withMessage("Title cannot exceed 100 characters"),
  body("description").trim().notEmpty().withMessage("Description is required")
    .isLength({ max: 1000 }).withMessage("Description cannot exceed 1000 characters"),
  body("step").notEmpty().withMessage("Step is required")
    .isInt({ min: 1, max: 20 }).withMessage("Step must be between 1 and 20"),
  body("details").optional().isArray(),
  body("details.*").optional().trim(),
  body("icon").optional().trim(),
];

export const updateOperationValidation = [
  param("id").isMongoId().withMessage("Invalid operation ID"),
  body("title").optional().trim()
    .isLength({ max: 100 }).withMessage("Title cannot exceed 100 characters"),
  body("step").optional().isInt({ min: 1, max: 20 }),
  body("isActive").optional().isBoolean(),
];

export const operationIdValidation = [
  param("id").isMongoId().withMessage("Invalid operation ID"),
];
