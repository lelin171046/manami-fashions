import { Router } from "express";
import {
  login,
  logout,
  refreshToken,
  getMe,
  updatePassword,
} from "../controllers/auth.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { ROLES } from "../constants/index.js";

const router = Router();

router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", protect, logout);

router.get("/me", protect, getMe);
router.put("/update-password", protect, updatePassword);

export default router;
