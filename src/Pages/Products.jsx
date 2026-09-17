import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import api from "../api/axios.js";
import ProductFilterBar from "./products/ProductFilterBar.jsx";
import ProductTypeTabs from "./products/ProductTypeTabs.jsx";
import ProductCard from "./products/ProductCard.jsx";
import ProductListItem from "./products/ProductListItem.jsx";
import ProductModal from "./products/ProductModal.jsx";
import CategoryShowcase from "../Components/category/CategoryShowcase.jsx";
import {
  CATEGORY_SHOWCASE,
  resolveCategoryBySegment,
  getCategoryHref,
} from "../Components/category/categoryShowcaseConfig.js";
import { getCategoryTypes, productMatchesType } from "../Components/category/categoryTypes.js";

const GRID_CLASSES =
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 lg:gap-y-16";

// Item-type filtering happens client-side, so fetch a generous page of
// products (backend max is 50) to keep type results complete.
const PUBLIC_PRODUCT_LIMIT = 48;

const ProductSkeleton = () => (
  <div className={GRID_CLASSES}>
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="aspect-[3/4] bg-gray-100 mb-6" />
        <div className="h-4 bg-gray-100 w-2/3 mb-3" />
        <div className="h-3 bg-gray-100 w-1/3" />
      </div>
    ))}
  </div>
);

const EmptyState = ({ hasActiveFilters, onReset }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    className="min-h-[420px] flex items-center justify-center text-center border-y border-gray-100"
  >
    <div className="max-w-md px-6">
      <div className="mx-auto w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-6">
        <Search size={20} strokeWidth={1.5} className="text-gray-400" />
      </div>
      <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-gray-900">
        No products found
      </h3>
      <p className="mt-3 text-sm leading-6 text-gray-400">
        We couldn't find products matching your current selection.
      </p>
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="mt-7 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] font-medium text-gray-900 border-b border-gray-900 pb-1 hover:text-gray-500 hover:border-gray-400 transition-colors"
        >
          <X size={13} />
          Clear all filters
        </button>
      )}
    </div>
  </motion.div>
);

