import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2, AlertCircle, PackageX, ChevronLeft, ChevronRight } from "lucide-react";
import productService from "./products/productService";
import CircularCarousel from "../Components/CircularCarousel";

const categories = [
  {
    id: "men",
    label: "MEN'S WEAR",
    eyebrow: "01 / Menswear",
    description:
      "Contemporary essentials, casualwear, workwear, and performance-focused garments.",
    image: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1791317629/pexels-glassesshop-gs-1317359316-30587667_odbrhh.jpg",
  },
  {
    id: "women",
    label: "WOMEN'S WEAR",
    eyebrow: "02 / Womenswear",
    description:
      "Fashion-led collections with versatile silhouettes, refined finishes, and flexible production.",
    image: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1791317185/portrait-brutal-sportive-woman-hood-sportswear-white_pv5sph.jpg",
  },
  {
    id: "kids",
    label: "KIDS' WEAR",
    eyebrow: "03 / Kidswear",
    description:
      "Comfortable, durable, and carefully made apparel for infants, children, and young people.",
    image: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1791317852/little-fashionista-colored-background-mom-s-shoes_j2ovij.jpg",
  },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedAudience = searchParams.get("audience");

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1, hasNext: false, hasPrev: false });

  // Carousel products state
  const [carouselProducts, setCarouselProducts] = useState([]);
  const [carouselLoading, setCarouselLoading] = useState(false);

  const collectionRef = useRef(null);
  const paginationRef = useRef(null);

  const selectedCategory = categories.find(
    (category) => category.id === selectedAudience
  );

  const selectCategory = (audience) => {
    setSearchParams({ audience });
    setPage(1);

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
    setPage(1);
    setMeta({ total: 0, totalPages: 1, hasNext: false, hasPrev: false });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchProducts = async () => {
    if (!selectedAudience) return;

    try {
      setStatus("loading");
      setError("");

      const result = await productService.getPublicProducts(selectedAudience, { page, limit: 12 });

      setProducts(result.data ?? []);
      setMeta(result.meta ?? { total: 0, totalPages: 1, hasNext: false, hasPrev: false });
      setStatus("success");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Something went wrong while loading products."
      );
      setStatus("error");
    }
  };

  // Fetch products for CircularCarousel (all audiences, all images)
  const fetchCarouselProducts = async () => {
    try {
      setCarouselLoading(true);
      // Get all products from all audiences (featured first, then by sortOrder)
      // We'll fetch from each audience and combine
      const [menResult, womenResult, kidsResult] = await Promise.all([
        productService.getPublicProducts("men", { page: 1, limit: 20, sort: "sortOrder" }),
        productService.getPublicProducts("women", { page: 1, limit: 20, sort: "sortOrder" }),
        productService.getPublicProducts("kids", { page: 1, limit: 20, sort: "sortOrder" }),
      ]);

      // Combine all products
      const allProducts = [
        ...(menResult.data ?? []),
        ...(womenResult.data ?? []),
        ...(kidsResult.data ?? []),
      ];

      // Sort: featured first, then by sortOrder
      allProducts.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
      });

      // Flatten ALL images from ALL products into carousel items
      const carouselItems = allProducts.flatMap((product) => {
        const images = product.images ?? [];
        if (images.length === 0) {
          return [{
            src: "/images/product-placeholder.jpg",
            alt: product.name || "Product",
            title: product.name,
            subtitle: product.category?.name || product.audience || "Product",
          }];
        }
        return images.map((img, idx) => ({
          src: img.url,
          alt: img.alt || `${product.name} ${idx + 1}`,
          title: product.name,
          subtitle: product.category?.name || product.audience || "Product",
        }));
      });

      setCarouselProducts(carouselItems);
    } catch (err) {
      console.error("Failed to load carousel products:", err);
      setCarouselProducts([]);
    } finally {
      setCarouselLoading(false);
    }
  };

  useEffect(() => {
    const validAudience = categories.some(
      (category) => category.id === selectedAudience
    );

    if (!selectedAudience || !validAudience) {
      setProducts([]);
      setStatus("idle");
      setMeta({ total: 0, totalPages: 1, hasNext: false, hasPrev: false });
      return undefined;
    }

    fetchProducts();
  }, [selectedAudience, page]);

  // Fetch carousel products on mount
  useEffect(() => {
    fetchCarouselProducts();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > meta.totalPages) return;
    setPage(newPage);
    window.setTimeout(() => {
      paginationRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  return (
    <main className="min-h-screen bg-none text-white font-['Manrope',sans-serif]">
      {/* HERO SECTION */}
      <section className="pt-16 pb-5 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500 mb-4">
            Our Product Range
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-black mb-6">
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
          className="px-6 md:px-12 lg:px-20 pb-2 max-w-[1600px] mx-auto pt-4"
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
            <div>
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
              {meta.totalPages > 1 && (
                <div ref={paginationRef} className="mt-12 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={!meta.hasPrev}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white/80 bg-neutral-900/60 border border-neutral-800 rounded-lg hover:bg-neutral-800/80 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(meta.totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (meta.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= meta.totalPages - 2) {
                        pageNum = meta.totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-8 h-8 text-sm font-medium rounded-lg transition-colors ${
                            page === pageNum
                              ? "bg-red-500 text-white"
                              : "text-white/80 bg-neutral-900/60 border border-neutral-800 hover:bg-neutral-800/80 hover:text-white"
                          }`}
                          aria-label={`Page ${pageNum}`}
                          aria-current={page === pageNum ? "page" : undefined}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={!meta.hasNext}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white/80 bg-neutral-900/60 border border-neutral-800 rounded-lg hover:bg-neutral-800/80 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {meta.total > 0 && (
                <p className="mt-8 text-center text-xs text-neutral-500">
                  Showing {Math.min((page - 1) * 12 + 1, meta.total)} - {Math.min(page * 12, meta.total)} of {meta.total} products
                </p>
              )}
              </div>
            )}
          </section>
        )}

      {/* CIRCULAR CAROUSEL - All Products Showcase */}
      <section className="px-6 md:px-12 lg:px-20 pb-20 max-w-[1600px] mx-auto">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-mono font-medium tracking-widest text-red-500 uppercase mb-2">
            All Collections
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black ">
            Explore Our Complete Range
          </h2>
        </div>

        <div style={{ width: "100%", height: "560px", position: "relative" }}>
          {carouselLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 size={48} className="text-red-500 animate-spin" />
            </div>
          ) : carouselProducts.length > 0 ? (
            <CircularCarousel
              items={carouselProducts}
              preset="cylinder"
              intro="rise"
              cardWidth={420}
              aspectRatio={1}
              speed={14}
              captions={false}
              gap={25}
              tilt={-5}
              curve={1}
              perspective={2500}
              autoplay="drift"
              interval={3}
              direction="left"
              momentum={0.6}
              snap
              pauseOnHover
              focusOnClick
              draggable
              parallax={0.3}
              stretch={0.5}
              fadeColor="#000000"
              depthFade={0.55}
              innerShade={0.6}
              cornerRadius={22}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
              <p className="text-center">No products available for showcase</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Products;