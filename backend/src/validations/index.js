import { validationResult } from "express-validator";
import validator from "validator";

export const validateSchema = (schema, data) => {
  const errors = {};
  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];
    if (rules.required && (value === undefined || value === null || value === "")) {
      errors[field] = `${field} is required`;
      continue;
    }
    if (value === undefined || value === null || value === "") continue;
    if (rules.type === "email" && !validator.isEmail(String(value))) {
      errors[field] = "Please provide a valid email";
    }
    if (rules.minLength && String(value).length < rules.minLength) {
      errors[field] = `${field} must be at least ${rules.minLength} characters`;
    }
    if (rules.maxLength && String(value).length > rules.maxLength) {
      errors[field] = `${field} cannot exceed ${rules.maxLength} characters`;
    }
  }
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

export const sanitizeInput = (data) => {
  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      sanitized[key] = validator.trim(validator.escape(value));
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};
