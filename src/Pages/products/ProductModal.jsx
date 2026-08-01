import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ProductModal = ({ product, onClose }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);

  if (!product) return null;

  const images = product.images?.length > 0
    ? product.images.map((img) => img.url)
    : product.image
      ? [product.image]
      : [];

  const colors = product.colors || [];
  const sizes = product.sizes || [];
  const categoryName = product.category?.name || product.category || "";

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Image Gallery */}
            <div className="relative bg-gray-50">
              {images.length > 0 && (
                <>
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={images[currentImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white transition-colors"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white transition-colors"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}

                  {/* Thumbnails */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }}
                          className={`w-2 h-2 rounded-full transition-colors ${i === currentImage ? "bg-black" : "bg-white/60 hover:bg-white"}`}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Details */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              {categoryName && (
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold block mb-4">
                  {categoryName}
                </span>
              )}

              <h2 className="text-3xl md:text-4xl font-light tracking-tighter uppercase mb-6 leading-tight">
                {product.name}
              </h2>

              {product.description && (
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                  {product.description}
                </p>
              )}

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-gray-100">
                {product.fabric && (
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Fabric</span>
                    <span className="text-sm text-gray-700">{product.fabric}</span>
                  </div>
                )}
                {product.gsm && (
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block mb-1">GSM</span>
                    <span className="text-sm text-gray-700">{product.gsm}</span>
                  </div>
                )}
                {product.moq && (
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block mb-1">MOQ</span>
                    <span className="text-sm text-gray-700">{product.moq}</span>
                  </div>
                )}
                {product.details && (
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Details</span>
                    <span className="text-sm text-gray-700">{product.details}</span>
                  </div>
                )}
              </div>

              {/* Colors */}
              {colors.length > 0 && (
                <div className="mb-6">
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block mb-3">Colors</span>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.hex || color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-3 py-1.5 border transition-all duration-200 ${
                          selectedColor?.name === color.name
                            ? "border-black"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-gray-200"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-[10px] uppercase tracking-wider text-gray-600">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {sizes.length > 0 && (
                <div className="mb-8">
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block mb-3">Sizes Available</span>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <span
                        key={size}
                        className="px-3 py-1.5 border border-gray-200 text-[10px] uppercase tracking-widest font-bold text-gray-500"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Inquire */}
              <a
                href={`/contact?subject=Inquiry about ${encodeURIComponent(product.name)}`}
                className="inline-block bg-black text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors text-center"
              >
                Inquire About This Product
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
