import Operations from "../models/Operations.model.js";
import { sendSuccess } from "../helpers/response.js";
import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS } from "../constants/index.js";

export const getPublicOperations = async (req, res, next) => {
  try {
    const ops = await Operations.find({ isActive: true }).sort("step");
    return sendSuccess(res, { data: ops });
  } catch (error) {
    next(error);
  }
};

export const getOperations = async (req, res, next) => {
  try {
    const ops = await Operations.find().sort("step");
    return sendSuccess(res, { data: ops });
  } catch (error) {
    next(error);
  }
};

export const getOperationById = async (req, res, next) => {
  try {
    const op = await Operations.findById(req.params.id);
    if (!op) throw new AppError("Operation not found", HTTP_STATUS.NOT_FOUND);
    return sendSuccess(res, { data: op });
  } catch (error) {
    next(error);
  }
};

export const createOperation = async (req, res, next) => {
  try {
    const { title, description, step } = req.body;
    if (!title || !description || !step) {
      throw new AppError("Title, description, and step are required", HTTP_STATUS.BAD_REQUEST);
    }

    const existing = await Operations.findOne({ step });
    if (existing) {
      throw new AppError(`Step ${step} already exists`, HTTP_STATUS.CONFLICT);
    }

    const op = await Operations.create(req.body);
    return sendSuccess(res, { message: "Operation created", data: op, statusCode: HTTP_STATUS.CREATED });
  } catch (error) {
    next(error);
  }
};

export const updateOperation = async (req, res, next) => {
  try {
    const op = await Operations.findById(req.params.id);
    if (!op) throw new AppError("Operation not found", HTTP_STATUS.NOT_FOUND);

    if (req.body.step && req.body.step !== op.step) {
      const existing = await Operations.findOne({ step: req.body.step });
      if (existing) throw new AppError(`Step ${req.body.step} already exists`, HTTP_STATUS.CONFLICT);
    }

    const allowed = ["title", "description", "details", "step", "icon", "image", "isActive"];
    allowed.forEach((f) => { if (req.body[f] !== undefined) op[f] = req.body[f]; });
    await op.save();

    return sendSuccess(res, { message: "Operation updated", data: op });
  } catch (error) {
    next(error);
  }
};

export const deleteOperation = async (req, res, next) => {
  try {
    const op = await Operations.findByIdAndDelete(req.params.id);
    if (!op) throw new AppError("Operation not found", HTTP_STATUS.NOT_FOUND);
    return sendSuccess(res, { message: "Operation deleted" });
  } catch (error) {
    next(error);
  }
};
