import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Search,
  X,
  SlidersHorizontal,
  Grid,
  List,
  Eye,
  Heart,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  ShoppingBag,
  Filter,
  Check,
  RefreshCw,
  Layers,
  Star,
  ChevronDown,
} from "lucide-react";

const MOCK_CATEGORIES = [
  { _id: "cat_1", name: "Men", slug: "men", count: 24 },
  { _id: "cat_2", name: "Women", slug: "women", count: 32 },
  { _id: "cat_3", name: "Kids", slug: "kids", count: 18 },
  { _id: "cat_4", name: "Accessories", slug: "accessories", count: 12 },
];

const MOCK_SHOWCASE = [
  {
    key: "men",
    title: "Men's Sartorial",
    sub: "Automated Tailoring & Outerwear",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "women",
    title: "Women's Couture",
    sub: "Silk & Sculptural Silhouettes",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "accessories",
    title: "Minimalist Essentials",
    sub: "Handcrafted Italian Leather",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
  },
];

const MOCK_TYPES = [
  { key: "all", label: "All Items" },
  { key: "jackets", label: "Tailored Jackets" },
  { key: "knitwear", label: "Cashmere Knitwear" },
  { key: "shirts", label: "Egyptian Cotton Shirts" },
  { key: "trousers", label: "Pleated Trousers" },
];

const MOCK_PRODUCTS = [
  {
    _id: "p1",
    title: "Aura Oversized Wool Trench",
    fabric: "100% Virgin Wool",
    category: "Men",
    type: "jackets",
    price: 890,
    rating: 4.9,
    isNew: true,
    badge: "Limited Edition",
    image:
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop",
    description:
      "Engineered with structured storm flaps and custom matte metal hardware. Cut from heavyweight double-faced wool.",
    colors: ["#1F2937", "#9CA3AF", "#D1D5DB"],
  },
  {
    _id: "p2",
    title: "Monolith Silk Draped Gown",
    fabric: "Mulberry Silk Crepe",
    category: "Women",
    type: "knitwear",
    price: 1250,
    rating: 5.0,
    isNew: true,
    badge: "Runway Exclusive",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
    description:
      "Fluid floor-length silhouette with hand-pleated asymmetric shoulder detailing. Meticulously handcrafted in Milan.",
    colors: ["#000000", "#FAF5FF"],
  },
  {
    _id: "p3",
    title: "Architectural Linen Blazer",
    fabric: "Organic Heavy Linen",
    category: "Men",
    type: "jackets",
    price: 640,
    rating: 4.8,
    isNew: false,
    badge: "Sustainable",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
    description:
      "Deconstructed shoulder silhouette offering relaxed breathability without sacrificing formal precision.",
    colors: ["#D4CEB8", "#1E293B"],
  },
  {
    _id: "p4",
    title: "Minimalist Cashmere Turtleneck",
    fabric: "Grade-A Cashmere",
    category: "Women",
    type: "knitwear",
    price: 520,
    rating: 4.9,
    isNew: false,
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop",
    description:
      "Sumptuously soft 12-gauge knit spun from Mongolian cashmere with seamless ribbed cuffs.",
    colors: ["#E5E7EB", "#4B5563", "#000000"],
  },
  {
    _id: "p5",
    title: "Structured Japanese Denim Overshirt",
    fabric: "Selvedge Denim",
    category: "Men",
    type: "shirts",
    price: 380,
    rating: 4.7,
    isNew: true,
    badge: "Craft Series",
    image:
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
    description:
      "14oz rigid Japanese selvedge denim woven on vintage shuttle looms. Finished with horn button fastenings.",
    colors: ["#1E3A8A", "#000000"],
  },
  {
    _id: "p6",
    title: "Pleated Tapered Wool Trousers",
    fabric: "Super 120s Wool",
    category: "Men",
    type: "trousers",
    price: 430,
    rating: 4.8,
    isNew: false,
    badge: "Core Essential",
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop",
    description:
      "Double forward pleats with a subtle break at the ankle. Features hidden inner waistband tensioners.",
    colors: ["#111827", "#374151"],
  },
];

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
      delay: i * 0.06,
    },
  }),
};

const MODAL_OVERLAY_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const MODAL_CONTENT_VARIANTS = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 28 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 15,
    transition: { duration: 0.2 },
  },
};

