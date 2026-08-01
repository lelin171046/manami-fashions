import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const ProductCard = ({ product, onQuickView, index = 0 }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group cursor-pointer"
      onClick={() => onQuickView(product)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-6">
        <img
          src={product.images?.[0]?.url || product.image}
          alt={product.images?.[0]?.alt || product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          loading="lazy"
        />

        {product.category?.name && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[9px] uppercase tracking-widest font-bold">
            {product.category.name}
          </div>
        )}
        {!product.category?.name && product.category && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[9px] uppercase tracking-widest font-bold">
            {product.category}
          </div>
        )}

        {/* Quick View overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="bg-white px-5 py-2.5 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
              <Eye size={14} />
              Quick View
            </div>
          </motion.div>
        </div>

        {product.featured && (
          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[9px] uppercase tracking-widest font-bold">
            Featured
          </div>
        )}
      </div>

      <div className="flex justify-between items-start border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-medium tracking-tight uppercase mb-1">{product.name}</h3>
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            {product.fabric || product.description?.slice(0, 60) || ""}
          </p>
        </div>
        <div className="text-right shrink-0 ml-4">
          {product.gsm && (
            <span className="text-[10px] text-gray-500 font-light italic block">{product.gsm} GSM</span>
          )}
          {product.moq && (
            <span className="text-[10px] text-gray-400 font-light italic block mt-1">MOQ: {product.moq}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
