import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
      maxlength: [100, "Brand name cannot exceed 100 characters"],
    },
    logo: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    website: {
      type: String,
      trim: true,
      default: "",
    },
    country: {
      type: String,
      trim: true,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
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

buyerSchema.index({ featured: 1 });
buyerSchema.index({ sortOrder: 1 });

const Buyer = mongoose.model("Buyer", buyerSchema);
export default Buyer;
