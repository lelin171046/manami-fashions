import mongoose from "mongoose";
import Product from "../models/Product.model.js";
import { PRODUCT_STATUS, PRODUCT_AUDIENCE } from "../constants/index.js";

const migrateProducts = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/manami-fashions");
    console.log("Connected to database");

    // Find products that don't have the new required fields
    const products = await Product.find({
      $or: [
        { audience: { $exists: false } },
        { audience: null },
        { audience: "" },
        { name: { $exists: false } },
        { name: null },
        { name: "" },
      ]
    });

    console.log(`Found ${products.length} products to migrate`);

    let updated = 0;
    for (const product of products) {
      const updates = {};

      // Set default audience based on category or default to men
      if (!product.audience) {
        updates.audience = PRODUCT_AUDIENCE.MEN;
      }

      // Migrate title to name if title exists but name doesn't
      if (product.title && !product.name) {
        updates.name = product.title;
      } else if (!product.name) {
        updates.name = "Unnamed Product";
      }

      // Generate slug if missing
      if (!product.slug && updates.name) {
        const baseSlug = updates.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        updates.slug = `${baseSlug}-${Date.now()}`;
      }

      // Set default status if missing
      if (!product.status) {
        updates.status = PRODUCT_STATUS.ACTIVE;
      }

      // Set default sortOrder if missing
      if (product.sortOrder === undefined || product.sortOrder === null) {
        updates.sortOrder = 0;
      }

      // Set default featured if missing
      if (product.featured === undefined || product.featured === null) {
        updates.featured = false;
      }

      // Migrate old fields
      if (product.sizes && !product.availableSizes) {
        updates.availableSizes = product.sizes;
      }
      if (product.colors && !product.availableColors) {
        updates.availableColors = product.colors.map(c => c.name).filter(Boolean);
      }
      if (product.moq && !product.minimumOrderQuantity) {
        updates.minimumOrderQuantity = product.moq;
      }
      if (product.fabric && !product.weight) {
        updates.weight = product.fabric; // Not ideal but fabric info
      }
      if (product.gsm && !product.weight) {
        updates.weight = product.gsm;
      }

      // Migrate images to include alt text
      if (product.images && product.images.length > 0) {
        updates.images = product.images.map(img => ({
          url: img.url,
          publicId: img.publicId,
          alt: img.alt || product.name || "Product image",
        }));
      }

      if (Object.keys(updates).length > 0) {
        await Product.findByIdAndUpdate(product._id, { $set: updates });
        console.log(`Migrated: ${updates.name || product.title || product._id}`);
        updated++;
      }
    }

    console.log(`\nMigration complete! Updated: ${updated} products`);
    process.exit(0);
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  }
};

migrateProducts();