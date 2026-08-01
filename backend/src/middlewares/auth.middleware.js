import { verifyAccessToken } from "../services/auth.service.js";
import { Admin } from "../models/index.js";
import { AppError } from "./error.middleware.js";
import { HTTP_STATUS } from "../constants/index.js";

export const protect = async (req, _res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new AppError("Not authenticated. Please log in.", HTTP_STATUS.UNAUTHORIZED);
    }

    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch {
      throw new AppError("Invalid or expired token", HTTP_STATUS.UNAUTHORIZED);
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      throw new AppError("Admin account no longer exists", HTTP_STATUS.UNAUTHORIZED);
    }

    if (!admin.isActive) {
      throw new AppError("Account is deactivated", HTTP_STATUS.FORBIDDEN);
    }

    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles) => {
  return (req, _res, next) => {
    if (!req.admin) {
      return next(new AppError("Not authenticated", HTTP_STATUS.UNAUTHORIZED));
    }

    if (!roles.includes(req.admin.role)) {
      return next(
        new AppError("You do not have permission for this action", HTTP_STATUS.FORBIDDEN)
      );
    }

    next();
  };
};
