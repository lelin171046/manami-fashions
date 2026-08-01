import mongoose from "mongoose";

const operationsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    details: [
      {
        type: String,
        trim: true,
      },
    ],
    step: {
      type: Number,
      required: [true, "Step number is required"],
      min: [1, "Step must be at least 1"],
      max: [20, "Step cannot exceed 20"],
    },
    icon: {
      type: String,
      default: "",
    },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

operationsSchema.index({ step: 1 });
operationsSchema.index({ isActive: 1 });

const Operations = mongoose.model("Operations", operationsSchema);
export default Operations;
