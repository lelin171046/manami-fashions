import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import api from "../api/axios.js";
import { ScrollStack } from "../Components/ScrollStack";

const PRODUCTION_STATS = [
  { label: "Daily Output", value: "25,000 pcs" },
  { label: "Operators", value: "100+" },
  { label: "Machines", value: "60+" },
  { label: "QC Stages", value: "6 levels" },
  { label: "Fabric Use", value: "95%" },
  { label: "Defect Rate", value: "<0.5%" },
];

const Operations = () => {
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

        {/* Operations Scroll Stack */}
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 size={24} className="text-gray-300 animate-spin" />
          </div>
        ) : operations.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-gray-300 text-lg uppercase tracking-widest">No operations found</p>
          </div>
        ) : (
          <>
            <ScrollStack
              cards={operations.map((op, index) => ({
                id: op._id,
                title: op.title,
                description: op.description,
                image: op.image?.url || op.image,
                details: op.details,
                step: op.step || index + 1,
              }))}
              className="mb-24"
            />
            
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
          </>
        )}
      </div>
    </div>
  );
};

export default Operations;