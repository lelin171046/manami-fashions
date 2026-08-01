import { Admin } from "../models/index.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  setTokenCookies,
  clearTokenCookies,
} from "../services/auth.service.js";
import { validateSchema, sanitizeInput } from "../validations/index.js";
import { loginValidation } from "../validations/auth.validation.js";
import { sendSuccess } from "../helpers/response.js";
import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS } from "../constants/index.js";

export const login = async (req, res, next) => {
  try {
    const sanitized = sanitizeInput(req.body);
    const { isValid, errors } = validateSchema(loginValidation, sanitized);

    if (!isValid) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const { email, password } = sanitized;

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
    }

    if (!admin.isActive) {
      throw new AppError("Account is deactivated", HTTP_STATUS.FORBIDDEN);
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
    }

    const accessToken = generateAccessToken(admin._id, admin.role);
    const refreshToken = generateRefreshToken(admin._id);

    admin.refreshToken = refreshToken;
    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    setTokenCookies(res, accessToken, refreshToken);

    return sendSuccess(res, {
      message: "Login successful",
      data: {
        admin: admin.toJSON(),
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await Admin.findByIdAndUpdate(req.admin._id, { refreshToken: null });
    clearTokenCookies(res);

    return sendSuccess(res, { message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      throw new AppError("Refresh token not found", HTTP_STATUS.UNAUTHORIZED);
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(token);
    } catch {
      throw new AppError("Invalid or expired refresh token", HTTP_STATUS.UNAUTHORIZED);
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin || !admin.refreshToken) {
      throw new AppError("Admin not found or token revoked", HTTP_STATUS.UNAUTHORIZED);
    }

    if (admin.refreshToken !== token) {
      throw new AppError("Token does not match", HTTP_STATUS.UNAUTHORIZED);
    }

    const newAccessToken = generateAccessToken(admin._id, admin.role);
    const newRefreshToken = generateRefreshToken(admin._id);

    admin.refreshToken = newRefreshToken;
    await admin.save({ validateBeforeSave: false });

    setTokenCookies(res, newAccessToken, newRefreshToken);

    return sendSuccess(res, {
      message: "Token refreshed",
      data: { accessToken: newAccessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      throw new AppError("Admin not found", HTTP_STATUS.NOT_FOUND);
    }

    return sendSuccess(res, {
      data: { admin: admin.toJSON() },
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      throw new AppError("Both current and new password are required", HTTP_STATUS.BAD_REQUEST);
    }

    if (newPassword.length < 8) {
      throw new AppError("New password must be at least 8 characters", HTTP_STATUS.BAD_REQUEST);
    }

    const admin = await Admin.findById(req.admin._id).select("+password");

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      throw new AppError("Current password is incorrect", HTTP_STATUS.UNAUTHORIZED);
    }

    admin.password = newPassword;
    admin.refreshToken = null;
    await admin.save();

    clearTokenCookies(res);

    return sendSuccess(res, {
      message: "Password updated. Please login again.",
    });
  } catch (error) {
    next(error);
  }
};
