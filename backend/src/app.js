import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import { NODE_ENV, FRONTEND_URL } from "./config/env.js";
import { getConnectionStatus } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import certificationRoutes from "./routes/certification.routes.js";
import buyerRoutes from "./routes/buyer.routes.js";
import buyerMapRoutes from "./routes/buyerMap.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";
import operationsRoutes from "./routes/operations.routes.js";
import factoryProfileRoutes from "./routes/factoryProfile.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import careerRoutes from "./routes/career.routes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import adminMessagesRoutes from "./routes/adminMessages.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import jobCircularRoutes from "./routes/jobCircular.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";

const app = express();

// ─── Security ───────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// ─── Body Parsing ───────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// ─── Compression & Logging ──────────────────────────
app.use(compression());
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));

// ─── Health Check ───────────────────────────────────
app.get("/api/health", (_req, res) => {
  const db = getConnectionStatus();
  res.status(db.connected ? 200 : 503).json({
    success: db.connected,
    message: db.connected
      ? "Manami Fashions API is running"
      : "Database not connected",
    environment: NODE_ENV,
    database: {
      connected: db.connected,
      host: db.host,
      name: db.name,
    },
    timestamp: new Date().toISOString(),
  });
});

// ─── Routes ─────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/buyers", buyerRoutes);
app.use("/api/buyer-maps", buyerMapRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/operations", operationsRoutes);
app.use("/api/factory-profile", factoryProfileRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin/messages", adminMessagesRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/job-circulars", jobCircularRoutes);
app.use("/api/analytics", analyticsRoutes);

// ─── Error Handling ─────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;