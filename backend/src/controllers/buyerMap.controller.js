import BuyerMap from "../models/BuyerMap.model.js";
import { sendSuccess } from "../helpers/response.js";
import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS } from "../constants/index.js";

export const getPublicBuyerMaps = async (req, res, next) => {
  try {
    const { featured, country } = req.query;
    const query = { isActive: true };
    if (featured !== undefined) query.featured = featured === "true";
    if (country) query.country = { $regex: country, $options: "i" };

    const buyers = await BuyerMap.find(query).sort({ sortOrder: 1, createdAt: -1 });
    return sendSuccess(res, { data: buyers });
  } catch (error) {
    next(error);
  }
};

export const getBuyerMaps = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, sort = "sortOrder", search, featured, country } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));

    const query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (featured !== undefined) query.featured = featured === "true";
    if (country) query.country = { $regex: country, $options: "i" };

    const [buyers, total] = await Promise.all([
      BuyerMap.find(query).sort(sort).skip((pageNum - 1) * limitNum).limit(limitNum),
      BuyerMap.countDocuments(query),
    ]);

    return sendSuccess(res, {
      data: buyers,
      meta: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};

export const getBuyerMapById = async (req, res, next) => {
  try {
    const buyer = await BuyerMap.findById(req.params.id);
    if (!buyer) throw new AppError("Buyer not found", HTTP_STATUS.NOT_FOUND);
    return sendSuccess(res, { data: buyer });
  } catch (error) {
    next(error);
  }
};

export const createBuyerMap = async (req, res, next) => {
  try {
    if (!req.body.name) throw new AppError("Buyer name is required", HTTP_STATUS.BAD_REQUEST);
    if (!req.body.country) throw new AppError("Country is required", HTTP_STATUS.BAD_REQUEST);

    const buyer = await BuyerMap.create(req.body);
    return sendSuccess(res, { message: "Buyer created", data: buyer, statusCode: HTTP_STATUS.CREATED });
  } catch (error) {
    next(error);
  }
};

export const updateBuyerMap = async (req, res, next) => {
  try {
    const buyer = await BuyerMap.findById(req.params.id);
    if (!buyer) throw new AppError("Buyer not found", HTTP_STATUS.NOT_FOUND);

    const allowed = [
      "name",
      "logo",
      "country",
      "partnershipYear",
      "description",
      "featured",
      "stats",
      "orderCategories",
      "sortOrder",
      "isActive",
    ];
    allowed.forEach((f) => {
      if (req.body[f] !== undefined) buyer[f] = req.body[f];
    });
    await buyer.save();

    return sendSuccess(res, { message: "Buyer updated", data: buyer });
  } catch (error) {
    next(error);
  }
};

export const deleteBuyerMap = async (req, res, next) => {
  try {
    const buyer = await BuyerMap.findByIdAndDelete(req.params.id);
    if (!buyer) throw new AppError("Buyer not found", HTTP_STATUS.NOT_FOUND);
    return sendSuccess(res, { message: "Buyer deleted" });
  } catch (error) {
    next(error);
  }
};

export const toggleFeatured = async (req, res, next) => {
  try {
    const buyer = await BuyerMap.findById(req.params.id);
    if (!buyer) throw new AppError("Buyer not found", HTTP_STATUS.NOT_FOUND);

    buyer.featured = !buyer.featured;
    await buyer.save();

    return sendSuccess(res, { message: `Buyer ${buyer.featured ? "featured" : "unfeatured"}`, data: buyer });
  } catch (error) {
    next(error);
  }
};

export const seedBuyerMaps = async (req, res, next) => {
  try {
    const sampleBuyers = [
      {
        name: "H&M",
        logo: { url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/hm_logo.svg" },
        country: "Sweden",
        partnershipYear: "Since 2015",
        description: "Long-standing partnership with H&M for sustainable knitwear and basic collections. Collaborating on conscious cotton initiatives and circular fashion programs.",
        featured: true,
        stats: [
          { label: "Annual Volume", value: "3.2M pcs" },
          { label: "Main Category", value: "Knitwear & Basics" },
          { label: "Compliance", value: "OEKO-TEX, BSCI, GOTS" },
          { label: "Lead Time", value: "45-60 days" },
        ],
        orderCategories: ["T-Shirts", "Polos", "Sweatshirts", "Leggings", "Underwear"],
        sortOrder: 1,
      },
      {
        name: "ZARA",
        logo: { url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/zara_logo.svg" },
        country: "Spain",
        partnershipYear: "Since 2018",
        description: "Strategic partner for fast-fashion denim and woven collections. Quick turnaround capabilities for trend-driven seasonal drops.",
        featured: true,
        stats: [
          { label: "Annual Volume", value: "2.8M pcs" },
          { label: "Main Category", value: "Denim & Woven" },
          { label: "Compliance", value: "OEKO-TEX, ZDHC, WRAP" },
          { label: "Lead Time", value: "30-45 days" },
        ],
        orderCategories: ["Jeans", "Jackets", "Shirts", "Dresses", "Skirts"],
        sortOrder: 2,
      },
      {
        name: "Target",
        logo: { url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/target_logo.svg" },
        country: "USA",
        partnershipYear: "Since 2016",
        description: "Major US retailer partnership for private label apparel. Focus on inclusive sizing, sustainable materials, and value-driven fashion.",
        featured: true,
        stats: [
          { label: "Annual Volume", value: "4.1M pcs" },
          { label: "Main Category", value: "Family Apparel" },
          { label: "Compliance", value: "OEKO-TEX, BSCI, SLCP" },
          { label: "Lead Time", value: "60-75 days" },
        ],
        orderCategories: ["T-Shirts", "Hoodies", "Pants", "Activewear", "Sleepwear", "Kids Wear"],
        sortOrder: 3,
      },
      {
        name: "Uniqlo",
        logo: { url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/uniqlo_logo.svg" },
        country: "Japan",
        partnershipYear: "Since 2019",
        description: "Japanese retail giant collaboration for HEATTECH and AIRism technology garments. Precision manufacturing for technical fabrics.",
        featured: true,
        stats: [
          { label: "Annual Volume", value: "2.5M pcs" },
          { label: "Main Category", value: "Technical Knitwear" },
          { label: "Compliance", value: "OEKO-TEX, ISO 9001, Bluesign" },
          { label: "Lead Time", value: "50-65 days" },
        ],
        orderCategories: ["Heattech Tops", "AIRism Innerwear", "Ultra Light Down", "Supima Cotton Tees"],
        sortOrder: 4,
      },
      {
        name: "Primark",
        logo: { url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/primark_logo.svg" },
        country: "Ireland",
        partnershipYear: "Since 2017",
        description: "Value fashion retailer partnership for high-volume basics and seasonal trends. Ethical sourcing through Primark Cares program.",
        featured: true,
        stats: [
          { label: "Annual Volume", value: "5.5M pcs" },
          { label: "Main Category", value: "Value Basics" },
          { label: "Compliance", value: "OEKO-TEX, BSCI, Primark Cares" },
          { label: "Lead Time", value: "40-55 days" },
        ],
        orderCategories: ["T-Shirts", "Leggings", "Pajamas", "Socks", "Accessories"],
        sortOrder: 5,
      },
      {
        name: "M&S",
        logo: { url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/ms_logo.svg" },
        country: "United Kingdom",
        partnershipYear: "Since 2014",
        description: "Marks & Spencer premium quality partnership. Plan A sustainability commitments with focus on responsible sourcing and quality assurance.",
        featured: false,
        stats: [
          { label: "Annual Volume", value: "1.8M pcs" },
          { label: "Main Category", value: "Premium Knitwear" },
          { label: "Compliance", value: "OEKO-TEX, BSCI, Plan A" },
          { label: "Lead Time", value: "55-70 days" },
        ],
        orderCategories: ["Cashmere Sweaters", "Merino Wool", "Cotton Rich Tees", "Lingerie"],
        sortOrder: 6,
      },
      {
        name: "C&A",
        logo: { url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/ca_logo.svg" },
        country: "Netherlands",
        partnershipYear: "Since 2020",
        description: "European fashion retailer for sustainable collections. C&A Certified program partnership for organic cotton and recycled materials.",
        featured: false,
        stats: [
          { label: "Annual Volume", value: "2.2M pcs" },
          { label: "Main Category", value: "Sustainable Fashion" },
          { label: "Compliance", value: "GOTS, OCS, RCS, BSCI" },
          { label: "Lead Time", value: "45-60 days" },
        ],
        orderCategories: ["Organic Cotton Tees", "Recycled Polyester", "Denim", "Knitwear"],
        sortOrder: 7,
      },
      {
        name: "Gap",
        logo: { url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/gap_logo.svg" },
        country: "USA",
        partnershipYear: "Since 2021",
        description: "Global American brand partnership for Gap, Old Navy, and Athleta collections. Focus on inclusive sizing and water-saving denim.",
        featured: false,
        stats: [
          { label: "Annual Volume", value: "3.5M pcs" },
          { label: "Main Category", value: "Denim & Active" },
          { label: "Compliance", value: "OEKO-TEX, BSCI, Gap for Good" },
          { label: "Lead Time", value: "50-65 days" },
        ],
        orderCategories: ["Denim", "Activewear", "T-Shirts", "Hoodies", "Outerwear"],
        sortOrder: 8,
      },
      {
        name: "Tesco F&F",
        logo: { url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/tesco_logo.svg" },
        country: "United Kingdom",
        partnershipYear: "Since 2018",
        description: "Tesco's clothing brand F&F for affordable family fashion. Strong focus on sustainable cotton and ethical manufacturing.",
        featured: false,
        stats: [
          { label: "Annual Volume", value: "2.0M pcs" },
          { label: "Main Category", value: "Family Value Wear" },
          { label: "Compliance", value: "OEKO-TEX, BSCI, F&F Sustainability" },
          { label: "Lead Time", value: "45-60 days" },
        ],
        orderCategories: ["School Uniform", "Basics", "Nightwear", "Seasonal"],
        sortOrder: 9,
      },
      {
        name: "Decathlon",
        logo: { url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/decathlon_logo.svg" },
        country: "France",
        partnershipYear: "Since 2022",
        description: "Sports retailer partnership for technical sportswear and activewear. Innovation-driven production for performance fabrics.",
        featured: false,
        stats: [
          { label: "Annual Volume", value: "1.5M pcs" },
          { label: "Main Category", value: "Sportswear" },
          { label: "Compliance", value: "OEKO-TEX, Bluesign, ZDHC" },
          { label: "Lead Time", value: "60-80 days" },
        ],
        orderCategories: ["Running Tops", "Yoga Wear", "Swimwear", "Thermal Layers", "Compression"],
        sortOrder: 10,
      },
    ];

    await BuyerMap.deleteMany({});
    const created = await BuyerMap.insertMany(sampleBuyers);
    return sendSuccess(res, { message: `${created.length} sample buyers seeded`, data: created });
  } catch (error) {
    next(error);
  }
};