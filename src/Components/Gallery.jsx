import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, AlertTriangle } from "lucide-react";
import api from "../api/axios.js";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "factory", label: "Factory" },
  { value: "team", label: "Team" },
  { value: "events", label: "Events" },
  { value: "production", label: "Production" },
];

const CATEGORY_LABELS = {
  factory: "Factory",
  team: "Team",
  events: "Events",
  production: "Production",
};

const dateParts = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  return {
    day: d.getDate(),
    month: d.toLocaleString("en-US", { month: "short" }),
    year: d.getFullYear(),
    full: d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }),
  };
};

const HighlightRowSkeleton = () => (
  <div className="flex flex-col lg:flex-row overflow-hidden rounded-md shadow-sm bg-white">
    <div className="h-80 lg:h-auto lg:w-1/2 bg-gray-200 animate-pulse" />
    <div className="flex flex-col justify-center flex-1 p-6 lg:p-10 space-y-3">
      <div className="h-3 w-24 bg-gray-200 animate-pulse rounded" />
      <div className="h-7 w-3/4 bg-gray-200 animate-pulse rounded" />
      <div className="h-4 w-full bg-gray-100 animate-pulse rounded" />
      <div className="h-4 w-2/3 bg-gray-100 animate-pulse rounded" />
      <div className="h-9 w-28 bg-gray-200 animate-pulse rounded-md mt-2" />
    </div>
  </div>
);

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const { data: items, isLoading, isError } = useQuery({
    queryKey: ["public-gallery"],
    queryFn: async () => {
      const { data } = await api.get("/gallery/public");
      return data.data || [];
    },
  });

  const filtered = useMemo(() => {
    if (!items) return [];
    if (activeCategory === "all") return items;
    return items.filter((i) => i.category === activeCategory);
  }, [items, activeCategory]);

  const counts = useMemo(() => {
    const map = { all: items?.length || 0 };
    CATEGORIES.slice(1).forEach((c) => {
      map[c.value] = items?.filter((i) => i.category === c.value).length || 0;
    });
    return map;
  }, [items]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );
  const nextImage = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i + 1) % filtered.length)),
    [filtered.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  const current = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Highlights</p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tighter uppercase mb-4">
            Moments That <span className="font-bold">Define Us</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            A glimpse into our factory, our people, and the craftsmanship behind every garment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {CATEGORIES.map((c) => {
            const active = activeCategory === c.value;
            return (
              <button
                key={c.value}
                onClick={() => { setActiveCategory(c.value); setLightboxIndex(null); }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-gray-500 hover:text-gray-900 hover:shadow-sm"
                }`}
              >
                {c.label}
                <span className={`ml-1.5 text-xs ${active ? "text-white/60" : "text-gray-400"}`}>{counts[c.value]}</span>
              </button>
            );
          })}
        </motion.div>

        {isLoading ? (
          <div className="space-y-10">
            {[1, 2, 3].map((n) => <HighlightRowSkeleton key={n} />)}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <AlertTriangle size={32} className="text-red-400 mb-3" />
            <p className="text-red-400 text-sm">Failed to load gallery. Please try again.</p>
          </div>
        ) : !filtered.length ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
              <Camera size={24} className="text-gray-300" />
            </div>
            <p className="text-gray-700 font-semibold">No highlights yet</p>
            <p className="text-gray-400 text-sm mt-1">New moments will appear here soon.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {filtered.map((item, i) => {
              const reverse = i % 2 === 1;
              const dp = dateParts(item.createdAt);
              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`flex flex-col overflow-hidden rounded-md shadow-sm bg-white lg:flex-row ${
                    reverse ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: reverse ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative overflow-hidden lg:w-1/2"
                  >
                    <img
                      src={item.image?.url}
                      alt={item.title}
                      loading="lazy"
                      className="h-80 lg:h-full w-full aspect-video lg:aspect-auto object-cover"
                    />
                    {dp && (
                      <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm rounded-lg shadow-sm px-3 py-2 text-center">
                        <span className="block text-lg font-bold leading-none text-gray-900">{dp.day}</span>
                        <span className="block text-[10px] uppercase tracking-widest text-gray-400 mt-1">
                          {dp.month} {dp.year}
                        </span>
                      </div>
                    )}
                  </motion.div>

                  <div className="flex flex-col justify-center flex-1 p-6 lg:p-10">
                    <motion.span
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-xs uppercase tracking-[0.2em] text-gray-400"
                    >
                      {CATEGORY_LABELS[item.category] || item.category}
                    </motion.span>
                    <motion.h3
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-3xl font-bold mt-2 text-gray-900"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="my-6 text-gray-600"
                    >
                      {item.description || "A moment from our journey — captured for the world to see."}
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className="self-start px-6 py-2.5 rounded-md bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Read More
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            {filtered.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 sm:left-6 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 sm:right-6 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <motion.div
              key={current._id}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col overflow-hidden rounded-lg bg-gray-50 shadow-2xl">
                <img
                  src={current.image?.url}
                  alt={current.title}
                  className="w-full h-60 sm:h-96 object-cover"
                />
                <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-5 sm:px-10 sm:mx-12 w-[calc(100%-2rem)] bg-white lg:max-w-2xl rounded-md shadow-sm">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
                      {CATEGORY_LABELS[current.category] || current.category}
                    </span>
                    <h3 className="text-2xl font-semibold sm:text-3xl text-gray-900 leading-tight">
                      {current.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      By <span className="font-semibold text-gray-800">Manami Fashions</span>
                      {dateParts(current.createdAt) && (
                        <> · {dateParts(current.createdAt).full}</>
                      )}
                    </p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {current.description || "A moment from our journey — captured for the world to see."}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
