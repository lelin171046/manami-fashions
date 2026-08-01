import mongoose from "mongoose";
import { CERTIFICATION_TYPES } from "../constants/index.js";

const certificationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Certification name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      default: "",
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    issuer: {
      type: String,
      trim: true,
      default: "",
    },
    type: {
      type: String,
      enum: Object.values(CERTIFICATION_TYPES),
      required: [true, "Certification type is required"],
    },
    logo: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    issueDate: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
    credentialId: {
      type: String,
      trim: true,
      default: "",
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
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

certificationSchema.index({ type: 1 });
certificationSchema.index({ sortOrder: 1 });

const Certification = mongoose.model("Certification", certificationSchema);
export default Certification;
