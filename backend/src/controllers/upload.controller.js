import { sendSuccess } from "../helpers/response.js";
import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS } from "../constants/index.js";
import { uploadImage, uploadMultipleImages, uploadResume, deleteFile } from "../services/upload.service.js";

export const uploadSingleImage = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError("No file uploaded", HTTP_STATUS.BAD_REQUEST);

    const result = await uploadImage(req.file);
    return sendSuccess(res, { message: "Image uploaded", data: result, statusCode: HTTP_STATUS.CREATED });
  } catch (error) {
    next(error);
  }
};

export const uploadMultipleImageFiles = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) throw new AppError("No files uploaded", HTTP_STATUS.BAD_REQUEST);

    const results = await uploadMultipleImages(req.files);
    return sendSuccess(res, { message: "Images uploaded", data: results, statusCode: HTTP_STATUS.CREATED });
  } catch (error) {
    next(error);
  }
};

export const uploadResumeFile = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError("No file uploaded", HTTP_STATUS.BAD_REQUEST);

    const result = await uploadResume(req.file);
    return sendSuccess(res, { message: "Resume uploaded", data: result, statusCode: HTTP_STATUS.CREATED });
  } catch (error) {
    next(error);
  }
};

export const deleteUpload = async (req, res, next) => {
  try {
    const { publicId, resourceType } = req.body;
    if (!publicId) throw new AppError("publicId is required", HTTP_STATUS.BAD_REQUEST);

    await deleteFile(publicId, resourceType || "image");
    return sendSuccess(res, { message: "File deleted" });
  } catch (error) {
    next(error);
  }
};
