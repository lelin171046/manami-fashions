const normalize = (value = "") => value.toLowerCase().trim();

// Marketing/media config for the category showcase.
//
// `src` files are expected under `/public/images/categories/` (and
// `/public/videos/categories/` for videos). Add these assets:
//   - public/images/categories/men.jpg
//   - public/images/categories/women.jpg
//   - public/images/categories/kids.jpg
//
// `href` segments (men / women / kids) are frontend route segments. They are
// resolved to real backend categories at runtime through matchCategory().
export const CATEGORY_SHOWCASE = [
  {
    key: "men",
    title: "Men",
    subtitle: "Modern menswear",
    href: "/products/men",
    mediaType: "image",
    src: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1791317629/pexels-glassesshop-gs-1317359316-30587667_odbrhh.jpg",
  },
  {
    key: "women",
    title: "Women",
    subtitle: "Contemporary womenswear",
    href: "/products/women",
    mediaType: "image",
    src: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1791317185/portrait-brutal-sportive-woman-hood-sportswear-white_pv5sph.jpg",
  },
  {
    key: "kids",
    title: "Kids",
    subtitle: "Comfort and character",
    href: "/products/kids",
    mediaType: "image",
    src: "https://img.magnific.com/free-photo/full-length-portrait-cute-little-girl-hat_171337-13768.jpg?semt=ais_hybrid&w=740&q=80",
  },
];

// Match a route segment (e.g. "men") against a backend category, using the
// actual category schema (name + slug). Men->menswear, women->womenswear,
// kids->kids, active-innerwear->active-innerwear, etc.
export function matchCategory(category, segment) {
  if (!category) return false;
  const seg = normalize(segment);
  if (!seg) return false;
  const name = normalize(category.name);
  const slug = normalize(category.slug);
  return slug === seg || name === seg || slug.startsWith(seg) || name.startsWith(seg);
}

// Resolve a URL segment to a backend category via the already-fetched
// public categories. Returns the matching category object or null.
export function resolveCategoryBySegment(segment, categories = []) {
  if (!segment) return null;
  return categories.find((category) => matchCategory(category, segment)) || null;
}

// Build the product listing href for a backend category. Prefers the pretty
// showcase segment when available (men/women/kids), otherwise uses the real
// slug. Returns null only if no usable URL segment exists.
export function getCategoryHref(category) {
  if (!category) return "/products";
  const showcaseItem = CATEGORY_SHOWCASE.find((item) => matchCategory(category, item.key));
  if (showcaseItem) return showcaseItem.href;
  const slug = normalize(category.slug);
  return slug ? `/products/${slug}` : null;
}