import mongoose from "mongoose";
import { GALLERY_CATEGORIES } from "../constants/index.js";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    image: {
      url: { type: String, required: [true, "Image URL is required"] },
      publicId: { type: String, default: "" },
    },
    category: {
      type: String,
      enum: Object.values(GALLERY_CATEGORIES),
      default: GALLERY_CATEGORIES.FACTORY,
    },
    description: {
      type: String,
      default: "",
      maxlength: [500, "Description cannot exceed 500 characters"],
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

gallerySchema.index({ category: 1 });
gallerySchema.index({ sortOrder: 1 });

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;
