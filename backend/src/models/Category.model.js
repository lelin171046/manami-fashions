import mongoose from "mongoose";
import { PRODUCT_AUDIENCE } from "../constants/index.js";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: "",
      maxlength: [300, "Description cannot exceed 300 characters"],
    },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    audience: {
      type: String,
      enum: [...Object.values(PRODUCT_AUDIENCE), ""],
      default: "",
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

categorySchema.index({ parent: 1, sortOrder: 1 });
categorySchema.index({ name: 1, parent: 1 }, { unique: true });
categorySchema.index({ audience: 1, isActive: 1, sortOrder: 1 });

categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
