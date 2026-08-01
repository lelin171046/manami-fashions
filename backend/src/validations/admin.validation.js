import { body, param } from "express-validator";

export const createAdminValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("role")
    .optional()
    .isIn(["super_admin", "admin", "editor"])
    .withMessage("Role must be super_admin, admin, or editor"),
];

export const updateAdminValidation = [
  param("id").isMongoId().withMessage("Invalid admin ID"),
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("role")
    .optional()
    .isIn(["super_admin", "admin", "editor"])
    .withMessage("Role must be super_admin, admin, or editor"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
];

export const adminIdValidation = [
  param("id").isMongoId().withMessage("Invalid admin ID"),
];
