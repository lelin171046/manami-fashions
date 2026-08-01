import { HTTP_STATUS } from "../constants/index.js";

export const sendSuccess = (res, { message = "Success", data = null, statusCode = HTTP_STATUS.OK, meta = null } = {}) => {
  const response = { success: true, message };
  if (data !== null) response.data = data;
  if (meta !== null) response.meta = meta;
  return res.status(statusCode).json(response);
};

export const sendError = (res, { message = "Error", statusCode = HTTP_STATUS.INTERNAL_ERROR, errors = null } = {}) => {
  const response = { success: false, message };
  if (errors) response.errors = errors;
  return res.status(statusCode).json(response);
};

export const getPaginationMeta = (total, page, limit) => ({
  total,
  page: Number(page),
  limit: Number(limit),
  totalPages: Math.ceil(total / limit),
  hasNext: page * limit < total,
  hasPrev: page > 1,
});
