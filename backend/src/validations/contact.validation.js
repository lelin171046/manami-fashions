import { body, param } from "express-validator";
import { MESSAGE_STATUS } from "../constants/index.js";

export const submitContactValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("message").trim().notEmpty().withMessage("Message is required")
    .isLength({ max: 5000 }).withMessage("Message cannot exceed 5000 characters"),
  body("phone").optional().trim(),
  body("company").optional().trim(),
  body("country").optional().trim(),
  body("subject").optional().trim(),
];

export const contactIdValidation = [
  param("id").isMongoId().withMessage("Invalid contact ID"),
];

export const updateContactStatusValidation = [
  param("id").isMongoId().withMessage("Invalid contact ID"),
  body("status").notEmpty().withMessage("Status is required")
    .isIn(Object.values(MESSAGE_STATUS)),
  body("notes").optional().trim(),
];

export const replyValidation = [
  body("subject").optional().trim().isLength({ max: 200 }).withMessage("Subject cannot exceed 200 characters"),
  body("message").trim().notEmpty().withMessage("Reply message is required")
    .isLength({ max: 5000 }).withMessage("Reply cannot exceed 5000 characters"),
];
