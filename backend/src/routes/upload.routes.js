import { Router } from "express";
import {
  uploadSingleImage,
  uploadMultipleImageFiles,
  uploadResumeFile,
  deleteUpload,
} from "../controllers/upload.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { uploadSingle, uploadMultiple, handleMulterError } from "../middlewares/upload.middleware.js";

const router = Router();

router.use(protect);

router.post("/image", uploadSingle, handleMulterError, uploadSingleImage);
router.post("/images", uploadMultiple, handleMulterError, uploadMultipleImageFiles);
router.post("/resume", uploadSingle, handleMulterError, uploadResumeFile);
router.delete("/", deleteUpload);

export default router;
