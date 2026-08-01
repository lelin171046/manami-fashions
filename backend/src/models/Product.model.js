import mongoose from "mongoose";
import { PRODUCT_CATEGORIES, PRODUCT_STATUS } from "../constants/index.js";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      default: "",
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    fabric: {
      type: String,
      trim: true,
      default: "",
    },
    gsm: {
      type: String,
      trim: true,
      default: "",
    },
    sizes: [
      {
        type: String,
        trim: true,
      },
    ],
    colors: [
      {
        name: { type: String, trim: true },
        hex: { type: String, trim: true },
      },
    ],
    moq: {
      type: String,
      trim: true,
      default: "",
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        alt: { type: String, default: "" },
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: Object.values(PRODUCT_STATUS),
      default: PRODUCT_STATUS.ACTIVE,
    },
  },
  { timestamps: true }
);

productSchema.index({ title: "text", description: "text" });
productSchema.index({ category: 1 });
productSchema.index({ status: 1 });
productSchema.index({ featured: 1 });

productSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + `-${Date.now()}`;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
