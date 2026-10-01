import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import Category from "../models/Category.model.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const mainCategories = [
  {
    name: "Menswear",
    slug: "mens",
    description: "Premium menswear collection featuring shirts, polos, hoodies, and formal wear crafted with precision.",
    image: {
      url: "https://images.unsplash.com/photo-1617127365699-c47fa864d8bc?w=800&q=80",
      publicId: "",
    },
    sortOrder: 1,
    isActive: true,
  },
  {
    name: "Womenswear",
    slug: "womens",
    description: "Elegant womenswear range including dresses, tops, kurtis, and activewear with contemporary designs.",
    image: {
      url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
      publicId: "",
    },
    sortOrder: 2,
    isActive: true,
  },
  {
    name: "Kids",
    slug: "kids",
    description: "Comfortable and durable kids' clothing including nightwear, casual wear, and school uniforms.",
    image: {
      url: "https://images.unsplash.com/photo-1519238263531-9c3d0f8d2b8c?w=800&q=80",
      publicId: "",
    },
    sortOrder: 3,
    isActive: true,
  },
];

const subCategories = {
  mens: [
    { name: "T-Shirts & Polos", slug: "mens-tshirts-polos", description: "Casual and premium t-shirts and polo shirts for men.", sortOrder: 1 },
    { name: "Shirts", slug: "mens-shirts", description: "Formal and casual shirts in various fabrics and fits.", sortOrder: 2 },
    { name: "Hoodies & Sweatshirts", slug: "mens-hoodies", description: "Comfortable hoodies and sweatshirts for everyday wear.", sortOrder: 3 },
    { name: "Trousers & Jeans", slug: "mens-trousers", description: "Tailored trousers, chinos, and denim jeans.", sortOrder: 4 },
    { name: "Activewear", slug: "mens-activewear", description: "Performance wear for sports and fitness activities.", sortOrder: 5 },
    { name: "Innerwear", slug: "mens-innerwear", description: "Comfortable underwear and base layers.", sortOrder: 6 },
  ],
  womens: [
    { name: "Dresses & Kurtis", slug: "womens-dresses", description: "Elegant dresses and traditional kurtis for women.", sortOrder: 1 },
    { name: "Tops & Blouses", slug: "womens-tops", description: "Stylish tops, blouses, and tunics.", sortOrder: 2 },
    { name: "Leggings & Bottoms", slug: "womens-bottoms", description: "Leggings, trousers, skirts, and shorts.", sortOrder: 3 },
    { name: "Activewear", slug: "womens-activewear", description: "Sports bras, leggings, and performance wear.", sortOrder: 4 },
    { name: "Innerwear & Loungewear", slug: "womens-innerwear", description: "Comfortable innerwear and loungewear.", sortOrder: 5 },
  ],
  kids: [
    { name: "Nightwear", slug: "kids-nightwear", description: "Soft and cozy nightwear sets for children.", sortOrder: 1 },
    { name: "T-Shirts & Tops", slug: "kids-tshirts", description: "Fun and comfortable t-shirts for kids.", sortOrder: 2 },
    { name: "Bottoms", slug: "kids-bottoms", description: "Shorts, leggings, and trousers for children.", sortOrder: 3 },
    { name: "School Uniforms", slug: "kids-uniforms", description: "Durable school uniform sets.", sortOrder: 4 },
    { name: "Ethnic Wear", slug: "kids-ethnic", description: "Traditional wear for festivals and occasions.", sortOrder: 5 },
  ],
};

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Drop existing indexes to avoid duplicate key errors
    try {
      await Category.collection.dropIndexes();
      console.log("Dropped existing indexes");
    } catch (e) {
      console.log("No indexes to drop or error:", e.message);
    }

    for (const mainCat of mainCategories) {
      let category = await Category.findOne({ slug: mainCat.slug });
      if (!category) {
        category = await Category.create(mainCat);
        console.log(`Created main category: ${category.name} (${category._id})`);
      } else {
        console.log(`Main category exists: ${category.name} (${category._id})`);
      }

      const subs = subCategories[mainCat.slug] || [];
      for (const subCat of subs) {
        let sub = await Category.findOne({ slug: subCat.slug });
        if (!sub) {
          sub = await Category.create({
            ...subCat,
            parent: category._id,
            isActive: true,
          });
          console.log(`  Created subcategory: ${sub.name} (${sub._id})`);
        } else {
          console.log(`  Subcategory exists: ${sub.name} (${sub._id})`);
        }
      }
    }

    console.log("\nAll categories seeded successfully!");
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedCategories();