import Certification from "../models/Certification.model.js";
import { sendSuccess } from "../helpers/response.js";
import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS, CERTIFICATION_TYPES } from "../constants/index.js";

export const getPublicCertifications = async (req, res, next) => {
  try {
    const { type } = req.query;
    const query = { isActive: true };
    if (type && Object.values(CERTIFICATION_TYPES).includes(type)) {
      query.type = type;
    }
    const certifications = await Certification.find(query).sort("sortOrder");
    return sendSuccess(res, { data: certifications });
  } catch (error) {
    next(error);
  }
};

export const getCertifications = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, sort = "sortOrder", type, search } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));

    const query = {};
    if (type) query.type = type;
    if (search) query.name = { $regex: search, $options: "i" };

    const [certifications, total] = await Promise.all([
      Certification.find(query).sort(sort).skip((pageNum - 1) * limitNum).limit(limitNum),
      Certification.countDocuments(query),
    ]);

    return sendSuccess(res, {
      data: certifications,
      meta: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};

export const getCertificationById = async (req, res, next) => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (!cert) throw new AppError("Certification not found", HTTP_STATUS.NOT_FOUND);
    return sendSuccess(res, { data: cert });
  } catch (error) {
    next(error);
  }
};

export const createCertification = async (req, res, next) => {
  try {
    const { name, type } = req.body;
    if (!name || !type) {
      throw new AppError("Name and type are required", HTTP_STATUS.BAD_REQUEST);
    }
    if (!Object.values(CERTIFICATION_TYPES).includes(type)) {
      throw new AppError("Invalid certification type", HTTP_STATUS.BAD_REQUEST);
    }

    const cert = await Certification.create(req.body);
    return sendSuccess(res, { message: "Certification created", data: cert, statusCode: HTTP_STATUS.CREATED });
  } catch (error) {
    next(error);
  }
};

export const updateCertification = async (req, res, next) => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (!cert) throw new AppError("Certification not found", HTTP_STATUS.NOT_FOUND);

    if (req.body.type && !Object.values(CERTIFICATION_TYPES).includes(req.body.type)) {
      throw new AppError("Invalid certification type", HTTP_STATUS.BAD_REQUEST);
    }

    const allowed = ["name", "description", "issuer", "type", "logo", "issueDate", "expiryDate", "credentialId", "skills", "sortOrder", "isActive"];
    allowed.forEach((f) => { if (req.body[f] !== undefined) cert[f] = req.body[f]; });
    await cert.save();

    return sendSuccess(res, { message: "Certification updated", data: cert });
  } catch (error) {
    next(error);
  }
};

export const deleteCertification = async (req, res, next) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert) throw new AppError("Certification not found", HTTP_STATUS.NOT_FOUND);
    return sendSuccess(res, { message: "Certification deleted" });
  } catch (error) {
    next(error);
  }
};
