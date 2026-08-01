import Buyer from "../models/Buyer.model.js";
import { sendSuccess } from "../helpers/response.js";
import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS } from "../constants/index.js";

export const getPublicBuyers = async (req, res, next) => {
  try {
    const { featured } = req.query;
    const query = { isActive: true };
    if (featured !== undefined) query.featured = featured === "true";

    const buyers = await Buyer.find(query).sort("sortOrder");
    return sendSuccess(res, { data: buyers });
  } catch (error) {
    next(error);
  }
};

export const getBuyers = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, sort = "sortOrder", search, featured } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));

    const query = {};
    if (search) query.brandName = { $regex: search, $options: "i" };
    if (featured !== undefined) query.featured = featured === "true";

    const [buyers, total] = await Promise.all([
      Buyer.find(query).sort(sort).skip((pageNum - 1) * limitNum).limit(limitNum),
      Buyer.countDocuments(query),
    ]);

    return sendSuccess(res, {
      data: buyers,
      meta: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};

export const getBuyerById = async (req, res, next) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) throw new AppError("Buyer not found", HTTP_STATUS.NOT_FOUND);
    return sendSuccess(res, { data: buyer });
  } catch (error) {
    next(error);
  }
};

export const createBuyer = async (req, res, next) => {
  try {
    if (!req.body.brandName) throw new AppError("Brand name is required", HTTP_STATUS.BAD_REQUEST);

    const buyer = await Buyer.create(req.body);
    return sendSuccess(res, { message: "Buyer created", data: buyer, statusCode: HTTP_STATUS.CREATED });
  } catch (error) {
    next(error);
  }
};

export const updateBuyer = async (req, res, next) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) throw new AppError("Buyer not found", HTTP_STATUS.NOT_FOUND);

    const allowed = ["brandName", "logo", "website", "country", "featured", "sortOrder", "isActive"];
    allowed.forEach((f) => { if (req.body[f] !== undefined) buyer[f] = req.body[f]; });
    await buyer.save();

    return sendSuccess(res, { message: "Buyer updated", data: buyer });
  } catch (error) {
    next(error);
  }
};

export const deleteBuyer = async (req, res, next) => {
  try {
    const buyer = await Buyer.findByIdAndDelete(req.params.id);
    if (!buyer) throw new AppError("Buyer not found", HTTP_STATUS.NOT_FOUND);
    return sendSuccess(res, { message: "Buyer deleted" });
  } catch (error) {
    next(error);
  }
};

export const toggleFeatured = async (req, res, next) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) throw new AppError("Buyer not found", HTTP_STATUS.NOT_FOUND);

    buyer.featured = !buyer.featured;
    await buyer.save();

    return sendSuccess(res, { message: `Buyer ${buyer.featured ? "featured" : "unfeatured"}`, data: buyer });
  } catch (error) {
    next(error);
  }
};
