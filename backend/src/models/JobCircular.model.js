import mongoose from "mongoose";

const jobCircularSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    requirements: [{ type: String, trim: true }],
    responsibilities: [{ type: String, trim: true }],
    location: {
      type: String,
      trim: true,
      default: "",
    },
    type: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      default: "full-time",
    },
    department: {
      type: String,
      trim: true,
      default: "",
    },
    vacancies: {
      type: Number,
      default: 1,
      min: 1,
    },
    salary: {
      type: String,
      trim: true,
      default: "",
    },
    deadline: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

jobCircularSchema.index({ isActive: 1, sortOrder: 1 });

const JobCircular = mongoose.model("JobCircular", jobCircularSchema);
export default JobCircular;
