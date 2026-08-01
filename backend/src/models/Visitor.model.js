import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    path: { type: String, default: "/", trim: true },
    country: { type: String, default: "Unknown", trim: true },
    countryCode: { type: String, default: "XX", uppercase: true, trim: true },
    ip: { type: String, default: "" },
    referrer: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    device: {
      type: String,
      enum: ["desktop", "mobile", "tablet"],
      default: "desktop",
    },
    screenWidth: { type: Number, default: 0 },
    visitedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

visitorSchema.index({ visitedAt: -1 });
visitorSchema.index({ countryCode: 1 });
visitorSchema.index({ path: 1 });

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;
