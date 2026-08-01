import mongoose from "mongoose";
import { APPLICATION_STATUS, ALLOWED_RESUME_TYPES, MAX_RESUME_SIZE } from "../constants/index.js";

const jobApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
    },
    resume: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
      originalName: { type: String, default: "" },
      mimeType: { type: String, default: "" },
      size: { type: Number, default: 0 },
    },
    coverLetter: {
      type: String,
      default: "",
      maxlength: [3000, "Cover letter cannot exceed 3000 characters"],
    },
    experience: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: Object.values(APPLICATION_STATUS),
      default: APPLICATION_STATUS.PENDING,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

jobApplicationSchema.index({ status: 1 });
jobApplicationSchema.index({ createdAt: -1 });
jobApplicationSchema.index({ email: 1 });

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
export default JobApplication;
