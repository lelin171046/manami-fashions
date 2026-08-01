import mongoose from "mongoose";
import dns from "dns";

// Override DNS for reliable SRV resolution on Windows (Node.js DNS bug workaround)
dns.setServers(["8.8.8.8", "1.1.1.1"]);

let isConnected = false;

const srvToStandard = (uri) => {
  let u = uri.replace("mongodb+srv://", "mongodb://");
  if (!/@.*:\d+/.test(u)) {
    u = u.replace(/@([^/:?]+)/, "@$1:27017");
  }
  const params = new URLSearchParams(u.split("?")[1] || "");
  if (!params.has("ssl")) u += (u.includes("?") ? "&" : "?") + "ssl=true";
  if (!params.has("authSource")) u += "&authSource=admin";
  if (!params.has("retryWrites")) u += "&retryWrites=true";
  return u;
};

const isSrvError = (err) =>
  err.message?.toLowerCase().includes("srv") ||
  err.message?.toLowerCase().includes("dns") ||
  err.code === "ECONNREFUSED" ||
  err.code === "ENOTFOUND";

const connectDB = async (retried = false) => {
  if (isConnected) {
    console.log("⚡ Using existing MongoDB connection");
    return;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined in environment variables");

  try {
    const conn = await mongoose.connect(uri);
    isConnected = true;
    console.log(`✅ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    isConnected = false;

    if (!retried && uri.startsWith("mongodb+srv://") && isSrvError(error)) {
      const fallbackUri = srvToStandard(uri);
      console.warn("⚠️ DNS SRV lookup failed — retrying with standard connection");
      console.log(`   Fallback URI: ${fallbackUri.replace(/\/\/[^:]+:[^@]+@/, "//****:****@")}`);
      await connectDB(true);
      return;
    }

    console.error(`❌ MongoDB connection error: ${error.message}`);
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  isConnected = false;
  console.warn("⚠️ MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  isConnected = false;
  console.error("🔴 MongoDB error:", err.message);
});

export const getConnectionStatus = () => ({
  connected: isConnected,
  readyState: mongoose.connection.readyState,
  host: mongoose.connection.host,
  name: mongoose.connection.name,
});

export default connectDB;