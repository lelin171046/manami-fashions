import Category from "../models/Category.model.js";
import Product from "../models/Product.model.js";
import { sendSuccess } from "../helpers/response.js";
import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS } from "../constants/index.js";

export const getPublicCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort("sortOrder");

    return sendSuccess(res, { data: categories });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, sort = "sortOrder", search } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));

    const query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const [categories, total] = await Promise.all([
      Category.find(query).sort(sort).skip((pageNum - 1) * limitNum).limit(limitNum),
      Category.countDocuments(query),
    ]);

    return sendSuccess(res, {
      data: categories,
      meta: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);

    return sendSuccess(res, { data: category });
  } catch (error) {
    next(error);
  }
};

export const getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true });
    if (!category) throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);

    return sendSuccess(res, { data: category });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description, image, sortOrder } = req.body;

    if (!name) throw new AppError("Category name is required", HTTP_STATUS.BAD_REQUEST);

    const existing = await Category.findOne({ name });
    if (existing) throw new AppError("Category already exists", HTTP_STATUS.CONFLICT);

    const category = await Category.create({ name, description, image, sortOrder });

    return sendSuccess(res, {
      message: "Category created successfully",
      data: category,
      statusCode: HTTP_STATUS.CREATED,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);

    if (req.body.name && req.body.name !== category.name) {
      const existing = await Category.findOne({ name: req.body.name });
      if (existing) throw new AppError("Category name already exists", HTTP_STATUS.CONFLICT);
    }

    const allowed = ["name", "description", "image", "sortOrder", "isActive"];
    allowed.forEach((f) => { if (req.body[f] !== undefined) category[f] = req.body[f]; });

    await category.save();

    return sendSuccess(res, { message: "Category updated successfully", data: category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);

    const productCount = await Product.countDocuments({ category: category._id });
    if (productCount > 0) {
      throw new AppError(
        `Cannot delete category with ${productCount} product(s). Remove or reassign products first.`,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    await Category.findByIdAndDelete(category._id);

    return sendSuccess(res, { message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};
