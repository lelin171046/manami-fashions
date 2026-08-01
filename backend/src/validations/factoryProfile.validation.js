import { body } from "express-validator";

export const updateProfileValidation = [
  body("companyName").optional().trim()
    .isLength({ max: 150 }).withMessage("Company name cannot exceed 150 characters"),
  body("yearEstablished").optional().isInt({ min: 1900, max: 2100 }),
  body("productionCapacity.sewingLines").optional().isInt({ min: 0 }),
  body("productionCapacity.totalEmployees").optional().isInt({ min: 0 }),
  body("machinery.totalMachines").optional().isInt({ min: 0 }),
  body("machinery.cuttingTables").optional().isInt({ min: 0 }),
];