const Products = () => {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("grid");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // URL is the single source of truth for filters so refresh, sharing and
  // back/forward navigation keep the current selection.
  const search = searchParams.get("search") || "";
  const fabric = searchParams.get("fabric") || "";
  const sort = searchParams.get("sort") || "";
  const typeParam = searchParams.get("type") || "";

  const { data: categoriesData } = useQuery({
    queryKey: ["public-categories"],
    queryFn: async () => {
      const { data } = await api.get("/categories/public");
      return data.data;
    },
  });

  // Resolve the :categorySlug route segment (men/women/kids/... or a real
  // slug) to an actual backend category using the fetched public categories.
  const activeCategory = useMemo(
    () => resolveCategoryBySegment(categorySlug, categoriesData || []),
    [categorySlug, categoriesData]
  );
  const categoryId = activeCategory?._id || "";

  // Item types are derived from the category segment/name via frontend config.
  const categoryTypes = useMemo(
    () => getCategoryTypes(categorySlug || activeCategory?.slug || activeCategory?.name),
    [categorySlug, activeCategory]
  );
  const activeType = useMemo(
    () => categoryTypes.find((type) => type.key === typeParam) || null,
    [categoryTypes, typeParam]
  );

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (categoryId) params.append("category", categoryId);
    if (fabric) params.append("fabric", fabric);
    if (sort) params.append("sort", sort);
    params.append("limit", String(PUBLIC_PRODUCT_LIMIT));
    return params.toString();
  }, [search, categoryId, fabric, sort]);

  const { data: productsRes, isPending } = useQuery({
    queryKey: ["public-products", queryParams],
    queryFn: async () => {
      const { data } = await api.get(`/products/public?${queryParams}`);
      return data;
    },
    // Avoid requesting products before the category is resolved on
    // category routes.
    enabled: !categorySlug || !!categoriesData,
  });

  const products = useMemo(() => {
    if (!productsRes?.data) return [];
    return productsRes.data.map((p) => ({
      ...p,
      name: p.title,
      id: p._id,
      category: p.category?.name || p.category,
    }));
  }, [productsRes]);

  // Client-side item-type filter (backend has no type field).
  const visibleProducts = useMemo(() => {
    if (!activeType) return products;
    return products.filter((product) => productMatchesType(product, activeType));
  }, [products, activeType]);

  const allFabrics = useMemo(() => {
    if (!productsRes?.data) return [];
    return [...new Set(productsRes.data.map((p) => p.fabric).filter(Boolean))].sort();
  }, [productsRes]);

  const categories = useMemo(() => {
    if (!categoriesData) return [];
    return categoriesData.map((c) => c.name).sort();
  }, [categoriesData]);

  // Showcase uses config media, falling back to the backend category image
  // (if the admin has uploaded one) when the local asset is unavailable.
  const showcaseData = useMemo(
    () =>
      CATEGORY_SHOWCASE.map((item) => {
        const resolved = resolveCategoryBySegment(item.key, categoriesData || []);
        const backendImage = resolved?.image?.url;
        return backendImage ? { ...item, fallbackSrc: backendImage } : item;
      }),
    [categoriesData]
  );

  const totalResults = activeType
    ? visibleProducts.length
    : productsRes?.meta?.total ?? products.length;

  const hasActiveFilters = !!(search || fabric || sort || categoryId || activeType);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  // Category tabs change the route so the URL always reflects the category
  // (and reset any type/search/fabric/sort state that belonged to it).
  const handleCategoryChange = (catName) => {
    if (!catName) {
      navigate("/products");
      return;
    }
    const category = categoriesData?.find((c) => c.name === catName);
    if (!category) return;
    const href = getCategoryHref(category);
    navigate(href || `/products?category=${category._id}`);
  };

  // Keep the current category page, just clear its filters.
  const handleReset = () => {
    navigate(categorySlug ? `/products/${categorySlug}` : "/products");
  };

  const heading = activeCategory ? activeCategory.name : "Our";
  const description = activeCategory
    ? `Explore our ${activeCategory.name.toLowerCase()} collection, developed with carefully selected fabrics, contemporary silhouettes and refined manufacturing standards.`
    : "Premium quality garments crafted with precision manufacturing. Browse our full range or filter by category and fabric type.";

  return (
    <div className="min-h-screen bg-white py-24 px-6 md:px-12 lg:px-16 font-sans text-black">
      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold block mb-4"
          >
            Product Portfolio
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase mb-6">
            {heading} <span className="font-bold">Collection.</span>
          </h1>
          <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Category showcase */}
        <CategoryShowcase categories={showcaseData} />

        {/* Item types for the current category */}
        {activeCategory && (
          <ProductTypeTabs
            types={categoryTypes}
            activeType={activeType?.key || ""}
            onTypeChange={(key) => updateParam("type", key)}
            label={activeCategory.name}
          />
        )}

        {/* Filter bar */}
        <ProductFilterBar
          categories={categories}
          fabrics={allFabrics}
          search={search}
          onSearchChange={(value) => updateParam("search", value)}
          category={activeCategory?.name || ""}
          onCategoryChange={handleCategoryChange}
          fabric={fabric}
          onFabricChange={(value) => updateParam("fabric", value)}
          sort={sort}
          onSortChange={(value) => updateParam("sort", value)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onReset={handleReset}
          totalResults={totalResults}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Listing */}
        {isPending ? (
          <ProductSkeleton />
        ) : visibleProducts.length === 0 ? (
          <EmptyState hasActiveFilters={hasActiveFilters} onReset={handleReset} />
        ) : viewMode === "grid" ? (
          <div className={GRID_CLASSES}>
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.035, 0.25) }}
                >
                  <ProductCard product={product} onQuickView={setSelectedProduct} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div>
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.035, 0.2) }}
                >
                  <ProductListItem product={product} onQuickView={setSelectedProduct} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;