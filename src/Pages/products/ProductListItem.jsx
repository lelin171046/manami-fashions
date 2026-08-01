import { motion } from "framer-motion";
import { Eye, ArrowRight } from "lucide-react";

const ProductListItem = ({ product, onQuickView, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group cursor-pointer border-b border-gray-100 py-8"
      onClick={() => onQuickView(product)}
    >
      <div className="flex items-start gap-8">
        {/* Image */}
        <div className="relative w-40 h-40 md:w-56 md:h-40 shrink-0 overflow-hidden bg-gray-50">
          <img
            src={product.images?.[0]?.url || product.image}
            alt={product.images?.[0]?.alt || product.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            loading="lazy"
          />
          {product.featured && (
            <div className="absolute top-3 left-3 bg-black text-white px-2 py-0.5 text-[8px] uppercase tracking-widest font-bold">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {(product.category?.name || product.category) && (
                  <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">
                    {product.category?.name || product.category}
                  </span>
                )}
              </div>
              <h3 className="text-xl md:text-2xl font-medium tracking-tight uppercase mb-2">
                {product.name}
              </h3>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
              className="p-2 text-gray-300 hover:text-black transition-colors shrink-0"
              aria-label={`Quick view ${product.name}`}
            >
              <Eye size={18} />
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-4 max-w-xl leading-relaxed">
            {product.description || "Premium quality garment crafted with precision manufacturing."}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-widest">
            {product.fabric && (
              <span className="text-gray-400">Fabric: <span className="text-black font-medium">{product.fabric}</span></span>
            )}
            {product.gsm && (
              <span className="text-gray-400">GSM: <span className="text-black font-medium">{product.gsm}</span></span>
            )}
            {product.moq && (
              <span className="text-gray-400">MOQ: <span className="text-black font-medium">{product.moq}</span></span>
            )}
          </div>

          {product.sizes?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {product.sizes.map((size) => (
                <span key={size} className="px-2 py-0.5 border border-gray-200 text-[9px] uppercase tracking-wider text-gray-400">
                  {size}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductListItem;
