import Gallery from "../models/Gallery.model.js";
import { sendSuccess } from "../helpers/response.js";
import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS, GALLERY_CATEGORIES } from "../constants/index.js";

export const getPublicGallery = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = { isActive: true };
    if (category && Object.values(GALLERY_CATEGORIES).includes(category)) {
      query.category = category;
    }
    const items = await Gallery.find(query).sort("sortOrder");
    return sendSuccess(res, { data: items });
  } catch (error) {
    next(error);
  }
};

export const getGallery = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, sort = "sortOrder", category, search } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));

    const query = {};
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: "i" };

    const [items, total] = await Promise.all([
      Gallery.find(query).sort(sort).skip((pageNum - 1) * limitNum).limit(limitNum),
      Gallery.countDocuments(query),
    ]);

    return sendSuccess(res, {
      data: items,
      meta: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};

export const getGalleryById = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) throw new AppError("Gallery item not found", HTTP_STATUS.NOT_FOUND);
    return sendSuccess(res, { data: item });
  } catch (error) {
    next(error);
  }
};

export const createGalleryItem = async (req, res, next) => {
  try {
    const { title, image, category } = req.body;
    if (!title || !image) throw new AppError("Title and image are required", HTTP_STATUS.BAD_REQUEST);
    if (category && !Object.values(GALLERY_CATEGORIES).includes(category)) {
      throw new AppError("Invalid gallery category", HTTP_STATUS.BAD_REQUEST);
    }

    const item = await Gallery.create(req.body);
    return sendSuccess(res, { message: "Gallery item created", data: item, statusCode: HTTP_STATUS.CREATED });
  } catch (error) {
    next(error);
  }
};

export const updateGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) throw new AppError("Gallery item not found", HTTP_STATUS.NOT_FOUND);

    if (req.body.category && !Object.values(GALLERY_CATEGORIES).includes(req.body.category)) {
      throw new AppError("Invalid gallery category", HTTP_STATUS.BAD_REQUEST);
    }

    const allowed = ["title", "image", "category", "description", "sortOrder", "isActive"];
    allowed.forEach((f) => { if (req.body[f] !== undefined) item[f] = req.body[f]; });
    await item.save();

    return sendSuccess(res, { message: "Gallery item updated", data: item });
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) throw new AppError("Gallery item not found", HTTP_STATUS.NOT_FOUND);
    return sendSuccess(res, { message: "Gallery item deleted" });
  } catch (error) {
    next(error);
  }
};
