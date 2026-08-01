import { body, param } from "express-validator";

const validTypes = ["full-time", "part-time", "contract", "internship"];

export const createCircularValidation = [
  body("title").trim().notEmpty().withMessage("Title is required")
    .isLength({ max: 200 }).withMessage("Title cannot exceed 200 characters"),
  body("description").trim().notEmpty().withMessage("Description is required")
    .isLength({ max: 5000 }).withMessage("Description cannot exceed 5000 characters"),
  body("type").optional().isIn(validTypes).withMessage("Type must be one of: full-time, part-time, contract, internship"),
  body("requirements").optional().isArray(),
  body("requirements.*").optional().trim(),
  body("responsibilities").optional().isArray(),
  body("responsibilities.*").optional().trim(),
  body("location").optional().trim(),
  body("department").optional().trim(),
  body("salary").optional().trim(),
];

export const updateCircularValidation = [
  param("id").isMongoId().withMessage("Invalid job circular ID"),
  body("title").optional().trim()
    .isLength({ max: 200 }).withMessage("Title cannot exceed 200 characters"),
  body("description").optional().trim()
    .isLength({ max: 5000 }).withMessage("Description cannot exceed 5000 characters"),
  body("type").optional().isIn(validTypes).withMessage("Type must be one of: full-time, part-time, contract, internship"),
  body("requirements").optional().isArray(),
  body("requirements.*").optional().trim(),
  body("responsibilities").optional().isArray(),
  body("responsibilities.*").optional().trim(),
  body("isActive").optional().isBoolean(),
  body("sortOrder").optional().isInt(),
];

export const circularIdValidation = [
  param("id").isMongoId().withMessage("Invalid job circular ID"),
];