const ProductSkeleton = ({ viewMode = "grid" }) => {
  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl bg-gray-50/80 border border-gray-100 animate-pulse"
          >
            <div className="w-full md:w-36 h-48 md:h-36 bg-gray-200/70 rounded-xl" />
            <div className="flex-1 space-y-3 w-full">
              <div className="h-3 bg-gray-200/70 w-1/4 rounded" />
              <div className="h-6 bg-gray-200/70 w-2/3 rounded" />
              <div className="h-4 bg-gray-200/50 w-full rounded" />
            </div>
            <div className="w-full md:w-28 h-10 bg-gray-200/70 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col animate-pulse">
          <div className="aspect-[3/4] bg-neutral-100 rounded-2xl mb-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
          </div>
          <div className="h-3 bg-neutral-200/80 w-1/3 rounded-full mb-2" />
          <div className="h-5 bg-neutral-200/80 w-3/4 rounded-full mb-3" />
          <div className="h-4 bg-neutral-200/60 w-1/4 rounded-full" />
        </div>
      ))}
    </div>
  );
};

const EmptyState = ({ hasActiveFilters, onReset }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="py-24 px-6 text-center border border-dashed border-neutral-200 rounded-3xl bg-neutral-50/50 my-8"
  >
    <div className="max-w-md mx-auto flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mb-6 text-neutral-800">
        <Search size={22} strokeWidth={1.5} />
      </div>
      <h3 className="text-xs uppercase tracking-[0.3em] font-semibold text-neutral-900 mb-2">
        No Products Discovered
      </h3>
      <p className="text-sm text-neutral-500 leading-relaxed font-light mb-8">
        We couldn't find any pieces matching your specific parameters. Try refining your selection or resetting filters.
      </p>
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-black text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-all shadow-sm hover:shadow-md"
        >
          <X size={14} />
          Clear All Filters
        </button>
      )}
    </div>
  </motion.div>
);

const CategoryShowcase = ({ categories, onSelectCategory, activeCategory }) => (
  <section className="mb-16">
    <div className="flex items-center justify-between mb-6">
      <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-semibold flex items-center gap-2">
        <Sparkles size={13} className="text-amber-500" /> Curated Segments
      </span>
      <span className="text-xs text-neutral-400">01 — 03</span>
    </div>
   
  </section>
);

