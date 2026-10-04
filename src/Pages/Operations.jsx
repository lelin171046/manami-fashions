import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowUpRight, CheckCircle2, Layers, Cpu, Gauge, Factory, Activity } from "lucide-react";

import api from "../api/axios.js";

// Hardcoded fallback matching exact data from your images
const HARDCODED_SECTIONS = {
  "Sewing": {
    stats: [
      { label: "Number of Sewing Lines", value: "20" },
      { label: "Number of Sewing Floor", value: "02" },
      { label: "Sewing Machines Capacity", value: "700" },
      { label: "Sewing Capacity/Day", value: "40,000 pcs / 7050 Hours" },
      { label: "Sewing Efficiency", value: "65%" },
    ],

  },
  "Cutting / CAD": {
    stats: [
      { label: "Number of Cutting Tables", value: "05" },
      { label: "Capacity/Day (Knit+Woven)", value: "45,000 pcs" },
      { label: "CAD Marker Efficiency", value: "85%" },
      { label: "Fabric Relaxation Capacity", value: "10 tons" },
      { label: "Cut Panels Check", value: "100%" },
      { label: "Printed/Embroidery Panel Check", value: "100%" },
      { label: "Replace Cut Point", value: "5" },
    ],
    captions: ["Cutting Room Floor", "CAD Marker Planning", "Auto Plotter", "Panel Verification"]
  }
};

