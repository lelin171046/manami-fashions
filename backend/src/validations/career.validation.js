import { body, param } from "express-validator";
import { APPLICATION_STATUS } from "../constants/index.js";

export const submitApplicationValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").trim().notEmpty().withMessage("Phone is required"),
  body("position").trim().notEmpty().withMessage("Position is required"),
  body("coverLetter").optional().trim()
    .isLength({ max: 3000 }).withMessage("Cover letter cannot exceed 3000 characters"),
  body("experience").optional().trim(),
];

export const updateApplicationStatusValidation = [
  param("id").isMongoId().withMessage("Invalid application ID"),
  body("status").notEmpty().withMessage("Status is required")
    .isIn(Object.values(APPLICATION_STATUS)),
  body("notes").optional().trim(),
];
