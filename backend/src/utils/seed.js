import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import { Admin } from "../models/index.js";

// Override DNS for reliable SRV resolution on Windows (Node.js DNS bug workaround)
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const existingAdmin = await Admin.findOne({ email: "admin@manamifashions.com" });
    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.email);
      await mongoose.disconnect();
      process.exit(0);
    }

    const admin = await Admin.create({
      name: "Super Admin",
      email: "admin@manamifashions.com",
      password: "Manami@2026",
      role: "super_admin",
    });

    console.log("Admin created successfully:");
    console.log("  Email:    admin@manamifashions.com");
    console.log("  Password: Manami@2026");
    console.log("  Role:     super_admin");
    console.log("  ID:      ", admin._id);

    await mongoose.disconnect();
    console.log("\nDone. Disconnected from MongoDB.");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedAdmin();
