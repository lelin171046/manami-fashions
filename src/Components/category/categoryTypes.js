// Static, frontend-only item-type configuration for each category.
//
// The backend has no "item type" field, so types are matched against product
// title / fabric / description with the keywords below. Adjust the keyword
// lists as your product naming evolves.
//
// Men   -> T-Shirt, Polo, Hoodie, Knit
// Women -> Vest, Hoodie, Night Wear
// Kids  -> Night Wear, School Wear, Jogger, Sweat Shirt

const MEN_TYPES = [
  { key: "t-shirt", label: "T-Shirt", keywords: ["t-shirt", "tshirt", "t shirt", "tee"] },
  { key: "polo", label: "Polo", keywords: ["polo"] },
  { key: "hoodie", label: "Hoodie", keywords: ["hoodie", "hoody", "hooded"] },
  { key: "knit", label: "Knit", keywords: ["knit", "knitted", "sweater", "pullover"] },
];

const WOMEN_TYPES = [
  { key: "vest", label: "Vest", keywords: ["vest", "tank"] },
  { key: "hoodie", label: "Hoodie", keywords: ["hoodie", "hoody", "hooded"] },
  {
    key: "night-wear",
    label: "Night Wear",
    keywords: ["night wear", "nightwear", "nighty", "pajama", "pyjama", "sleepwear", "loungewear"],
  },
];

const KIDS_TYPES = [
  {
    key: "night-wear",
    label: "Night Wear",
    keywords: ["night wear", "nightwear", "nighty", "pajama", "pyjama", "sleepwear"],
  },
  { key: "school-wear", label: "School Wear", keywords: ["school"] },
  { key: "jogger", label: "Jogger", keywords: ["jogger", "joggers", "jogging"] },
  { key: "sweat-shirt", label: "Sweat Shirt", keywords: ["sweat shirt", "sweatshirt", "sweater"] },
];

// Ordered most-specific first: "women" contains "men", so it must be checked
// before the men bucket.
const TYPE_BUCKETS = [
  { match: ["women", "womenswear", "woman", "ladies"], types: WOMEN_TYPES },
  { match: ["kid", "kids", "children", "child", "boy", "girl"], types: KIDS_TYPES },
  { match: ["men", "menswear", "man"], types: MEN_TYPES },
];

// Accepts a route segment or a category name/slug (e.g. "men", "menswear",
// "Menswear", "kids") and returns its configured item types.
export function getCategoryTypes(value) {
  const normalized = String(value || "").toLowerCase().trim();
  if (!normalized) return [];
  const bucket = TYPE_BUCKETS.find((entry) =>
    entry.match.some((token) => normalized.includes(token))
  );
  return bucket ? bucket.types : [];
}

// Client-side match: the backend has no type field, so we look for the type
// keywords inside the product title, fabric and description.
export function productMatchesType(product, type) {
  if (!type) return true;
  const haystack = [product?.name, product?.fabric, product?.description]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return type.keywords.some((keyword) => haystack.includes(keyword));
}