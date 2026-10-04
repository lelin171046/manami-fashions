import mongoose from "mongoose";
import Product from "../models/Product.model.js";
import Category from "../models/Category.model.js";
import { PRODUCT_STATUS, PRODUCT_AUDIENCE } from "../constants/index.js";

const sampleProducts = [
  // MEN'S WEAR
  {
    name: "Premium Cotton Crew Neck T-Shirt",
    audience: PRODUCT_AUDIENCE.MEN,
    productType: "Basic T-Shirt",
    shortDescription: "Premium cotton jersey T-shirt developed for consistent bulk production and international retail programs.",
    description: "A versatile crew-neck T-shirt manufactured using premium cotton jersey with controlled construction, consistent measurements, and quality-focused finishing. Designed for high-volume production runs with minimal variation between batches.",
    features: [
      "Soft hand feel",
      "Durable construction",
      "Color fastness",
      "Consistent measurement",
      "Export-quality finishing",
      "Suitable for bulk production"
    ],
    materials: ["100% Organic Cotton", "Ring-spun yarn"],
    fabric: "Single Jersey",
    composition: "100% Cotton",
    weight: "180 GSM",
    availableColors: ["Black", "White", "Navy", "Grey", "Olive"],
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    manufacturingCapabilities: ["Cut & Sew", "Printing", "Embroidery", "Quality Inspection"],
    certifications: ["BSCI", "OEKO-TEX", "ISO 9001"],
    minimumOrderQuantity: "5,000 pcs per color",
    productionCapacity: "100,000 pcs/month",
    leadTime: "45-60 days",
    featured: true,
    status: PRODUCT_STATUS.ACTIVE,
    sortOrder: 1,
  },
  {
    name: "Heavyweight Cotton Hoodie",
    audience: PRODUCT_AUDIENCE.MEN,
    productType: "Hoodie",
    shortDescription: "Heavyweight fleece hoodie with reinforced construction for durability and comfort in cooler climates.",
    description: "Premium heavyweight hoodie crafted from brushed fleece with double-lined hood, reinforced pocket corners, and flatlock stitching throughout. Engineered for retail programs requiring long-lasting wear and consistent sizing.",
    features: [
      "Brushed interior for warmth",
      "Double-lined hood with drawcord",
      "Reinforced pocket corners",
      "Flatlock stitching",
      "Ribbed cuffs and hem",
      "Pre-shrunk fabric"
    ],
    materials: ["100% Cotton", "Polyester blend options available"],
    fabric: "Fleece",
    composition: "80% Cotton / 20% Polyester",
    weight: "320 GSM",
    availableColors: ["Black", "Navy", "Charcoal", "Olive", "Burgundy"],
    availableSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    manufacturingCapabilities: ["Cut & Sew", "Embroidery", "Garment Dye", "Quality Inspection"],
    certifications: ["BSCI", "OEKO-TEX"],
    minimumOrderQuantity: "3,000 pcs per color",
    productionCapacity: "50,000 pcs/month",
    leadTime: "60-75 days",
    featured: true,
    status: PRODUCT_STATUS.ACTIVE,
    sortOrder: 2,
  },
  {
    name: "Slim Fit Chino Trousers",
    audience: PRODUCT_AUDIENCE.MEN,
    productType: "Trousers",
    shortDescription: "Modern slim-fit chino trousers with stretch comfort for smart-casual and workwear collections.",
    description: "Contemporary chino trousers featuring a tailored slim fit with mechanical stretch for comfort. Clean finishing with hidden stitch details, suitable for both retail and corporate uniform programs.",
    features: [
      "Mechanical stretch fabric",
      "Tailored slim fit",
      "Hidden pocket stitching",
      "Belt loops with reinforcement",
      "Zip fly with button closure",
      "Pre-washed for minimal shrinkage"
    ],
    materials: ["Cotton Twill", "Elastane blend"],
    fabric: "Twill",
    composition: "97% Cotton / 3% Elastane",
    weight: "260 GSM",
    availableColors: ["Khaki", "Navy", "Black", "Olive", "Stone"],
    availableSizes: ["28", "30", "32", "34", "36", "38", "40"],
    manufacturingCapabilities: ["Cut & Sew", "Special Finishing", "Quality Inspection"],
    certifications: ["BSCI", "ISO 9001"],
    minimumOrderQuantity: "2,000 pcs per color",
    productionCapacity: "40,000 pcs/month",
    leadTime: "50-65 days",
    status: PRODUCT_STATUS.ACTIVE,
    sortOrder: 3,
  },

  // WOMEN'S WEAR
  {
    name: "Relaxed Fit Oversized T-Shirt",
    audience: PRODUCT_AUDIENCE.WOMEN,
    productType: "Oversized T-Shirt",
    shortDescription: "Contemporary oversized T-shirt with dropped shoulders for modern silhouette and relaxed comfort.",
    description: "Fashion-forward oversized T-shirt featuring dropped shoulders, wide neckline, and curved hem. Manufactured with controlled drape and consistent oversized proportions across all sizes for reliable retail presentation.",
    features: [
      "Dropped shoulder design",
      "Wide crew neckline",
      "Curved hem with side vents",
      "Relaxed oversized fit",
      "Consistent proportions across sizes",
      "High-quality single jersey"
    ],
    materials: ["100% Cotton", "Organic Cotton available"],
    fabric: "Single Jersey",
    composition: "100% Cotton",
    weight: "160 GSM",
    availableColors: ["White", "Black", "Sand", "Sage", "Blush", "Lavender"],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    manufacturingCapabilities: ["Cut & Sew", "Printing", "Garment Dye", "Quality Inspection"],
    certifications: ["BSCI", "OEKO-TEX", "GOTS"],
    minimumOrderQuantity: "4,000 pcs per color",
    productionCapacity: "80,000 pcs/month",
    leadTime: "45-60 days",
    featured: true,
    status: PRODUCT_STATUS.ACTIVE,
    sortOrder: 1,
  },
  {
    name: "High-Rise Leggings",
    audience: PRODUCT_AUDIENCE.WOMEN,
    productType: "Leggings",
    shortDescription: "High-rise performance leggings with four-way stretch and opaque coverage for active and athleisure programs.",
    description: "Technical high-rise leggings engineered with four-way stretch interlock for shape retention and opaque coverage. Flatlock seams prevent chafing, wide waistband provides secure fit. Suitable for yoga, studio, and everyday wear programs.",
    features: [
      "Four-way stretch interlock",
      "High-rise wide waistband",
      "Flatlock seams",
      "Opaque coverage guaranteed",
      "Moisture-wicking properties",
      "Shape retention after wash"
    ],
    materials: ["Recycled Polyester", "Elastane"],
    fabric: "Interlock",
    composition: "75% Recycled Polyester / 25% Elastane",
    weight: "240 GSM",
    availableColors: ["Black", "Navy", "Charcoal", "Burgundy", "Forest Green"],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    manufacturingCapabilities: ["Cut & Sew", "Heat Transfer", "Special Finishing", "Quality Inspection"],
    certifications: ["BSCI", "OEKO-TEX", "GRS"],
    minimumOrderQuantity: "3,000 pcs per color",
    productionCapacity: "60,000 pcs/month",
    leadTime: "50-65 days",
    status: PRODUCT_STATUS.ACTIVE,
    sortOrder: 2,
  },
  {
    name: "Shirt Dress with Belt",
    audience: PRODUCT_AUDIENCE.WOMEN,
    productType: "Dress",
    shortDescription: "Versatile shirt dress with removable belt for adjustable styling from casual to refined.",
    description: "Classic shirt dress featuring button-front closure, collar, and removable self-fabric belt. Designed for versatile styling across seasons with clean tailoring and consistent fit. Suitable for workwear and casual retail collections.",
    features: [
      "Button-front closure",
      "Classic collar",
      "Removable self-fabric belt",
      "Side seam pockets",
      "Curved hem",
      "Easy-care fabric"
    ],
    materials: ["Cotton Poplin", "Tencel blend options"],
    fabric: "Poplin",
    composition: "100% Cotton",
    weight: "140 GSM",
    availableColors: ["White", "Navy", "Black", "Stripe", "Chambray"],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    manufacturingCapabilities: ["Cut & Sew", "Printing", "Embroidery", "Quality Inspection"],
    certifications: ["BSCI", "OEKO-TEX"],
    minimumOrderQuantity: "2,500 pcs per color",
    productionCapacity: "35,000 pcs/month",
    leadTime: "55-70 days",
    status: PRODUCT_STATUS.ACTIVE,
    sortOrder: 3,
  },

  // KIDS' WEAR
  {
    name: "Kids Organic Cotton T-Shirt",
    audience: PRODUCT_AUDIENCE.KIDS,
    productType: "Basic T-Shirt",
    shortDescription: "GOTS-certified organic cotton T-shirt designed for children's sensitive skin and active play.",
    description: "Ultra-soft organic cotton T-shirt specifically engineered for children's wear. Tagless label, flatlock seams, and reinforced neck binding for durability. GOTS certified for chemical-free production suitable for sensitive skin.",
    features: [
      "GOTS certified organic cotton",
      "Tagless label for comfort",
      "Flatlock seams prevent irritation",
      "Reinforced neck binding",
      "Pre-shrunk for consistent fit",
      "Colorfast dyes"
    ],
    materials: ["100% GOTS Organic Cotton"],
    fabric: "Single Jersey",
    composition: "100% Organic Cotton",
    weight: "160 GSM",
    availableColors: ["White", "Navy", "Red", "Yellow", "Green", "Pink", "Grey"],
    availableSizes: ["2Y", "3Y", "4Y", "5Y", "6Y", "7Y", "8Y", "9Y", "10Y", "11Y", "12Y"],
    manufacturingCapabilities: ["Cut & Sew", "Printing", "Embroidery", "Quality Inspection"],
    certifications: ["GOTS", "OEKO-TEX", "BSCI"],
    minimumOrderQuantity: "3,000 pcs per color",
    productionCapacity: "75,000 pcs/month",
    leadTime: "40-55 days",
    featured: true,
    status: PRODUCT_STATUS.ACTIVE,
    sortOrder: 1,
  },
  {
    name: "Kids Fleece Zip Hoodie",
    audience: PRODUCT_AUDIENCE.KIDS,
    productType: "Hoodie",
    shortDescription: "Cozy fleece zip hoodie with child-safe features for everyday wear and school uniforms.",
    description: "Warm fleece zip hoodie designed with child safety in mind. No drawcords on hood, covered zipper guard, and reflective details for visibility. Brushed interior for warmth, durable construction for active kids.",
    features: [
      "No drawcords (child-safe)",
      "Covered zipper guard",
      "Reflective details",
      "Brushed fleece interior",
      "Ribbed cuffs and hem",
      "Name label inside"
    ],
    materials: ["Cotton Fleece", "Polyester blend"],
    fabric: "Fleece",
    composition: "60% Cotton / 40% Polyester",
    weight: "280 GSM",
    availableColors: ["Navy", "Red", "Grey", "Pink", "Blue", "Green"],
    availableSizes: ["2Y", "3Y", "4Y", "5Y", "6Y", "7Y", "8Y", "9Y", "10Y", "11Y", "12Y", "13Y", "14Y"],
    manufacturingCapabilities: ["Cut & Sew", "Embroidery", "Heat Transfer", "Special Finishing", "Quality Inspection"],
    certifications: ["BSCI", "OEKO-TEX", "ISO 9001"],
    minimumOrderQuantity: "2,500 pcs per color",
    productionCapacity: "50,000 pcs/month",
    leadTime: "50-65 days",
    status: PRODUCT_STATUS.ACTIVE,
    sortOrder: 2,
  },
  {
    name: "Baby Organic Cotton Bodysuit Set",
    audience: PRODUCT_AUDIENCE.KIDS,
    productType: "Babywear",
    shortDescription: "Multi-pack organic cotton bodysuits with envelope neck and snap closure for easy dressing.",
    description: "Essential baby bodysuit set in GOTS certified organic cotton. Envelope neckline for easy over-head dressing, snap closure at bottom, flatlock seams for newborn comfort. Packaged in reusable cotton bag.",
    features: [
      "GOTS certified organic cotton",
      "Envelope neckline",
      "Snap closure at bottom",
      "Flatlock seams",
      "Tagless label",
      "Reusable packaging"
    ],
    materials: ["100% GOTS Organic Cotton"],
    fabric: "Interlock",
    composition: "100% Organic Cotton",
    weight: "200 GSM",
    availableColors: ["White", "Cream", "Sage", "Blush", "Sky Blue", "Yellow"],
    availableSizes: ["0-3M", "3-6M", "6-9M", "9-12M", "12-18M", "18-24M"],
    manufacturingCapabilities: ["Cut & Sew", "Special Finishing", "Quality Inspection"],
    certifications: ["GOTS", "OEKO-TEX", "BSCI"],
    minimumOrderQuantity: "5,000 sets per color",
    productionCapacity: "100,000 sets/month",
    leadTime: "35-50 days",
    status: PRODUCT_STATUS.ACTIVE,
    sortOrder: 3,
  },
];

