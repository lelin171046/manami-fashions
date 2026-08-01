import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS } from "../constants/index.js";

export const createFactory = (Model, populateOptions = null) => {
  return async (req, res, next) => {
    try {
      const doc = await Model.create(req.body);
      let query = Model.findById(doc._id);
      if (populateOptions) {
        populateOptions.forEach((opt) => query.populate(opt));
      }
      const result = await query;

      return res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: `${Model.modelName} created successfully`,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
};

export const getAllFactory = (Model, populateOptions = null, searchableFields = []) => {
  return async (req, res, next) => {
    try {
      const { page = 1, limit = 12, sort = "-createdAt", search, ...filters } = req.query;

      const query = {};

      if (search && searchableFields.length > 0) {
        query.$or = searchableFields.map((field) => ({
          [field]: { $regex: search, $options: "i" },
        }));
      }

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "" && value !== null) {
          query[key] = value;
        }
      });

      const pageNum = Math.max(1, parseInt(page));
      const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
      const skip = (pageNum - 1) * limitNum;

      const [docs, total] = await Promise.all([
        (() => {
          let q = Model.find(query).sort(sort).skip(skip).limit(limitNum);
          if (populateOptions) {
            populateOptions.forEach((opt) => q.populate(opt));
          }
          return q;
        })(),
        Model.countDocuments(query),
      ]);

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: `${Model.modelName}s fetched successfully`,
        data: docs,
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
};

export const getOneFactory = (Model, populateOptions = null) => {
  return async (req, res, next) => {
    try {
      let query = Model.findById(req.params.id);
      if (populateOptions) {
        populateOptions.forEach((opt) => query.populate(opt));
      }

      const doc = await query;
      if (!doc) {
        throw new AppError(`${Model.modelName} not found`, HTTP_STATUS.NOT_FOUND);
      }

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        data: doc,
      });
    } catch (error) {
      next(error);
    }
  };
};

export const updateFactory = (Model, populateOptions = null) => {
  return async (req, res, next) => {
    try {
      let doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!doc) {
        throw new AppError(`${Model.modelName} not found`, HTTP_STATUS.NOT_FOUND);
      }

      if (populateOptions) {
        let query = Model.findById(doc._id);
        populateOptions.forEach((opt) => query.populate(opt));
        doc = await query;
      }

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: `${Model.modelName} updated successfully`,
        data: doc,
      });
    } catch (error) {
      next(error);
    }
  };
};

export const deleteFactory = (Model) => {
  return async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) {
        throw new AppError(`${Model.modelName} not found`, HTTP_STATUS.NOT_FOUND);
      }

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: `${Model.modelName} deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  };
};