const ProductTypeTabs = ({ types, activeType, onTypeChange, label }) => (
  <div className="mb-10 overflow-x-auto no-scrollbar py-2 border-b border-neutral-100">
    <div className="flex items-center gap-3 min-w-max">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 pr-3 border-r border-neutral-200">
        {label}:
      </span>
      {types.map((t) => {
        const isActive = activeType === t.key || (!activeType && t.key === "all");
        return (
          <button
            key={t.key}
            onClick={() => onTypeChange(t.key === "all" ? "" : t.key)}
            className={`relative px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 ${
              isActive
                ? "text-white font-semibold"
                : "text-neutral-500 hover:text-black hover:bg-neutral-100/80"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-black rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{t.label}</span>
          </button>
        );
      })}
    </div>
  </div>
);

const ProductFilterBar = ({
  categories,
  fabrics,
  search,
  onSearchChange,
  category,
  onCategoryChange,
  fabric,
  onFabricChange,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  onReset,
  totalResults,
  hasActiveFilters,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="sticky top-6 z-30 mb-12">
      <div className="backdrop-blur-xl bg-white/80 border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-3 md:p-4 transition-all">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search garments, fabrics, styles..."
              className="w-full bg-neutral-100/70 focus:bg-white border border-transparent focus:border-neutral-300 rounded-full pl-11 pr-10 py-2.5 text-xs text-black placeholder-neutral-400 outline-none transition-all"
            />
            {search && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium uppercase tracking-[0.1em] border transition-all ${
                isFilterOpen || hasActiveFilters
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400"
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>Refine</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-neutral-100/70 hover:bg-neutral-100 border border-transparent focus:border-neutral-300 rounded-full pl-4 pr-9 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-neutral-700 outline-none cursor-pointer transition-all"
              >
                <option value="">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
              <ChevronDown
                size={13}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              />
            </div>

            {/* Layout Mode Selector */}
            <div className="hidden sm:flex items-center bg-neutral-100 p-1 rounded-full border border-neutral-200/50">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-2 rounded-full transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-black shadow-sm"
                    : "text-neutral-400 hover:text-black"
                }`}
                title="Grid View"
              >
                <Grid size={15} />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-2 rounded-full transition-all ${
                  viewMode === "list"
                    ? "bg-white text-black shadow-sm"
                    : "text-neutral-400 hover:text-black"
                }`}
                title="List View"
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden border-t border-neutral-200/60 mt-3 pt-4 px-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-2">
                {/* Category Filter */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 mb-2">
                    Category Segment
                  </label>
                  <select
                    value={category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs font-medium text-black outline-none focus:border-black transition-all"
                  >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fabric Filter */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 mb-2">
                    Material / Fabric
                  </label>
                  <select
                    value={fabric}
                    onChange={(e) => onFabricChange(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs font-medium text-black outline-none focus:border-black transition-all"
                  >
                    <option value="">All Fabrics</option>
                    {fabrics.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Bar / Actions */}
                <div className="flex flex-col justify-end">
                  <div className="flex items-center justify-between gap-3 pt-2">
                    <span className="text-xs text-neutral-500">
                      Showing{" "}
                      <strong className="text-black font-semibold">
                        {totalResults}
                      </strong>{" "}
                      results
                    </span>
                    {hasActiveFilters && (
                      <button
                        onClick={onReset}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-red-600 hover:text-red-800 transition-colors"
                      >
                        <RefreshCw size={12} /> Reset Filters
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ProductCard = React.forwardRef(({ product, onQuickView, index }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      ref={ref}
      layout
      variants={FADE_UP_VARIANTS}
      custom={index}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Wrapper */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 mb-4 cursor-pointer">
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badge Overlay */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-black/80 backdrop-blur-md text-white text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-medium">
              {product.badge}
            </span>
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-white/40 flex items-center justify-center text-neutral-700 hover:bg-white hover:text-black transition-all shadow-sm"
        >
          <Heart
            size={15}
            className={liked ? "fill-red-500 text-red-500" : ""}
          />
        </button>

        {/* Hover Quick View Trigger */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-4 bottom-4 z-10 flex gap-2"
            >
              <button
                onClick={() => onQuickView(product)}
                className="flex-1 py-3 px-4 rounded-xl bg-white/90 backdrop-blur-md text-black text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all shadow-lg"
              >
                <Eye size={14} /> Quick View
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Meta Content */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 mb-1">
            {product.fabric || product.category}
          </p>
          <h4 className="text-sm font-medium text-black group-hover:text-neutral-600 transition-colors line-clamp-1">
            {product.title}
          </h4>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-black">${product.price}</p>
        </div>
      </div>
    </motion.div>
  );
});
ProductCard.displayName = "ProductCard";

const ProductListItem = React.forwardRef(({ product, onQuickView, index }, ref) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      ref={ref}
      layout
      variants={FADE_UP_VARIANTS}
      custom={index}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.98 }}
      className="group relative flex flex-col sm:flex-row items-center gap-6 p-4 md:p-5 rounded-2xl bg-white border border-neutral-100 hover:border-neutral-300 hover:shadow-xl transition-all duration-300 mb-4"
    >
      <div className="relative w-full sm:w-40 h-52 sm:h-40 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[8px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full font-medium">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex-1 space-y-2 text-left w-full">
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400">
            {product.category} — {product.fabric}
          </span>
          <div className="flex items-center text-amber-500 text-xs gap-1">
            <Star size={12} className="fill-amber-400" />
            <span className="font-semibold">{product.rating}</span>
          </div>
        </div>
        <h3 className="text-lg font-medium text-black group-hover:text-neutral-600 transition-colors">
          {product.title}
        </h3>
        <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
        <span className="text-lg font-semibold text-black">${product.price}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className="p-2.5 rounded-full border border-neutral-200 text-neutral-600 hover:text-black hover:border-black transition-colors"
          >
            <Heart
              size={15}
              className={liked ? "fill-red-500 text-red-500" : ""}
            />
          </button>
          <button
            onClick={() => onQuickView(product)}
            className="px-5 py-2.5 rounded-full bg-black text-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
          >
            <Eye size={14} /> Detail
          </button>
        </div>
      </div>
    </motion.div>
  );
});
ProductListItem.displayName = "ProductListItem";

const ProductModal = React.forwardRef(({ product, onClose }, ref) => {
  const [selectedColor, setSelectedColor] = useState(0);

  if (!product) return null;

  return (
    <div ref={ref} className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        variants={MODAL_OVERLAY_VARIANTS}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal Box */}
      <motion.div
        variants={MODAL_CONTENT_VARIANTS}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 my-auto border border-neutral-100"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200 flex items-center justify-center transition-all"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Gallery */}
          <div className="relative aspect-[3/4] bg-neutral-100 md:h-full">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-6 left-6 bg-black text-white text-[9px] uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full font-medium">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details Column */}
          <div className="p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-neutral-400">
                  {product.category} — {product.fabric}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-500">
                  <Star size={13} className="fill-amber-400" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
              </div>

              <h2 className="text-2xl font-light uppercase tracking-tight text-black mb-3">
                {product.title}
              </h2>

              <p className="text-2xl font-semibold text-black mb-6">
                ${product.price}
              </p>

              <div className="border-t border-b border-neutral-100 py-4 my-4 space-y-4">
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Color Selection */}
                {product.colors && (
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 mb-2">
                      Available Color Palette
                    </span>
                    <div className="flex items-center gap-2">
                      {product.colors.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedColor(i)}
                          style={{ backgroundColor: c }}
                          className={`w-6 h-6 rounded-full border transition-all ${
                            selectedColor === i
                              ? "ring-2 ring-black ring-offset-2 scale-110"
                              : "border-neutral-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <button
                onClick={onClose}
                className="w-full py-4 rounded-2xl bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} /> Add To Cart
              </button>
              <p className="text-[10px] text-center text-neutral-400 tracking-wider uppercase">
                Free Worldwide Express Shipping & Easy Returns
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});
ProductModal.displayName = "ProductModal";

export default function ProductsPage() {
  // State management matching business specifications
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Active filter state
  const [categorySlug, setCategorySlug] = useState("");
  const [search, setSearch] = useState("");
  const [fabric, setFabric] = useState("");
  const [sort, setSort] = useState("");
  const [typeParam, setTypeParam] = useState("");

  // Simulated filter resets
  const handleReset = () => {
    setCategorySlug("");
    setSearch("");
    setFabric("");
    setSort("");
    setTypeParam("");
  };

  // Dynamic client-side filtering logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      // Category filter
      if (
        categorySlug &&
        p.category.toLowerCase() !== categorySlug.toLowerCase()
      ) {
        return false;
      }
      // Type filter
      if (typeParam && p.type !== typeParam) {
        return false;
      }
      // Fabric filter
      if (fabric && p.fabric !== fabric) {
        return false;
      }
      // Search query filter
      if (search) {
        const query = search.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesFabric = p.fabric.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesFabric && !matchesCategory) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });
  }, [categorySlug, typeParam, fabric, search, sort]);

  // Extract unique fabrics from mock list
  const allFabrics = useMemo(
    () => [...new Set(MOCK_PRODUCTS.map((p) => p.fabric))],
    []
  );

  const categories = useMemo(
    () => MOCK_CATEGORIES.map((c) => c.name),
    []
  );

  const hasActiveFilters = Boolean(
    categorySlug || search || fabric || sort || typeParam
  );

  const activeCategoryObj = MOCK_CATEGORIES.find(
    (c) => c.slug === categorySlug || c.name.toLowerCase() === categorySlug.toLowerCase()
  );

  const heading = activeCategoryObj ? activeCategoryObj.name : "Portfolio";
  const description = activeCategoryObj
    ? `Explore our ${activeCategoryObj.name.toLowerCase()} collection, engineered with carefully selected fabrics, contemporary silhouettes and refined manufacturing standards.`
    : "Architectural luxury garments crafted with precision manufacturing. Browse our seasonal portfolio or filter by bespoke parameters.";

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans py-16 px-6 md:px-12 lg:px-20 selection:bg-black selection:text-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Luxury Header Banner */}
        <header className="mb-14 border-b border-neutral-100 pb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-black" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 font-bold">
              Product Catalog 2026
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extralight tracking-tight uppercase"
            >
              {heading} <span className="font-semibold">Collection.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-500 max-w-lg text-xs md:text-sm leading-relaxed font-light"
            >
              {description}
            </motion.p>
          </div>
        </header>

        {/* Category Showcase Visual Grid */}
        <CategoryShowcase
          categories={MOCK_SHOWCASE}
          activeCategory={categorySlug}
          onSelectCategory={(key) =>
            setCategorySlug(key === categorySlug ? "" : key)
          }
        />

        {/* Sub-Category Type Filter Tabs */}
        <ProductTypeTabs
          types={MOCK_TYPES}
          activeType={typeParam}
          onTypeChange={setTypeParam}
          label={activeCategoryObj ? activeCategoryObj.name : "Garment Types"}
        />

        {/* Glassmorphism Interactive Filter Bar */}
        <ProductFilterBar
          categories={categories}
          fabrics={allFabrics}
          search={search}
          onSearchChange={setSearch}
          category={activeCategoryObj?.name || ""}
          onCategoryChange={(val) =>
            setCategorySlug(val ? val.toLowerCase() : "")
          }
          fabric={fabric}
          onFabricChange={setFabric}
          sort={sort}
          onSortChange={setSort}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onReset={handleReset}
          totalResults={filteredProducts.length}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Product Listing Section */}
        <LayoutGroup>
          {isLoading ? (
            <ProductSkeleton viewMode={viewMode} />
          ) : filteredProducts.length === 0 ? (
            <EmptyState
              hasActiveFilters={hasActiveFilters}
              onReset={handleReset}
            />
          ) : viewMode === "grid" ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-y-16"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onQuickView={setSelectedProduct}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div layout className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <ProductListItem
                    key={product._id}
                    product={product}
                    onQuickView={setSelectedProduct}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </LayoutGroup>

        {/* Quick View Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}