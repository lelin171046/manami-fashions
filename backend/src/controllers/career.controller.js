import JobApplication from "../models/JobApplication.model.js";
import { uploadResume, deleteFile } from "../services/upload.service.js";
import { sendSuccess } from "../helpers/response.js";
import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS, APPLICATION_STATUS } from "../constants/index.js";
import { sendApplicationNotification } from "../services/email.service.js";

export const submitApplication = async (req, res, next) => {
  try {
    const { name, email, phone, position } = req.body;
    if (!name || !email || !phone || !position) {
      throw new AppError("Name, email, phone, and position are required", HTTP_STATUS.BAD_REQUEST);
    }

    let resumeData = {};
    if (req.file) {
      resumeData = await uploadResume(req.file);
    }

    const application = await JobApplication.create({
      ...req.body,
      resume: resumeData.url ? {
        url: resumeData.url,
        publicId: resumeData.publicId,
        originalName: resumeData.originalName || req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
      } : undefined,
    });

    sendApplicationNotification(application).catch(() => {});

    return sendSuccess(res, {
      message: "Application submitted successfully",
      data: application,
      statusCode: HTTP_STATUS.CREATED,
    });
  } catch (error) {
    next(error);
  }
};

export const getApplications = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, sort = "-createdAt", status, search } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
      ];
    }

    const [applications, total] = await Promise.all([
      JobApplication.find(query).sort(sort).skip((pageNum - 1) * limitNum).limit(limitNum),
      JobApplication.countDocuments(query),
    ]);

    return sendSuccess(res, {
      data: applications,
      meta: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (req, res, next) => {
  try {
    const app = await JobApplication.findById(req.params.id);
    if (!app) throw new AppError("Application not found", HTTP_STATUS.NOT_FOUND);
    return sendSuccess(res, { data: app });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    if (!status || !Object.values(APPLICATION_STATUS).includes(status)) {
      throw new AppError("Valid status required", HTTP_STATUS.BAD_REQUEST);
    }

    const app = await JobApplication.findById(req.params.id);
    if (!app) throw new AppError("Application not found", HTTP_STATUS.NOT_FOUND);

    app.status = status;
    if (notes !== undefined) app.notes = notes;
    await app.save();

    return sendSuccess(res, { message: "Status updated", data: app });
  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    const app = await JobApplication.findById(req.params.id);
    if (!app) throw new AppError("Application not found", HTTP_STATUS.NOT_FOUND);

    if (app.resume?.publicId) {
      await deleteFile(app.resume.publicId, "raw");
    }
    await JobApplication.findByIdAndDelete(req.params.id);

    return sendSuccess(res, { message: "Application deleted" });
  } catch (error) {
    next(error);
  }
};
