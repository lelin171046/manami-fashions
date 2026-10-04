import { body, param, query } from "express-validator";

export const createProductValidation = [
  body("name").trim().notEmpty().withMessage("Product name is required")
    .isLength({ max: 150 }).withMessage("Name cannot exceed 150 characters"),
  body("audience").notEmpty().withMessage("Audience is required")
    .isIn(["men", "women", "kids"]).withMessage("Audience must be men, women, or kids"),
  body("category").isMongoId().withMessage("Valid category ID is required"),
  body("productType").optional().trim()
    .isLength({ max: 100 }).withMessage("Product type cannot exceed 100 characters"),
  body("shortDescription").optional().trim()
    .isLength({ max: 500 }).withMessage("Short description cannot exceed 500 characters"),
  body("description").optional().trim()
    .isLength({ max: 5000 }).withMessage("Description cannot exceed 5000 characters"),
  body("features").optional().isArray().withMessage("Features must be an array"),
  body("features.*").optional().trim(),
  body("materials").optional().isArray().withMessage("Materials must be an array"),
  body("materials.*").optional().trim(),
  body("fabric").optional().trim(),
  body("composition").optional().trim(),
  body("weight").optional().trim(),
  body("availableColors").optional().isArray().withMessage("Available colors must be an array"),
  body("availableColors.*").optional().trim(),
  body("availableSizes").optional().isArray().withMessage("Available sizes must be an array"),
  body("availableSizes.*").optional().trim(),
  body("images").optional().isArray().withMessage("Images must be an array"),
  body("images.*.url").optional().isURL().withMessage("Valid image URL required"),
  body("images.*.publicId").optional().trim(),
  body("images.*.alt").optional().trim(),
  body("manufacturingCapabilities").optional().isArray().withMessage("Manufacturing capabilities must be an array"),
  body("manufacturingCapabilities.*").optional().trim(),
  body("certifications").optional().isArray().withMessage("Certifications must be an array"),
  body("certifications.*").optional().trim(),
  body("minimumOrderQuantity").optional().trim(),
  body("productionCapacity").optional().trim(),
  body("leadTime").optional().trim(),
  body("featured").optional().isBoolean(),
  body("status").optional().isIn(["active", "draft", "archived"]),
  body("sortOrder").optional().isInt({ min: 0 }).withMessage("Sort order must be a non-negative integer"),
];

export const updateProductValidation = [
  param("id").isMongoId().withMessage("Invalid product ID"),
  body("name").optional().trim()
    .isLength({ max: 150 }).withMessage("Name cannot exceed 150 characters"),
  body("audience").optional()
    .isIn(["men", "women", "kids"]).withMessage("Audience must be men, women, or kids"),
  body("category").optional().isMongoId().withMessage("Invalid category ID"),
  body("productType").optional().trim()
    .isLength({ max: 100 }).withMessage("Product type cannot exceed 100 characters"),
  body("shortDescription").optional().trim()
    .isLength({ max: 500 }).withMessage("Short description cannot exceed 500 characters"),
  body("description").optional().trim()
    .isLength({ max: 5000 }).withMessage("Description cannot exceed 5000 characters"),
  body("features").optional().isArray().withMessage("Features must be an array"),
  body("features.*").optional().trim(),
  body("materials").optional().isArray().withMessage("Materials must be an array"),
  body("materials.*").optional().trim(),
  body("fabric").optional().trim(),
  body("composition").optional().trim(),
  body("weight").optional().trim(),
  body("availableColors").optional().isArray().withMessage("Available colors must be an array"),
  body("availableColors.*").optional().trim(),
  body("availableSizes").optional().isArray().withMessage("Available sizes must be an array"),
  body("availableSizes.*").optional().trim(),
  body("images").optional().isArray().withMessage("Images must be an array"),
  body("images.*.url").optional().isURL().withMessage("Valid image URL required"),
  body("images.*.publicId").optional().trim(),
  body("images.*.alt").optional().trim(),
  body("manufacturingCapabilities").optional().isArray().withMessage("Manufacturing capabilities must be an array"),
  body("manufacturingCapabilities.*").optional().trim(),
  body("certifications").optional().isArray().withMessage("Certifications must be an array"),
  body("certifications.*").optional().trim(),
  body("minimumOrderQuantity").optional().trim(),
  body("productionCapacity").optional().trim(),
  body("leadTime").optional().trim(),
  body("featured").optional().isBoolean(),
  body("status").optional().isIn(["active", "draft", "archived"]),
  body("sortOrder").optional().isInt({ min: 0 }).withMessage("Sort order must be a non-negative integer"),
];

export const productIdValidation = [
  param("id").isMongoId().withMessage("Invalid product ID"),
];

export const productSlugValidation = [
  param("slug").trim().notEmpty().withMessage("Slug is required"),
];

export const publicProductsValidation = [
  query("audience").notEmpty().withMessage("Audience query parameter is required")
    .isIn(["men", "women", "kids"]).withMessage("Audience must be men, women, or kids"),
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
  query("limit").optional().isInt({ min: 1, max: 50 }).withMessage("Limit must be between 1 and 50"),
  query("sort").optional().isString(),
  query("search").optional().isString(),
  query("category").optional().isMongoId().withMessage("Invalid category ID"),
];
