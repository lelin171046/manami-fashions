import Blog from "../models/Blog.model.js";
import { sendSuccess } from "../helpers/response.js";
import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS } from "../constants/index.js";

export const getPublicBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, sort = "-publishedAt", search, tag } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const query = { isPublished: true };

    if (search) query.$text = { $search: search };
    if (tag) query.tags = tag;

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .populate("author", "name")
        .sort(sort)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Blog.countDocuments(query),
    ]);

    return sendSuccess(res, {
      data: blogs,
      meta: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true })
      .populate("author", "name");
    if (!blog) throw new AppError("Blog not found", HTTP_STATUS.NOT_FOUND);

    blog.views += 1;
    await blog.save();

    return sendSuccess(res, { data: blog });
  } catch (error) {
    next(error);
  }
};

export const getBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, sort = "-createdAt", search, isPublished } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const query = {};
    if (search) query.$text = { $search: search };
    if (isPublished !== undefined) query.isPublished = isPublished === "true";

    const [blogs, total] = await Promise.all([
      Blog.find(query).populate("author", "name").sort(sort).skip((pageNum - 1) * limitNum).limit(limitNum),
      Blog.countDocuments(query),
    ]);

    return sendSuccess(res, {
      data: blogs,
      meta: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if (!blog) throw new AppError("Blog not found", HTTP_STATUS.NOT_FOUND);
    return sendSuccess(res, { data: blog });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) throw new AppError("Title and content are required", HTTP_STATUS.BAD_REQUEST);

    const blog = await Blog.create({ ...req.body, author: req.admin._id });
    await blog.populate("author", "name");

    return sendSuccess(res, { message: "Blog created", data: blog, statusCode: HTTP_STATUS.CREATED });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) throw new AppError("Blog not found", HTTP_STATUS.NOT_FOUND);

    if (req.body.isPublished && !blog.isPublished) {
      blog.publishedAt = new Date();
    }

    const allowed = ["title", "content", "excerpt", "coverImage", "tags", "isPublished"];
    allowed.forEach((f) => { if (req.body[f] !== undefined) blog[f] = req.body[f]; });
    await blog.save();
    await blog.populate("author", "name");

    return sendSuccess(res, { message: "Blog updated", data: blog });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) throw new AppError("Blog not found", HTTP_STATUS.NOT_FOUND);
    return sendSuccess(res, { message: "Blog deleted" });
  } catch (error) {
    next(error);
  }
};
