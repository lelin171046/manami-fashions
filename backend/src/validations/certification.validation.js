import { body, param, query } from "express-validator";
import { CERTIFICATION_TYPES } from "../constants/index.js";

export const createCertificationValidation = [
  body("name").trim().notEmpty().withMessage("Name is required")
    .isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters"),
  body("type").notEmpty().withMessage("Type is required")
    .isIn(Object.values(CERTIFICATION_TYPES)).withMessage("Type must be compliance, quality, or sustainability"),
  body("description").optional().trim()
    .isLength({ max: 1000 }).withMessage("Description cannot exceed 1000 characters"),
  body("issuer").optional().trim(),
  body("issueDate").optional().isISO8601(),
  body("expiryDate").optional().isISO8601(),
  body("credentialId").optional().trim(),
  body("skills").optional().isArray(),
  body("sortOrder").optional().isInt({ min: 0 }),
];

export const updateCertificationValidation = [
  param("id").isMongoId().withMessage("Invalid certification ID"),
  body("name").optional().trim()
    .isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters"),
  body("type").optional()
    .isIn(Object.values(CERTIFICATION_TYPES)).withMessage("Invalid type"),
  body("isActive").optional().isBoolean(),
];

export const certificationIdValidation = [
  param("id").isMongoId().withMessage("Invalid certification ID"),
];
