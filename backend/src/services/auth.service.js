import jwt from "jsonwebtoken";
import {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  NODE_ENV,
  COOKIE_DOMAIN,
} from "../config/env.js";

export const generateAccessToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};

const buildCookieOptions = (maxAge) => {
  const isProduction = NODE_ENV === "production";
  const options = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge,
  };
  if (COOKIE_DOMAIN && COOKIE_DOMAIN !== "localhost") {
    options.domain = COOKIE_DOMAIN;
  }
  return options;
};

export const setTokenCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, buildCookieOptions(7 * 24 * 60 * 60 * 1000));
  res.cookie("refreshToken", refreshToken, buildCookieOptions(30 * 24 * 60 * 60 * 1000));
};

export const clearTokenCookies = (res) => {
  res.cookie("accessToken", "", buildCookieOptions(0));
  res.cookie("refreshToken", "", buildCookieOptions(0));
};
