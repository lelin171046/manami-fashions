import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Box, ChevronRight, Loader2 } from "lucide-react";
import api from "../api/axios.js";

const PRODUCTION_STATS = [
  { label: "Daily Output", value: "25,000 pcs" },
  { label: "Operators", value: "100+" },
  { label: "Machines", value: "60+" },
  { label: "QC Stages", value: "6 levels" },
  { label: "Fabric Use", value: "95%" },
  { label: "Defect Rate", value: "<0.5%" },
];

const Operations = () => {
  const [activeSection, setActiveSection] = useState(0);

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
    }));
  }, [ops]);

  const activeOp = operations[activeSection];

  return (
    <div className="min-h-screen bg-white py-24 px-6 md:px-20 font-sans text-black">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold block mb-4"
          >
            How We Manufacture
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase mb-6">
            Our <span className="font-bold">Operations.</span>
          </h1>
          <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
            Complete garment production workflow — from sample development to final finishing — executed with precision at every step.
          </p>
        </motion.div>

        {/* Operations Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 size={24} className="text-gray-300 animate-spin" />
          </div>
        ) : operations.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-gray-300 text-lg uppercase tracking-widest">No operations found</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[320px_1fr] gap-12 lg:gap-16 mb-24">
            {/* Sidebar — operation steps (title only) */}
            <div className="lg:border-t lg:border-black lg:self-start lg:sticky lg:top-24">
              {operations.map((op, index) => {
                const active = activeSection === index;
                return (
                  <motion.button
                    key={op._id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.06 }}
                    onClick={() => setActiveSection(index)}
                    className={`group w-full text-left border-b border-gray-100 py-6 px-4 lg:px-5 flex items-center justify-between gap-4 transition-all duration-500 ${
                      active
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center gap-5 min-w-0">
                      <span
                        className={`text-[10px] tracking-[0.3em] font-bold ${
                          active ? "text-gray-400" : "text-gray-300"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className={`text-lg font-medium tracking-tight uppercase truncate ${
                          active ? "text-white" : "text-black"
                        }`}
                      >
                        {op.title}
                      </h3>
                    </span>
                    <ChevronRight
                      size={18}
                      className={`shrink-0 transition-all duration-300 ${
                        active
                          ? "text-gray-300 opacity-100 translate-x-0"
                          : "text-gray-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* Active Section Detail */}
            <div className="lg:border-l lg:border-gray-100 lg:pl-14">
              <AnimatePresence mode="wait">
                {activeOp && (
                  <motion.div
                    key={activeOp._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.05 }}
                      className="overflow-hidden mb-10"
                    >
                      {activeOp.image ? (
                        <img
                          src={activeOp.image}
                          alt={activeOp.title}
                          className="w-full aspect-[16/10] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full aspect-[16/10] bg-gray-100 flex items-center justify-center">
                          <Box size={48} className="text-gray-200" />
                        </div>
                      )}
                    </motion.div>

                    <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-bold block mb-4">
                      Step {activeOp.step}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-light tracking-tighter uppercase mb-6 leading-tight">
                      {activeOp.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                      {activeOp.description}
                    </p>
                    {activeOp.details?.length > 0 && (
                      <ul className="space-y-3">
                        {activeOp.details.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.08 }}
                            className="flex items-center gap-3 text-sm text-gray-600"
                          >
                            <span className="w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Production Capacity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-gray-100 pt-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold block mb-4 text-center"
          >
            By The Numbers
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter uppercase text-center mb-12">
            Production <span className="font-bold">Capacity</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PRODUCTION_STATS.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-gray-50 p-6 text-center hover:bg-black hover:text-white transition-all duration-500 group"
              >
                <div className="text-2xl md:text-3xl font-bold tracking-tight mb-2 group-hover:text-white transition-colors">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom tags */}
      
      </div>
    </div>
  );
};

export default Operations;