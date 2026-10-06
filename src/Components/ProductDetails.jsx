import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  ChevronLeft,
  ChevronRight,
  Truck,
  Shield,
  RefreshCw,
  FileText,
  HelpCircle,
  Send,
} from 'lucide-react';
import toast from 'react-hot-toast';
import productService from '../Pages/products/productService';

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductBySlug(slug);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found');
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  const goToImage = (index) => {
    if (product?.images?.[index]) {
      setCurrentImage(index);
    }
  };

  const prevImage = () => {
    if (product?.images?.length) {
      setCurrentImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1));
    }
  };

  const nextImage = () => {
    if (product?.images?.length) {
      setCurrentImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));
    }
  };

  const handleInquiry = () => {
    const productName = product?.name || 'this product';
    window.location.href = `/contact?inquiry=${encodeURIComponent(productName)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black pt-28 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-black/20 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white text-black pt-28 flex items-center justify-center px-4">
        <div className="text-center max-w-md space-y-4">
          <HelpCircle size={56} className="text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold tracking-tight">Product Not Found</h2>
          <p className="text-black/60 text-sm">
            {error || 'The product you are looking for does not exist.'}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft size={18} /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const firstImage = product.images?.[0]?.url || '/images/product-placeholder.jpg';
  const images = product.images?.map((img) => img.url).filter(Boolean) || [firstImage];
  const currentImageUrl = images[currentImage] || firstImage;

  const formatAudience = (audience) => {
    const map = { men: "Men's Wear", women: "Women's Wear", kids: "Kids' Wear" };
    return map[audience] || audience;
  };

  return (
    <div className="min-h-screen bg-white text-black pt-28">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-black/60 hover:text-black transition-colors duration-200 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-semibold uppercase tracking-wider">All Products</span>
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          
          {/* Gallery Section */}
          <div className="space-y-4">
            {/* Main Display Image */}
            <div className="relative group">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 border border-black/10 shadow-sm">
                <img
                  src={currentImageUrl}
                  alt={product.images?.[currentImage]?.alt || product.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                />
              </div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-black shadow-md backdrop-blur-sm border border-black/10 transition-all duration-200"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-black shadow-md backdrop-blur-sm border border-black/10 transition-all duration-200"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToImage(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      currentImage === index
                        ? 'border-black ring-1 ring-black/20 opacity-100'
                        : 'border-black/10 hover:border-black/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="space-y-6 lg:sticky lg:top-28">
            
            {/* Header / Titles */}
            <div className="space-y-3 border-b border-black/10 pb-6">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {product.featured && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[11px] font-bold uppercase tracking-wider rounded-md">
                    <Star size={12} className="fill-current" /> Featured
                  </span>
                )}
                <span className="inline-flex items-center px-2.5 py-1 bg-blue-500/10 text-blue-600 border border-blue-500/20 text-[11px] font-bold uppercase tracking-wider rounded-md">
                  {formatAudience(product.audience)}
                </span>
                {product.productType && (
                  <span className="inline-flex items-center px-2.5 py-1 bg-purple-500/10 text-purple-600 border border-purple-500/20 text-[11px] font-bold uppercase tracking-wider rounded-md">
                    {product.productType}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-black">
                {product.name}
              </h1>

              {product.shortDescription && (
                <p className="text-base text-black/70 leading-relaxed max-w-xl">
                  {product.shortDescription}
                </p>
              )}
            </div>

            {/* Specifications Grid */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-black/40">Specifications</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.fabric && (
                  <div className="bg-black/[0.02] rounded-xl p-3.5 border border-black/10">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-0.5">Fabric</p>
                    <p className="text-sm text-black font-semibold">{product.fabric}</p>
                  </div>
                )}
                {product.composition && (
                  <div className="bg-black/[0.02] rounded-xl p-3.5 border border-black/10">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-0.5">Composition</p>
                    <p className="text-sm text-black font-semibold">{product.composition}</p>
                  </div>
                )}
                {product.weight && (
                  <div className="bg-black/[0.02] rounded-xl p-3.5 border border-black/10">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-0.5">Weight / GSM</p>
                    <p className="text-sm text-black font-semibold">{product.weight}</p>
                  </div>
                )}
                {product.productType && (
                  <div className="bg-black/[0.02] rounded-xl p-3.5 border border-black/10">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-0.5">Product Type</p>
                    <p className="text-sm text-black font-semibold">{product.productType}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Available Colors */}
            {product.availableColors?.length > 0 && (
              <div className="space-y-2.5 pt-4 border-t border-black/10">
                <label className="block text-xs font-bold uppercase tracking-widest text-black/40">
                  Available Colors
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.availableColors.map((color, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/[0.02] border border-black/10 rounded-lg text-xs font-medium text-black"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                        style={{
                          background:
                            color.toLowerCase().replace(/\s+/g, '') === 'black'
                              ? '#000'
                              : color.toLowerCase(),
                        }}
                      />
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Available Sizes */}
            {product.availableSizes?.length > 0 && (
              <div className="space-y-2.5 pt-4 border-t border-black/10">
                <label className="block text-xs font-bold uppercase tracking-widest text-black/40">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((size) => (
                    <span
                      key={size}
                      className="px-3.5 py-1.5 bg-black/[0.02] border border-black/10 rounded-lg text-xs font-bold uppercase tracking-wider text-black"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Manufacturing Capabilities */}
            {product.manufacturingCapabilities?.length > 0 && (
              <div className="space-y-2.5 pt-4 border-t border-black/10">
                <label className="block text-xs font-bold uppercase tracking-widest text-black/40">
                  Manufacturing Capabilities
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.manufacturingCapabilities.map((cap, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-800"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {product.certifications?.length > 0 && (
              <div className="space-y-2.5 pt-4 border-t border-black/10">
                <label className="block text-xs font-bold uppercase tracking-widest text-black/40">
                  Certifications
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs font-medium text-blue-800"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Production Details Grid */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-black/10">
              {product.minimumOrderQuantity && (
                <div className="bg-black/[0.02] rounded-xl p-3 border border-black/10">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1 flex items-center gap-1.5">
                    <FileText size={12} /> MOQ
                  </p>
                  <p className="text-xs font-bold text-black">{product.minimumOrderQuantity}</p>
                </div>
              )}
              {product.productionCapacity && (
                <div className="bg-black/[0.02] rounded-xl p-3 border border-black/10">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1 flex items-center gap-1.5">
                    <RefreshCw size={12} /> Capacity
                  </p>
                  <p className="text-xs font-bold text-black">{product.productionCapacity}</p>
                </div>
              )}
              {product.leadTime && (
                <div className="bg-black/[0.02] rounded-xl p-3 border border-black/10">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1 flex items-center gap-1.5">
                    <Truck size={12} /> Lead Time
                  </p>
                  <p className="text-xs font-bold text-black">{product.leadTime}</p>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-6 border-t border-black/10">
              <button
                onClick={handleInquiry}
                className="w-full py-3.5 px-6 bg-black text-white font-bold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all duration-200 shadow-md active:scale-[0.99]"
              >
                <Send size={18} />
                Request a Quote
              </button>

              <button className="w-full py-3.5 px-6 border border-black/20 text-black font-semibold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-black/5 hover:border-black/40 transition-all duration-200 active:scale-[0.99]">
                <HelpCircle size={18} />
                Discuss This Product
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-black/10">
              <div className="text-center p-3 rounded-xl bg-black/[0.01]">
                <Truck size={22} className="mx-auto mb-1.5 text-emerald-600" />
                <h4 className="font-bold text-xs text-black">Global Shipping</h4>
                <p className="text-black/50 text-[11px] mt-0.5">Worldwide delivery</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-black/[0.01]">
                <Shield size={22} className="mx-auto mb-1.5 text-blue-600" />
                <h4 className="font-bold text-xs text-black">Quality Assured</h4>
                <p className="text-black/50 text-[11px] mt-0.5">ISO certified processes</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-black/[0.01]">
                <RefreshCw size={22} className="mx-auto mb-1.5 text-purple-600" />
                <h4 className="font-bold text-xs text-black">Flexible MOQ</h4>
                <p className="text-black/50 text-[11px] mt-0.5">Negotiable quantities</p>
              </div>
            </div>

          </div>
        </div>

        {/* Extended Product Information Sections */}
        <div className="mt-16 space-y-12 border-t border-black/10 pt-12 max-w-4xl">
          {/* Full Description */}
          {product.description && (
            <div>
              <h3 className="text-lg font-bold text-black uppercase tracking-wider mb-4">
                Product Description
              </h3>
              <div className="prose prose-neutral max-w-none text-black/70 leading-relaxed text-sm sm:text-base">
                <p>{product.description}</p>
              </div>
            </div>
          )}

          {/* Features */}
          {product.features?.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-black uppercase tracking-wider mb-4">
                Key Features
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-black/80">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Materials */}
          {product.materials?.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-black uppercase tracking-wider mb-4">
                Materials
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {product.materials.map((material, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-black/80">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                    {material}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Category */}
          {product.category && (
            <div>
              <h3 className="text-lg font-bold text-black uppercase tracking-wider mb-4">
                Category Details
              </h3>
              <div className="bg-black/[0.02] rounded-xl p-5 border border-black/10">
                <h4 className="text-base font-bold text-black mb-1">{product.category.name}</h4>
                {product.category.description && (
                  <p className="text-xs sm:text-sm text-black/60">{product.category.description}</p>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;