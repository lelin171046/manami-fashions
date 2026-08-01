import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import api from "../api/axios.js";
import ProductFilterBar from "./products/ProductFilterBar.jsx";
import ProductCard from "./products/ProductCard.jsx";
import ProductListItem from "./products/ProductListItem.jsx";
import ProductModal from "./products/ProductModal.jsx";

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [fabric, setFabric] = useState("");
  const [sort, setSort] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: categoriesData } = useQuery({
    queryKey: ["public-categories"],
    queryFn: async () => {
      const { data } = await api.get("/categories/public");
      return data.data;
    },
  });

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (fabric) params.append("fabric", fabric);
    if (sort) params.append("sort", sort);
    return params.toString();
  }, [search, category, fabric, sort]);

  const { data: productsRes, isLoading } = useQuery({
    queryKey: ["public-products", queryParams],
    queryFn: async () => {
      const { data } = await api.get(`/products/public?${queryParams}`);
      return data;
    },
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

  const allFabrics = useMemo(() => {
    if (!productsRes?.data) return [];
    return [...new Set(productsRes.data.map((p) => p.fabric).filter(Boolean))].sort();
  }, [productsRes]);

  const categories = useMemo(() => {
    if (!categoriesData) return [];
    return categoriesData.map((c) => c.name).sort();
  }, [categoriesData]);

  const categoryIdMap = useMemo(() => {
    if (!categoriesData) return {};
    const map = {};
    categoriesData.forEach((c) => { map[c.name] = c._id; });
    return map;
  }, [categoriesData]);

  const totalResults = productsRes?.meta?.total ?? products.length;

  const hasActiveFilters = !!(search || category || fabric || sort);

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setFabric("");
    setSort("");
  };

  const handleCategoryChange = (catName) => {
    setCategory(catName ? categoryIdMap[catName] || catName : "");
  };

  return (
    <div className="min-h-screen bg-white py-24 px-6 md:px-20 font-sans text-black">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold block mb-4"
          >
            Product Portfolio
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase mb-6">
            Our <span className="font-bold">Collection.</span>
          </h1>
          <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
            Premium quality garments crafted with precision manufacturing. Browse our full range or filter by category and fabric type.
          </p>
        </div>

        {/* Filters */}
        <ProductFilterBar
          categories={categories}
          fabrics={allFabrics}
          search={search}
          onSearchChange={setSearch}
          category={category ? (categoryIdMap[category] ? category : "") : ""}
          onCategoryChange={handleCategoryChange}
          fabric={fabric}
          onFabricChange={setFabric}
          sort={sort}
          onSortChange={setSort}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onReset={handleReset}
          totalResults={totalResults}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Products */}
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 size={24} className="text-gray-300 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-gray-300 text-lg uppercase tracking-widest">No products found</p>
            {hasActiveFilters && (
              <button onClick={handleReset} className="mt-4 text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors border-b border-gray-300 hover:border-black pb-0.5">
                Clear all filters
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            <AnimatePresence mode="popLayout">
              {products.map((product, i) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onQuickView={setSelectedProduct}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div>
            <AnimatePresence mode="popLayout">
              {products.map((product, i) => (
                <ProductListItem
                  key={product._id}
                  product={product}
                  onQuickView={setSelectedProduct}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Bottom decoration — matches Hero.jsx */}
        <div className="mt-24 flex flex-wrap gap-x-12 gap-y-4 opacity-40 grayscale">
          {["100% Export Oriented", "BSCI Grade A", "ISO Certified", "BGMEA Registered"].map((tag) => (
            <div key={tag} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span className="text-[10px] uppercase tracking-widest font-bold">{tag}</span>
            </div>
          ))}
        </div>
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