const seedProducts = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/manami-fashions");
    console.log("Connected to database");

    // Get or create categories
    console.log("Setting up categories...");
    const categories = await Category.find({ isActive: true });
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name.toLowerCase()] = cat._id;
    });

    // Create default categories if they don't exist
    const defaultCategories = [
      { name: "T-Shirts", audience: "men", sortOrder: 1 },
      { name: "Hoodies", audience: "men", sortOrder: 2 },
      { name: "Trousers", audience: "men", sortOrder: 3 },
      { name: "T-Shirts", audience: "women", sortOrder: 1 },
      { name: "Leggings", audience: "women", sortOrder: 2 },
      { name: "Dresses", audience: "women", sortOrder: 3 },
      { name: "T-Shirts", audience: "kids", sortOrder: 1 },
      { name: "Hoodies", audience: "kids", sortOrder: 2 },
      { name: "Babywear", audience: "kids", sortOrder: 3 },
    ];

    for (const catData of defaultCategories) {
      const key = `${catData.name.toLowerCase()}-${catData.audience}`;
      if (!categoryMap[key]) {
        const parentName = catData.audience === 'men' ? "Men's Wear" : catData.audience === 'women' ? "Women's Wear" : "Kids' Wear";
        let parent = await Category.findOne({ name: parentName, isActive: true });
        if (!parent) {
          parent = await Category.create({ name: parentName, isActive: true, sortOrder: 0 });
        }
        const cat = await Category.create({
          name: catData.name,
          audience: catData.audience,
          parent: parent._id,
          sortOrder: catData.sortOrder,
          isActive: true,
        });
        categoryMap[key] = cat._id;
        console.log(`Created category: ${cat.name} (${catData.audience})`);
      }
    }

    // Clear existing products (optional - comment out to keep existing)
    // await Product.deleteMany({});
    // console.log("Cleared existing products");

    // Insert sample products
    console.log("Seeding products...");
    let created = 0;
    let skipped = 0;

    for (const productData of sampleProducts) {
      const existing = await Product.findOne({ name: productData.name });
      if (existing) {
        console.log(`Skipping existing: ${productData.name}`);
        skipped++;
        continue;
      }

      const catKey = `${productData.productType.toLowerCase()}-${productData.audience}`;
      const categoryId = categoryMap[catKey] || categoryMap[productData.productType.toLowerCase()];

      if (!categoryId) {
        console.warn(`No category found for ${productData.productType} (${productData.audience})`);
      }

      const product = await Product.create({
        ...productData,
        category: categoryId,
        images: [], // Will be added manually
      });

      console.log(`Created: ${product.name} (${product.audience})`);
      created++;
    }

    console.log(`\nSeeding complete! Created: ${created}, Skipped: ${skipped}`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedProducts();