import { Router } from "express";
import { submitContact } from "../controllers/contact.controller.js";
import { validate } from "../validations/index.js";
import { submitContactValidation } from "../validations/contact.validation.js";

const router = Router();

router.post("/", submitContactValidation, validate, submitContact);

export default router;
