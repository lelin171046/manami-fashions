import { body, param, query } from "express-validator";

export const createBuyerMapValidation = [
  body("name").trim().notEmpty().withMessage("Buyer name is required")
    .isLength({ max: 100 }).withMessage("Buyer name cannot exceed 100 characters"),
  body("country").trim().notEmpty().withMessage("Country is required")
    .isLength({ max: 100 }).withMessage("Country cannot exceed 100 characters"),
  body("partnershipYear").optional().trim().isLength({ max: 50 }).withMessage("Partnership year cannot exceed 50 characters"),
  body("description").optional().trim().isLength({ max: 1000 }).withMessage("Description cannot exceed 1000 characters"),
  body("featured").optional().isBoolean(),
  body("sortOrder").optional().isInt({ min: 0 }),
  body("stats").optional().isArray({ max: 10 }).withMessage("Cannot have more than 10 stats"),
  body("stats.*.label").optional().trim().isLength({ max: 50 }).withMessage("Stat label cannot exceed 50 characters"),
  body("stats.*.value").optional().trim().isLength({ max: 100 }).withMessage("Stat value cannot exceed 100 characters"),
  body("orderCategories").optional().isArray({ max: 20 }).withMessage("Cannot have more than 20 order categories"),
  body("orderCategories.*").optional().trim(),
];

export const updateBuyerMapValidation = [
  param("id").isMongoId().withMessage("Invalid buyer ID"),
  body("name").optional().trim().notEmpty().withMessage("Buyer name cannot be empty")
    .isLength({ max: 100 }).withMessage("Buyer name cannot exceed 100 characters"),
  body("country").optional().trim().isLength({ max: 100 }).withMessage("Country cannot exceed 100 characters"),
  body("partnershipYear").optional().trim().isLength({ max: 50 }).withMessage("Partnership year cannot exceed 50 characters"),
  body("description").optional().trim().isLength({ max: 1000 }).withMessage("Description cannot exceed 1000 characters"),
  body("featured").optional().isBoolean(),
  body("isActive").optional().isBoolean(),
  body("sortOrder").optional().isInt({ min: 0 }),
  body("stats").optional().isArray({ max: 10 }).withMessage("Cannot have more than 10 stats"),
  body("stats.*.label").optional().trim().isLength({ max: 50 }).withMessage("Stat label cannot exceed 50 characters"),
  body("stats.*.value").optional().trim().isLength({ max: 100 }).withMessage("Stat value cannot exceed 100 characters"),
  body("orderCategories").optional().isArray({ max: 20 }).withMessage("Cannot have more than 20 order categories"),
  body("orderCategories.*").optional().trim(),
];

export const buyerMapIdValidation = [
  param("id").isMongoId().withMessage("Invalid buyer ID"),
];

export const getBuyerMapsValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),
  query("featured").optional().isBoolean(),
  query("country").optional().trim(),
  query("search").optional().trim(),
];