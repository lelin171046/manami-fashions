import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Grid, List, SlidersHorizontal, X } from "lucide-react";

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "title", label: "A \u2013 Z" },
  { value: "-title", label: "Z \u2013 A" },
  { value: "-featured", label: "Featured" },
  { value: "-createdAt", label: "Newest" },
];

const ProductFilterBar = ({
  categories = [],
  fabrics = [],
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
  totalResults = 0,
  hasActiveFilters = false,
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const activeFilterCount = [category, fabric, sort].filter(Boolean).length;

  return (
    <div className="mb-12">
      {/* Desktop */}
      <div className="hidden lg:block">
        {/* Search + Sort Row */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 border-b border-gray-200 bg-transparent text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
              aria-label="Search products"
            />
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="text-xs uppercase tracking-widest text-gray-400 bg-transparent border-b border-gray-200 pb-1 focus:outline-none focus:border-black cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <div className="flex items-center border-l border-gray-200 pl-4 gap-1">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-2 transition-colors ${viewMode === "grid" ? "text-black" : "text-gray-300 hover:text-gray-500"}`}
                aria-label="Grid view"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-2 transition-colors ${viewMode === "list" ? "text-black" : "text-gray-300 hover:text-gray-500"}`}
                aria-label="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs — Hero.jsx underline style */}
        <div className="flex flex-wrap gap-8 border-b border-gray-100 pb-6">
          <button
            onClick={() => onCategoryChange("")}
            className={`text-xs uppercase tracking-widest transition-all duration-300 ${
              !category
                ? "font-bold border-b-2 border-black pb-6 -mb-[26px]"
                : "text-gray-400 hover:text-black"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`text-xs uppercase tracking-widest transition-all duration-300 ${
                category === cat
                  ? "font-bold border-b-2 border-black pb-6 -mb-[26px]"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Fabric pills + results + reset */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onFabricChange("")}
              className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-200 ${
                !fabric ? "bg-black text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              All Fabrics
            </button>
            {fabrics.map((f) => (
              <button
                key={f}
                onClick={() => onFabricChange(f)}
                className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-200 ${
                  fabric === f ? "bg-black text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-300">
              {totalResults} product{totalResults !== 1 ? "s" : ""}
            </span>
            {hasActiveFilters && (
              <button
                onClick={onReset}
                className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center gap-1"
              >
                <X size={12} />
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 border-b border-gray-200 bg-transparent text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
            />
          </div>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`p-2.5 border border-gray-200 rounded transition-colors relative ${showMobileFilters ? "bg-black text-white" : "text-gray-500"}`}
          >
            <SlidersHorizontal size={16} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black text-white text-[9px] rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          <div className="flex border border-gray-200 rounded overflow-hidden">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-black text-white" : "text-gray-500"}`}
            >
              <Grid size={14} />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-black text-white" : "text-gray-500"}`}
            >
              <List size={14} />
            </button>
          </div>
        </div>

        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pb-4 space-y-3 border-b border-gray-100 mb-4"
          >
            <div className="flex flex-wrap gap-2">
              <button onClick={() => onCategoryChange("")} className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold ${!category ? "bg-black text-white" : "bg-gray-100 text-gray-500"}`}>
                All
              </button>
              {categories.map((cat) => (
                <button key={cat} onClick={() => onCategoryChange(cat)} className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold ${category === cat ? "bg-black text-white" : "bg-gray-100 text-gray-500"}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => onFabricChange("")} className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold ${!fabric ? "bg-black text-white" : "bg-gray-100 text-gray-500"}`}>
                All Fabrics
              </button>
              {fabrics.map((f) => (
                <button key={f} onClick={() => onFabricChange(f)} className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold ${fabric === f ? "bg-black text-white" : "bg-gray-100 text-gray-500"}`}>
                  {f}
                </button>
              ))}
            </div>
            <select value={sort} onChange={(e) => onSortChange(e.target.value)} className="text-xs uppercase tracking-widest text-gray-400 bg-transparent border-b border-gray-200 pb-1 focus:outline-none">
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {hasActiveFilters && (
              <button onClick={onReset} className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black flex items-center gap-1">
                <X size={12} /> Reset filters
              </button>
            )}
          </motion.div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-gray-300">
            {totalResults} product{totalResults !== 1 ? "s" : ""}
          </span>
          {hasActiveFilters && (
            <button onClick={onReset} className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black flex items-center gap-1">
              <X size={12} /> Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilterBar;
