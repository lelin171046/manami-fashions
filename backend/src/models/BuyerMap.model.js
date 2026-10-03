import mongoose from "mongoose";

const statSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, "Stat label cannot exceed 50 characters"],
    },
    value: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Stat value cannot exceed 100 characters"],
    },
  },
  { _id: false }
);

const buyerMapSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Buyer name is required"],
      trim: true,
      maxlength: [100, "Buyer name cannot exceed 100 characters"],
    },
    logo: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      maxlength: [100, "Country cannot exceed 100 characters"],
    },
    partnershipYear: {
      type: String,
      trim: true,
      maxlength: [50, "Partnership year cannot exceed 50 characters"],
      default: "",
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    stats: {
      type: [statSchema],
      default: [],
      validate: {
        validator: function (v) {
          return v.length <= 10;
        },
        message: "Cannot have more than 10 stats",
      },
    },
    orderCategories: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return v.length <= 20;
        },
        message: "Cannot have more than 20 order categories",
      },
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

buyerMapSchema.index({ featured: 1 });
buyerMapSchema.index({ sortOrder: 1 });
buyerMapSchema.index({ country: 1 });
buyerMapSchema.index({ isActive: 1 });

const BuyerMap = mongoose.model("BuyerMap", buyerMapSchema);
export default BuyerMap;