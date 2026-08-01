import { motion } from "framer-motion";

const LoadingLogo = () => (
  <div className="flex flex-col items-center justify-center py-32">
    <motion.div
      animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="60" rx="12" fill="#18181b" />
        <text x="30" y="36" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="sans-serif">M</text>
      </svg>
    </motion.div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-sm text-gray-400 mt-4 tracking-wider uppercase"
    >
      Loading buyers
    </motion.p>
  </div>
);

export default LoadingLogo;