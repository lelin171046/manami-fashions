import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowUpRight } from "lucide-react";

import api from "../api/axios.js";

const PRODUCTION_STATS = [
  { label: "Daily Output", value: "25,000 pcs" },
  { label: "Operators", value: "100+" },
  { label: "Machines", value: "60+" },
  { label: "QC Stages", value: "6 levels" },
  { label: "Fabric Use", value: "95%" },
  { label: "Defect Rate", value: "<0.5%" },
];

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
                className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
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
    if (!ops) return [];

    return ops.map((op, i) => ({
      ...op,
      image: op.image?.url || "",
      step: op.step || i + 1,
    }));
  }, [ops]);

  const activeOperation = operations[activeIndex];
  const sidebarItems = operations.map((op) => op.title);

  const renderDetails = (details) => {
    if (!details) return null;

    if (Array.isArray(details)) {
      return (
        <ul className="space-y-3">
          {details.map((item, index) => (
            <li key={index} className="flex gap-3 text-sm text-neutral-400 leading-relaxed">
              <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (typeof details === "object") {
      return (
        <div className="space-y-3">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 min-w-[120px]">
                {key}
              </span>
              <span className="text-sm text-neutral-200">{String(value)}</span>
            </div>
          ))}
        </div>
      );
    }

    return <p className="text-sm md:text-[15px] leading-[1.8] text-neutral-300">{details}</p>;
  };

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
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400 mb-5">
              How We Manufacture
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[-0.055em] leading-[0.9] text-white">
              Our <span className="font-semibold tracking-[-0.065em]">Operations.</span>
            </h1>

            <p className="mt-7 max-w-xl text-sm md:text-[15px] leading-[1.8] tracking-[-0.01em] text-neutral-400">
              Complete garment production workflow — from sample development to final finishing — executed with precision at every step.
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
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
            {/* SIDEBAR */}
            <aside className="lg:sticky lg:top-28">
              <div className="mb-5">
                <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-neutral-500">
                  Production Process
                </span>
              </div>

              <LocalLineSidebar
                items={sidebarItems}
                activeIndex={activeIndex}
                onItemClick={(index) => setActiveIndex(index)}
              />
            </aside>

            {/* CONTENT CARD */}
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
                    {/* HERO CONTAINER WITH BLURRED IMAGE & WHITE OVERLAY */}
                    <div className="relative w-full h-[450px] md:h-[580px] lg:h-[650px] overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800/80 shadow-2xl">
                      {activeOperation.image ? (
                        <motion.img
                          key={activeOperation.image}
                          src={activeOperation.image}
                          alt={activeOperation.title}
                          initial={{ scale: 1.08, filter: "blur(12px)" }}
                          animate={{ scale: 1.02, filter: "blur(6px)" }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="w-full h-full object-cover opacity-60 transform scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-600">
                          No image available
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 backdrop-blur-[2px]" />

                      <div className="absolute inset-x-8 bottom-8 md:inset-x-12 md:bottom-12 flex flex-col justify-end z-10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-white/70">
                            Step {String(activeOperation.step).padStart(2, "0")}
                          </span>
                          <ArrowUpRight size={26} strokeWidth={1.2} className="text-white/80" />
                        </div>

                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.04em] text-white leading-none">
                          {activeOperation.title}
                        </h2>
                      </div>
                    </div>

                    {/* DETAILS BELOW HERO */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 pt-10">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-neutral-500 mb-4">
                          Manufacturing Process
                        </p>
                        <p className="text-base md:text-lg font-light leading-[1.8] tracking-[-0.015em] text-neutral-300 max-w-2xl">
                          {activeOperation.description}
                        </p>
                      </div>

                      {activeOperation.details && (
                        <div className="lg:border-l lg:border-neutral-800/80 lg:pl-10">
                          <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-neutral-500 mb-5">
                            Process Details
                          </p>
                          {renderDetails(activeOperation.details)}
                        </div>
                      )}
                    </div>
                  </motion.article>
                )}
              </AnimatePresence>

              {/* STATS */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-28 pt-16 border-t border-neutral-800/80"
              >
                <div className="mb-10">
                  <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-neutral-500 mb-3">
                    By The Numbers
                  </p>
                  <h2 className="text-3xl md:text-4xl font-light tracking-[-0.045em] text-white">
                    Production <span className="font-semibold text-white">Capacity</span>
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-neutral-800 border border-neutral-800 rounded-xl overflow-hidden">
                  {PRODUCTION_STATS.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-neutral-950 p-6 md:p-7 hover:bg-white hover:text-black transition-all duration-500 group"
                    >
                      <div className="text-2xl md:text-3xl font-light tracking-[-0.04em] mb-2 text-white group-hover:text-black transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-[9px] uppercase tracking-[0.18em] text-neutral-500 group-hover:text-neutral-700 transition-colors">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Operations;