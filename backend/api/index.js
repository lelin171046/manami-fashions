import app from "../src/app.js";
import connectDB from "../src/config/db.js";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
  return app(req, res);
}
