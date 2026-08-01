import { motion } from "framer-motion";

const Skeleton = ({ index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.03 }}
    className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center gap-4"
  >
    <div className="w-24 h-16 rounded-lg bg-gray-100 animate-pulse" />
    <div className="w-20 h-3 rounded-full bg-gray-100 animate-pulse" />
  </motion.div>
);

const BuyerSkeleton = ({ count = 12 }) => (
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
    {Array.from({ length: count }, (_, i) => (
      <Skeleton key={i} index={i} />
    ))}
  </div>
);

export default BuyerSkeleton;