import Product from "../models/Product.model.js";
import { sendSuccess } from "../helpers/response.js";
import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS } from "../constants/index.js";

export const getProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 12,
      sort = "-createdAt",
      search,
      category,
      status,
      featured,
      fabric,
    } = req.query;

    const query = {};

    if (search) {
      query.$text = { $search: search };
    }
    if (category) query.category = category;
    if (status) query.status = status;
    if (featured !== undefined) query.featured = featured === "true";
    if (fabric) query.fabric = { $regex: fabric, $options: "i" };

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(query)
        .populate("category", "name slug")
        .sort(sort)
        .skip(skip)
        .limit(limitNum),
      Product.countDocuments(query),
    ]);

    return sendSuccess(res, {
      data: products,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext: pageNum * limitNum < total,
        hasPrev: pageNum > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 12,
      sort = "-createdAt",
      search,
      category,
      fabric,
    } = req.query;

    const query = { status: "active" };

    if (search) {
      query.$text = { $search: search };
    }
    if (category) query.category = category;
    if (fabric) query.fabric = { $regex: fabric, $options: "i" };

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(query)
        .populate("category", "name slug")
        .sort(sort)
        .skip(skip)
        .limit(limitNum),
      Product.countDocuments(query),
    ]);

    return sendSuccess(res, {
      data: products,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext: pageNum * limitNum < total,
        hasPrev: pageNum > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProducts = async (req, res, next) => {
  try {
    const { limit = 6 } = req.query;
    const products = await Product.find({ status: "active", featured: true })
      .populate("category", "name slug")
      .sort("-createdAt")
      .limit(Math.min(20, parseInt(limit)));

    return sendSuccess(res, { data: products });
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, status: "active" })
      .populate("category", "name slug");

    if (!product) {
      throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND);
    }

    return sendSuccess(res, { data: product });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name slug");

    if (!product) {
      throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND);
    }

    return sendSuccess(res, { data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { title, category, description, fabric, gsm, sizes, colors, moq, images, featured, status } = req.body;

    if (!title || !category) {
      throw new AppError("Title and category are required", HTTP_STATUS.BAD_REQUEST);
    }

    const existing = await Product.findOne({ title });
    if (existing) {
      throw new AppError("Product with this title already exists", HTTP_STATUS.CONFLICT);
    }

    const product = await Product.create({
      title,
      category,
      description,
      fabric,
      gsm,
      sizes,
      colors,
      moq,
      images,
      featured,
      status,
    });

    await product.populate("category", "name slug");

    return sendSuccess(res, {
      message: "Product created successfully",
      data: product,
      statusCode: HTTP_STATUS.CREATED,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND);
    }

    if (req.body.title && req.body.title !== product.title) {
      const existing = await Product.findOne({ title: req.body.title });
      if (existing) {
        throw new AppError("Product title already exists", HTTP_STATUS.CONFLICT);
      }
    }

    const allowedFields = ["title", "category", "description", "fabric", "gsm", "sizes", "colors", "moq", "images", "featured", "status"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    await product.save();
    await product.populate("category", "name slug");

    return sendSuccess(res, {
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND);
    }

    return sendSuccess(res, { message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const toggleFeatured = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND);
    }

    product.featured = !product.featured;
    await product.save();
    await product.populate("category", "name slug");

    return sendSuccess(res, {
      message: `Product ${product.featured ? "featured" : "unfeatured"}`,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status || !["active", "draft", "archived"].includes(status)) {
      throw new AppError("Valid status required (active, draft, archived)", HTTP_STATUS.BAD_REQUEST);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("category", "name slug");

    if (!product) {
      throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND);
    }

    return sendSuccess(res, {
      message: `Product status updated to ${status}`,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
