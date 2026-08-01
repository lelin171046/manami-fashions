import { Router } from "express";
import {
  getContacts,
  getMessageStats,
  getUnreadContactCount,
  getContactById,
  markMessageRead,
  markMessageUnread,
  archiveMessage,
  replyMessage,
  deleteContact,
} from "../controllers/contact.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../validations/index.js";
import { contactIdValidation, replyValidation } from "../validations/contact.validation.js";

const router = Router();

router.use(protect);
router.use(authorize("super_admin", "admin"));

router.get("/", getContacts);
router.get("/stats", getMessageStats);
router.get("/unread-count", getUnreadContactCount);
router.get("/:id", contactIdValidation, validate, getContactById);
router.patch("/:id/read", contactIdValidation, validate, markMessageRead);
router.patch("/:id/unread", contactIdValidation, validate, markMessageUnread);
router.patch("/:id/archive", contactIdValidation, validate, archiveMessage);
router.post("/:id/reply", contactIdValidation, validate, replyValidation, validate, replyMessage);
router.delete("/:id", contactIdValidation, validate, deleteContact);

export default router;
