import { Router } from "express";
import {
  getPublicBlogs,
  getPublicBlogBySlug,
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../validations/index.js";
import { createBlogValidation, updateBlogValidation, blogIdValidation } from "../validations/blog.validation.js";

const router = Router();

router.get("/public", getPublicBlogs);
router.get("/public/slug/:slug", getPublicBlogBySlug);

router.use(protect);

router.get("/", authorize("super_admin", "admin"), getBlogs);
router.get("/:id", blogIdValidation, validate, getBlogById);
router.post("/", authorize("super_admin", "admin"), createBlogValidation, validate, createBlog);
router.put("/:id", authorize("super_admin", "admin"), updateBlogValidation, validate, updateBlog);
router.delete("/:id", authorize("super_admin"), blogIdValidation, validate, deleteBlog);

export default router;
