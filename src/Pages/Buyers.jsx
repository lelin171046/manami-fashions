import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Shield, Clock, BarChart3, TrendingDown } from "lucide-react";
import api from "../api/axios.js";
import BuyerCard from "../Components/buyers/BuyerCard.jsx";
import BuyerSkeleton from "../Components/buyers/BuyerSkeleton.jsx";
import EmptyState from "../Components/buyers/EmptyState.jsx";
import LoadingLogo from "../Components/buyers/BuyerLoading.jsx";

const STATS = [
  { value: "50+", label: "Global Brands", icon: BarChart3 },
  { value: "10+", label: "Years Experience", icon: Clock },
  { value: "5M+", label: "Garments Produced", icon: Shield },
  { value: "99.8%", label: "Quality Score", icon: TrendingDown },
];

const FEATURES = [
  { title: "Fast Turnaround", desc: "7-30 days delivery" },
  { title: "High Quality", desc: "99.8% pass rate" },
  { title: "Global Standard", desc: "BSCI compliant" },
  { title: "Factory Price", desc: "Competitive cost" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Buyers = () => {
  const { data: buyers, isLoading, isError } = useQuery({
    queryKey: ["public-buyers"],
    queryFn: async () => {
      const { data } = await api.get("/buyers/public");
      return data.data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-light tracking-tighter uppercase mb-4">
            Trusted By <span className="font-bold">Leading Brands</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Our garments are trusted by international fashion brands who value quality and reliability.
          </p>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                variants={childVariants}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <stat.icon size={20} className="text-gray-300 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <motion.div variants={childVariants} className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-tighter uppercase">
              Our <span className="font-bold">Buyers</span>
            </h2>
          </motion.div>

          {isLoading ? (
            <LoadingLogo />
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-red-400 text-sm">Failed to load buyers. Please try again.</p>
            </div>
          ) : !buyers?.length ? (
            <EmptyState />
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3"
            >
              {buyers.map((buyer, i) => (
                <BuyerCard key={buyer._id} buyer={buyer} index={i} />
              ))}
            </motion.div>
          )}
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
          className="text-center"
        >
          <motion.div variants={childVariants}>
            <h2 className="text-3xl font-light tracking-tighter uppercase mb-12">
              Why Brands <span className="font-bold">Choose Us</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((item, i) => (
              <motion.div
                key={i}
                variants={childVariants}
                className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Buyers;