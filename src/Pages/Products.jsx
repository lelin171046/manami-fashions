import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2, AlertCircle, PackageX } from "lucide-react";

const categories = [
  {
    id: "men",
    label: "MEN'S WEAR",
    eyebrow: "01 / Menswear",
    description:
      "Contemporary essentials, casualwear, workwear, and performance-focused garments.",
    image: "/images/categories/menswear.jpg",
  },
  {
    id: "women",
    label: "WOMEN'S WEAR",
    eyebrow: "02 / Womenswear",
    description:
      "Fashion-led collections with versatile silhouettes, refined finishes, and flexible production.",
    image: "/images/categories/womenswear.jpg",
  },
  {
    id: "kids",
    label: "KIDS' WEAR",
    eyebrow: "03 / Kidswear",
    description:
      "Comfortable, durable, and carefully made apparel for infants, children, and young people.",
    image: "/images/categories/kidswear.jpg",
  },
];

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedAudience = searchParams.get("audience");

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const collectionRef = useRef(null);

  const selectedCategory = categories.find(
    (category) => category.id === selectedAudience
  );

  const selectCategory = (audience) => {
    setSearchParams({ audience });

    window.setTimeout(() => {
      collectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  };

  const clearCategory = () => {
    setSearchParams({});
    setProducts([]);
    setStatus("idle");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchProducts = async () => {
    if (!selectedAudience) return;

    const controller = new AbortController();

    try {
      setStatus("loading");
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/products/public?audience=${selectedAudience}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Unable to load products right now.");
      }

      const result = await response.json();

      setProducts(result.data ?? result.products ?? []);
      setStatus("success");
    } catch (requestError) {
      if (requestError.name === "AbortError") return;

      setError(
        requestError.message ||
          "Something went wrong while loading products."
      );

      setStatus("error");
    }

    return () => controller.abort();
  };

  useEffect(() => {
    const validAudience = categories.some(
      (category) => category.id === selectedAudience
    );

    if (!selectedAudience || !validAudience) {
      setProducts([]);
      setStatus("idle");
      return undefined;
    }

    fetchProducts();
  }, [selectedAudience]);

  return (
    <main className="min-h-screen bg-black text-white font-['Manrope',sans-serif]">
      {/* HERO SECTION */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500 mb-4">
            Our Product Range
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6">
            Built for Every <span className="font-semibold">Wardrobe.</span>
          </h1>

          <p className="max-w-2xl text-sm md:text-base text-neutral-400 leading-relaxed">
            We manufacture quality garments for international buyers across
            menswear, womenswear, and kidswear—supporting product development,
            bulk production, quality assurance, and reliable delivery.
          </p>
        </motion.div>
      </section>

      {/* CATEGORY SELECTION CARDS */}
      {!selectedAudience && (
        <section
          className="px-6 md:px-12 lg:px-20 pb-32 max-w-[1600px] mx-auto"
          aria-label="Product categories"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                type="button"
                onClick={() => selectCategory(category.id)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="group relative h-[480px] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 text-left shadow-2xl transition-all hover:border-red-500/50"
              >
                {/* BACKGROUND IMAGE */}
                <img
                  src={category.image}
                  alt={category.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />

                {/* GRADIENT OVERLAY */}
                <span className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* CARD CONTENT */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <span className="text-[11px] font-mono font-medium tracking-widest text-red-500 uppercase mb-2">
                    {category.eyebrow}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-light text-white mb-3">
                    {category.label}
                  </h2>
                  <p className="text-xs md:text-sm text-neutral-300 leading-relaxed mb-6 line-clamp-3">
                    {category.description}
                  </p>
                  <strong className="text-xs font-semibold uppercase tracking-wider text-white group-hover:text-red-400 flex items-center gap-2 transition-colors">
                    Explore Collection <ArrowRight size={14} />
                  </strong>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {/* SELECTED CATEGORY / PRODUCT COLLECTION DISPLAY */}
      {selectedCategory && (
        <section
          ref={collectionRef}
          className="px-6 md:px-12 lg:px-20 pb-32 max-w-[1600px] mx-auto pt-8"
          aria-live="polite"
        >
          {/* COLLECTION HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-neutral-800 pb-8 mb-12 gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-red-500 mb-2">
                Product Collection
              </p>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white">
                {selectedCategory.label}
              </h2>
            </div>

            <button
              type="button"
              onClick={clearCategory}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors border border-neutral-800 hover:border-neutral-600 px-4 py-2.5 rounded-lg bg-neutral-900/50"
            >
              <ArrowLeft size={14} /> All Categories
            </button>
          </div>

          {/* LOADING SKELETON STATE */}
          {status === "loading" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[380px] bg-neutral-900 border border-neutral-800/80 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          )}

          {/* ERROR STATE */}
          {status === "error" && (
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-12 text-center max-w-lg mx-auto my-12">
              <AlertCircle size={36} className="text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">
                Products could not be loaded
              </h3>
              <p className="text-xs text-neutral-400 mb-6">{error}</p>
              <button
                type="button"
                onClick={fetchProducts}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 px-6 py-3 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* EMPTY STATE */}
          {status === "success" && products.length === 0 && (
            <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-12 text-center max-w-lg mx-auto my-12">
              <PackageX size={36} className="text-neutral-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">
                Collection coming soon
              </h3>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                We are preparing product examples for this category. Please check
                another collection or contact us for sourcing inquiries.
              </p>
              <button
                type="button"
                onClick={clearCategory}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-800 hover:bg-neutral-700 px-6 py-3 rounded-lg transition-colors border border-neutral-700"
              >
                View All Categories
              </button>
            </div>
          )}

          {/* PRODUCT GRID */}
          {status === "success" && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => {
                const firstImage =
                  product.images?.[0]?.url ||
                  product.images?.[0] ||
                  "/images/product-placeholder.jpg";

                return (
                  <article
                    key={product._id}
                    className="group bg-neutral-900/60 border border-neutral-800/90 rounded-2xl overflow-hidden hover:border-red-500/40 transition-all duration-300 flex flex-col"
                  >
                    {/* PRODUCT IMAGE LINK */}
                    <Link
                      to={`/products/${product.slug}`}
                      className="relative block aspect-[4/5] overflow-hidden bg-neutral-950"
                    >
                      <img
                        src={firstImage}
                        alt={
                          product.images?.[0]?.alt ||
                          product.name ||
                          "Garment product"
                        }
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* PRODUCT DETAILS BODY */}
                    <div className="p-6 flex flex-col flex-grow">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 mb-1">
                        {product.category?.name || selectedCategory.label}
                      </p>

                      <h3 className="text-lg font-medium text-white mb-2 line-clamp-1 group-hover:text-red-300 transition-colors">
                        {product.name}
                      </h3>

                      {product.shortDescription && (
                        <p className="text-xs text-neutral-400 mb-6 line-clamp-2 leading-relaxed flex-grow">
                          {product.shortDescription}
                        </p>
                      )}

                      <Link
                        to={`/products/${product.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors mt-auto pt-4 border-t border-neutral-800/60"
                      >
                        View Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default Products;