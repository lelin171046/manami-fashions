import JobCircular from "../models/JobCircular.model.js";
import { sendSuccess } from "../helpers/response.js";
import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS } from "../constants/index.js";

export const getPublicCirculars = async (req, res, next) => {
  try {
    const circulars = await JobCircular.find({ isActive: true }).sort("sortOrder");
    return sendSuccess(res, { data: circulars });
  } catch (error) {
    next(error);
  }
};

export const getCirculars = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, sort = "-createdAt", search } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const [circulars, total] = await Promise.all([
      JobCircular.find(query).sort(sort).skip((pageNum - 1) * limitNum).limit(limitNum),
      JobCircular.countDocuments(query),
    ]);

    return sendSuccess(res, {
      data: circulars,
      meta: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};

export const getCircularById = async (req, res, next) => {
  try {
    const circular = await JobCircular.findById(req.params.id);
    if (!circular) throw new AppError("Job circular not found", HTTP_STATUS.NOT_FOUND);
    return sendSuccess(res, { data: circular });
  } catch (error) {
    next(error);
  }
};

export const createCircular = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      throw new AppError("Title and description are required", HTTP_STATUS.BAD_REQUEST);
    }

    const circular = await JobCircular.create(req.body);
    return sendSuccess(res, { message: "Job circular created", data: circular, statusCode: HTTP_STATUS.CREATED });
  } catch (error) {
    next(error);
  }
};

export const updateCircular = async (req, res, next) => {
  try {
    const circular = await JobCircular.findById(req.params.id);
    if (!circular) throw new AppError("Job circular not found", HTTP_STATUS.NOT_FOUND);

    const allowed = ["title", "description", "requirements", "responsibilities", "location", "type", "department", "salary", "deadline", "isActive", "sortOrder", "vacancies"];
    allowed.forEach((f) => { if (req.body[f] !== undefined) circular[f] = req.body[f]; });
    await circular.save();

    return sendSuccess(res, { message: "Job circular updated", data: circular });
  } catch (error) {
    next(error);
  }
};

export const deleteCircular = async (req, res, next) => {
  try {
    const circular = await JobCircular.findByIdAndDelete(req.params.id);
    if (!circular) throw new AppError("Job circular not found", HTTP_STATUS.NOT_FOUND);
    return sendSuccess(res, { message: "Job circular deleted" });
  } catch (error) {
    next(error);
  }
};
