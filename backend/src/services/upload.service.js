import cloudinary from "../config/cloudinary.js";
import { MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES, MAX_RESUME_SIZE, ALLOWED_RESUME_TYPES } from "../constants/index.js";

export const uploadImage = async (file) => {
  if (!file) throw new Error("No file provided");
  if (file.size > MAX_IMAGE_SIZE) throw new Error("Image exceeds 5MB limit");
  if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) throw new Error("Invalid image type (JPEG, PNG, WebP, GIF only)");

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "manami-fashions/images",
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(file.buffer);
  });

  return { url: result.secure_url, publicId: result.public_id };
};

export const uploadResume = async (file) => {
  if (!file) throw new Error("No file provided");
  if (file.size > MAX_RESUME_SIZE) throw new Error("Resume exceeds 50MB limit");
  if (!ALLOWED_RESUME_TYPES.includes(file.mimetype)) throw new Error("Invalid file type (PDF, DOC, DOCX only)");

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "manami-fashions/resumes",
        resource_type: "raw",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(file.buffer);
  });

  return { url: result.secure_url, publicId: result.public_id, originalName: file.originalname };
};

export const uploadMultipleImages = async (files, limit = 10) => {
  if (!files || files.length === 0) throw new Error("No files provided");
  if (files.length > limit) throw new Error(`Maximum ${limit} files allowed`);

  const results = await Promise.all(files.map((file) => uploadImage(file)));
  return results;
};

export const deleteFile = async (publicId, resourceType = "image") => {
  if (!publicId) throw new Error("No publicId provided");
  const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  return result;
};

export const deleteMultipleFiles = async (publicIds, resourceType = "image") => {
  if (!publicIds || publicIds.length === 0) return;
  await Promise.all(publicIds.map((id) => deleteFile(id, resourceType)));
};