/* Custom Embedded Sidebar Component */
const LocalLineSidebar = ({ items, activeIndex, onItemClick }) => {
  return (
    <div className="relative pl-4 border-l border-neutral-800 space-y-4">
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <button
            key={item}
            onClick={() => onItemClick(index)}
            className="group flex items-center gap-3 w-full text-left transition-all duration-300"
          >
            <span
              className={`text-[11px] font-mono transition-colors ${
                isActive ? "text-white font-semibold" : "text-neutral-500 group-hover:text-neutral-300"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={`text-sm tracking-wide transition-all ${
                isActive
                  ? "text-white font-medium translate-x-1"
                  : "text-neutral-400 group-hover:text-neutral-200"
              }`}
            >
              {item}
            </span>
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

const Operations = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: ops, isLoading } = useQuery({
    queryKey: ["public-operations"],
    queryFn: async () => {
      const { data } = await api.get("/operations/public");
      return data.data;
    },
  });

  const operations = useMemo(() => {
    if (!ops || ops.length === 0) {
      // Return hardcoded data array if database is empty
      return Object.entries(HARDCODED_SECTIONS).map(([title, data], i) => ({
        _id: `hardcoded-${i}`,
        title,
        step: i + 1,
        description:
          title === "Sewing"
            ? "We are consistently striving to enhance and reinvent our operations. Therefore, to entail perfection in every step of growth, we consider technological & engineering advancement to be the essence in providing optimal solutions."
            : "The integration of Auto CAD, plotter & auto pattern making & fabric relaxation technologies in our process of apparel manufacturing has brought innovation throughout.",
        stats: data.stats,
        captions: data.captions,
        image: ""
      }));
    }

    return ops.map((op, i) => {
      const title = op.title || `Section ${i + 1}`;
      const fallback = HARDCODED_SECTIONS[title] || HARDCODED_SECTIONS["Sewing"];

      return {
        ...op,
        image: op.image?.url || "",
        step: op.step || i + 1,
        stats: op.stats || op.heroStats || fallback.stats,
        captions: op.captions || fallback.captions
      };
    });
  }, [ops]);

  const activeOperation = operations[activeIndex];
  const sidebarItems = operations.map((op) => op.title);

  return (
    <main className="min-h-screen bg-black text-white font-['Manrope',sans-serif]">
      {/* HEADER */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500 mb-5">
              Production Capabilities
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[-0.055em] leading-[0.9] text-white">
              Our <span className="font-semibold tracking-[-0.065em]">Operations.</span>
            </h1>

            <p className="mt-7 max-w-xl text-sm md:text-[15px] leading-[1.8] tracking-[-0.01em] text-neutral-400">
              Departmental breakdown, machinery capacity, line efficiencies, and technology integration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      {isLoading ? (
        <div className="flex items-center justify-center py-40">
          <Loader2 size={24} className="text-neutral-500 animate-spin" />
        </div>
      ) : operations.length === 0 ? (
        <div className="text-center py-40">
          <p className="text-neutral-500 text-sm uppercase tracking-[0.2em]">No operations found</p>
        </div>
      ) : (
        <section className="px-6 md:px-12 lg:px-20 pb-32">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
            {/* SIDEBAR */}
            <aside className="lg:sticky lg:top-28">
              <div className="mb-5">
                <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-neutral-500">
                  Sections
                </span>
              </div>

              <LocalLineSidebar
                items={sidebarItems}
                activeIndex={activeIndex}
                onItemClick={(index) => setActiveIndex(index)}
              />
            </aside>

            {/* CONTENT DISPLAY */}
            <div className="min-w-0">
              <AnimatePresence mode="wait">
                {activeOperation && (
                  <motion.article
                    key={activeOperation._id || activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    {/* SECTION TITLE & DESCRIPTION */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs uppercase tracking-[0.2em] text-red-500 font-semibold">
                          Section {String(activeOperation.step).padStart(2, "0")}
                        </span>
                        <ArrowUpRight size={22} className="text-neutral-500" />
                      </div>
                      <h2 className="text-3xl md:text-5xl font-light tracking-[-0.04em] text-white">
                        {activeOperation.title}
                      </h2>
                      <p className="mt-4 text-sm md:text-base leading-[1.8] text-neutral-400 max-w-3xl">
                        {activeOperation.description}
                      </p>
                    </div>

                    {/* MAIN IMAGE & SPECIFICATION GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
                      
                      {/* LEFT: IMAGE DISPLAY CARD */}
                      <div className="space-y-3">
                        <div className="relative w-full h-[380px] md:h-[480px] overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl">
                          {activeOperation.image ? (
                            <img
                              src={activeOperation.image}
                              alt={activeOperation.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600 bg-neutral-900/80 p-6 text-center">
                              <Factory size={48} className="mb-3 text-neutral-700" />
                              <p className="text-xs uppercase tracking-widest text-neutral-500">
                                {activeOperation.title} Floor Photo
                              </p>
                            </div>
                          )}

                          {/* GRADIENT OVERLAY */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                          {/* OVERLAID BADGE AT BOTTOM OF IMAGE */}
                          <div className="absolute bottom-6 left-6 right-6">
                            <span className="text-[11px] font-medium tracking-wide text-white/90 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 inline-block">
                              {activeOperation.title} Operational Unit
                            </span>
                          </div>
                        </div>

                        {/* IMAGE CAPTION / FOOTER LABELS */}
                        {activeOperation.captions && (
                          <p className="text-xs text-neutral-500 font-mono pl-1">
                            {activeOperation.captions.join(" — ")}
                          </p>
                        )}
                      </div>

                      {/* RIGHT: DYNAMIC SECTION STATS CARDS */}
                      <div className="space-y-3">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-500 mb-2 pl-1">
                          Key Operational Metrics
                        </p>

                        {activeOperation.stats?.map((stat, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-neutral-900/80 border border-neutral-800/90 rounded-xl p-4 flex items-center justify-between hover:border-red-500/40 transition-colors"
                          >
                            <span className="text-xs md:text-sm text-neutral-300 font-medium">
                              {stat.label}
                            </span>
                            <span className="text-sm md:text-base font-semibold text-red-400 font-mono bg-red-950/30 px-3 py-1 rounded-md border border-red-900/30">
                              {stat.value}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                    </div>
                  </motion.article>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Operations;