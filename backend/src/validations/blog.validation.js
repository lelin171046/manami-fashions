import { body, param } from "express-validator";

export const createBlogValidation = [
  body("title").trim().notEmpty().withMessage("Title is required")
    .isLength({ max: 200 }).withMessage("Title cannot exceed 200 characters"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("excerpt").optional().trim()
    .isLength({ max: 300 }).withMessage("Excerpt cannot exceed 300 characters"),
  body("tags").optional().isArray(),
  body("tags.*").optional().trim(),
];

export const updateBlogValidation = [
  param("id").isMongoId().withMessage("Invalid blog ID"),
  body("title").optional().trim()
    .isLength({ max: 200 }).withMessage("Title cannot exceed 200 characters"),
  body("isPublished").optional().isBoolean(),
];

export const blogIdValidation = [
  param("id").isMongoId().withMessage("Invalid blog ID"),
];
