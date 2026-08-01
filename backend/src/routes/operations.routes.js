import { Router } from "express";
import {
  getPublicOperations,
  getOperations,
  getOperationById,
  createOperation,
  updateOperation,
  deleteOperation,
} from "../controllers/operations.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../validations/index.js";
import {
  createOperationValidation,
  updateOperationValidation,
  operationIdValidation,
} from "../validations/operations.validation.js";

const router = Router();

router.get("/public", getPublicOperations);

router.use(protect);

router.get("/", authorize("super_admin", "admin"), getOperations);
router.get("/:id", operationIdValidation, validate, getOperationById);
router.post("/", authorize("super_admin", "admin"), createOperationValidation, validate, createOperation);
router.put("/:id", authorize("super_admin", "admin"), updateOperationValidation, validate, updateOperation);
router.delete("/:id", authorize("super_admin"), operationIdValidation, validate, deleteOperation);

export default router;
