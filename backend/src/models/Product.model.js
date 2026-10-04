import mongoose from "mongoose";
import { PRODUCT_STATUS, PRODUCT_AUDIENCE } from "../constants/index.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [150, "Name cannot exceed 150 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    audience: {
      type: String,
      enum: Object.values(PRODUCT_AUDIENCE),
      required: [true, "Audience is required"],
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    productType: {
      type: String,
      trim: true,
      default: "",
    },
    shortDescription: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Short description cannot exceed 500 characters"],
    },
    description: {
      type: String,
      default: "",
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    materials: [
      {
        type: String,
        trim: true,
      },
    ],
    fabric: {
      type: String,
      trim: true,
      default: "",
    },
    composition: {
      type: String,
      trim: true,
      default: "",
    },
    weight: {
      type: String,
      trim: true,
      default: "",
    },
    availableColors: [
      {
        type: String,
        trim: true,
      },
    ],
    availableSizes: [
      {
        type: String,
        trim: true,
      },
    ],
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        alt: { type: String, default: "" },
      },
    ],
    manufacturingCapabilities: [
      {
        type: String,
        trim: true,
      },
    ],
    certifications: [
      {
        type: String,
        trim: true,
      },
    ],
    minimumOrderQuantity: {
      type: String,
      trim: true,
      default: "",
    },
    productionCapacity: {
      type: String,
      trim: true,
      default: "",
    },
    leadTime: {
      type: String,
      trim: true,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: Object.values(PRODUCT_STATUS),
      default: PRODUCT_STATUS.ACTIVE,
      index: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text", shortDescription: "text" });
productSchema.index({ category: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ audience: 1, status: 1, sortOrder: 1 });
productSchema.index({ productType: 1 });

productSchema.pre("save", function (next) {
  if (this.isModified("name") && !this.slug) {
    const baseSlug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    this.slug = `${baseSlug}-${Date.now()}`;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
