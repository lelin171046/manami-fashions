import { body, param } from "express-validator";

export const subscribeValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
];

export const subscriberIdValidation = [
  param("id").isMongoId().withMessage("Invalid subscriber ID"),
];
