import { Admin } from "../models/index.js";
import { sendSuccess } from "../helpers/response.js";
import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS } from "../constants/index.js";

export const getAllAdmins = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, sort = "-createdAt" } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [admins, total] = await Promise.all([
      Admin.find().sort(sort).skip(skip).limit(limitNum),
      Admin.countDocuments(),
    ]);

    return sendSuccess(res, {
      data: admins,
      meta: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminById = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) throw new AppError("Admin not found", HTTP_STATUS.NOT_FOUND);

    return sendSuccess(res, { data: admin });
  } catch (error) {
    next(error);
  }
};

export const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      throw new AppError("Name, email and password are required", HTTP_STATUS.BAD_REQUEST);
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      throw new AppError("Admin with this email already exists", HTTP_STATUS.CONFLICT);
    }

    const admin = await Admin.create({ name, email, password, role });

    return sendSuccess(res, {
      message: "Admin created successfully",
      data: admin,
      statusCode: HTTP_STATUS.CREATED,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdmin = async (req, res, next) => {
  try {
    const { name, email, role, isActive } = req.body;

    const admin = await Admin.findById(req.params.id);
    if (!admin) throw new AppError("Admin not found", HTTP_STATUS.NOT_FOUND);

    if (email && email !== admin.email) {
      const existing = await Admin.findOne({ email });
      if (existing) {
        throw new AppError("Email already in use", HTTP_STATUS.CONFLICT);
      }
    }

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (role) admin.role = role;
    if (typeof isActive === "boolean") admin.isActive = isActive;

    await admin.save();

    return sendSuccess(res, {
      message: "Admin updated successfully",
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) throw new AppError("Admin not found", HTTP_STATUS.NOT_FOUND);

    if (admin.role === "super_admin") {
      const superAdminCount = await Admin.countDocuments({ role: "super_admin" });
      if (superAdminCount <= 1) {
        throw new AppError("Cannot delete the last super admin", HTTP_STATUS.FORBIDDEN);
      }
    }

    await Admin.findByIdAndDelete(req.params.id);

    return sendSuccess(res, { message: "Admin deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProducts,
      activeProducts,
      totalCategories,
      totalCertifications,
      totalBuyers,
      totalGallery,
      totalOperations,
      totalContacts,
      pendingContacts,
      unreadContacts,
      totalApplications,
      pendingApplications,
      totalSubscribers,
      totalAdmins,
      totalBlogs,
    ] = await Promise.all([
      import("../models/Product.model.js").then((m) => m.default.countDocuments()),
      import("../models/Product.model.js").then((m) => m.default.countDocuments({ status: "active" })),
      import("../models/Category.model.js").then((m) => m.default.countDocuments()),
      import("../models/Certification.model.js").then((m) => m.default.countDocuments()),
      import("../models/Buyer.model.js").then((m) => m.default.countDocuments()),
      import("../models/Gallery.model.js").then((m) => m.default.countDocuments()),
      import("../models/Operations.model.js").then((m) => m.default.countDocuments()),
      import("../models/ContactMessage.model.js").then((m) => m.default.countDocuments()),
      import("../models/ContactMessage.model.js").then((m) => m.default.countDocuments({ status: "pending" })),
      import("../models/ContactMessage.model.js").then((m) => m.default.countDocuments({ isRead: false })),
      import("../models/JobApplication.model.js").then((m) => m.default.countDocuments()),
      import("../models/JobApplication.model.js").then((m) => m.default.countDocuments({ status: "pending" })),
      import("../models/Newsletter.model.js").then((m) => m.default.countDocuments({ isSubscribed: true })),
      Admin.countDocuments(),
      import("../models/Blog.model.js").then((m) => m.default.countDocuments()),
    ]);

    const [
      recentContacts,
      recentApplications,
      recentProducts,
    ] = await Promise.all([
      import("../models/ContactMessage.model.js").then((m) => m.default.find().sort("-createdAt").limit(5)),
      import("../models/JobApplication.model.js").then((m) => m.default.find().sort("-createdAt").limit(5)),
      import("../models/Product.model.js").then((m) => m.default.find().sort("-createdAt").limit(5).populate("category")),
    ]);

    return sendSuccess(res, {
      data: {
        counts: {
          products: totalProducts,
          activeProducts,
          categories: totalCategories,
          certifications: totalCertifications,
          buyers: totalBuyers,
          gallery: totalGallery,
          operations: totalOperations,
          contacts: totalContacts,
          pendingContacts,
          unreadContacts,
          applications: totalApplications,
          pendingApplications,
          subscribers: totalSubscribers,
          admins: totalAdmins,
          blogs: totalBlogs,
        },
        recent: {
          contacts: recentContacts,
          applications: recentApplications,
          products: recentProducts,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
