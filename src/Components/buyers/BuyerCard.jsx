import { memo } from "react";
import { motion } from "framer-motion";

const BuyerCard = memo(({ buyer, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center gap-4 cursor-default transition-colors duration-300 hover:border-gray-300"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gray-50/0 via-gray-50/0 to-gray-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative w-24 h-16 flex items-center justify-center">
        <img
          src={buyer.logo?.url}
          alt={`${buyer.brandName} logo`}
          className="max-w-full max-h-full object-contain transition-all duration-500 ease-out group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <span className="relative text-sm font-medium text-gray-500 transition-colors duration-300 group-hover:text-gray-900 text-center leading-tight">
        {buyer.brandName}
      </span>
    </motion.div>
  );
});

BuyerCard.displayName = "BuyerCard";

export default BuyerCard;