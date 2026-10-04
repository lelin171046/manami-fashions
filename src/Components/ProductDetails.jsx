import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Heart, ChevronLeft, ChevronRight, Truck, Shield, RefreshCw, FileText, HelpCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import productService from '../../Pages/products/productService';

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
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <HelpCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
            <ArrowLeft size={18} /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const firstImage = product.images?.[0]?.url || '/images/product-placeholder.jpg';
  const images = product.images?.map(img => img.url).filter(Boolean) || [firstImage];
  const currentImageUrl = images[currentImage] || firstImage;

  const formatAudience = (audience) => {
    const map = { men: "Men's Wear", women: "Women's Wear", kids: "Kids' Wear" };
    return map[audience] || audience;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32">
      <div className="px-4 mb-12 max-w-7xl mx-auto">
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-all duration-300 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium uppercase tracking-wider">All Products</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-6">
            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-4 transition-all duration-300 ${
                      currentImage === index
                        ? 'border-white/50 ring-2 ring-white/30 scale-105'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                    onClick={() => goToImage(index)}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="relative group">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={currentImageUrl}
                  alt={product.images?.[currentImage]?.alt || product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-300"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-300"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-8 lg:sticky lg:top-32">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {product.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider rounded-full">
                    <Star size={12} className="fill-current" /> Featured
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full">
                  {formatAudience(product.audience)}
                </span>
                {product.productType && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider rounded-full">
                    {product.productType}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
                {product.name}
              </h1>

              {product.shortDescription && (
                <p className="text-lg text-white/70 leading-relaxed mb-6 max-w-xl">
                  {product.shortDescription}
                </p>
              )}
            </div>

            {/* Specifications Grid */}
            <div className="space-y-6 border-t border-white/10 pt-6">
              <h3 className="text-lg font-bold uppercase tracking-wider">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.fabric && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Fabric</p>
                    <p className="text-white font-medium">{product.fabric}</p>
                  </div>
                )}
                {product.composition && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Composition</p>
                    <p className="text-white font-medium">{product.composition}</p>
                  </div>
                )}
                {product.weight && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Weight / GSM</p>
                    <p className="text-white font-medium">{product.weight}</p>
                  </div>
                )}
                {product.productType && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Product Type</p>
                    <p className="text-white font-medium">{product.productType}</p>
                  </div>
                )}
              </div>

              {/* Available Colors */}
              {product.availableColors?.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <label className="block text-sm font-bold uppercase tracking-wider text-white/80">Available Colors</label>
                  <div className="flex flex-wrap gap-2">
                    {product.availableColors.map((color, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-medium"
                      >
                        <span className="w-3 h-3 rounded-full border border-white/20" style={{ background: color.toLowerCase().replace(/\s+/g, '') === 'black' ? '#000' : color.toLowerCase() }} />
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Sizes */}
              {product.availableSizes?.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <label className="block text-sm font-bold uppercase tracking-wider text-white/80">Available Sizes</label>
                  <div className="flex flex-wrap gap-2">
                    {product.availableSizes.map((size) => (
                      <span
                        key={size}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold uppercase tracking-wider text-white/80"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Manufacturing Capabilities */}
              {product.manufacturingCapabilities?.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <label className="block text-sm font-bold uppercase tracking-wider text-white/80">Manufacturing Capabilities</label>
                  <div className="flex flex-wrap gap-2">
                    {product.manufacturingCapabilities.map((cap, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-sm text-emerald-300"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {product.certifications?.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <label className="block text-sm font-bold uppercase tracking-wider text-white/80">Certifications</label>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((cert, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-300"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Production Details */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                {product.minimumOrderQuantity && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1 flex items-center gap-2">
                      <FileText size={14} /> MOQ
                    </p>
                    <p className="text-white font-medium">{product.minimumOrderQuantity}</p>
                  </div>
                )}
                {product.productionCapacity && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1 flex items-center gap-2">
                      <RefreshCw size={14} /> Capacity
                    </p>
                    <p className="text-white font-medium">{product.productionCapacity}</p>
                  </div>
                )}
                {product.leadTime && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1 flex items-center gap-2">
                      <Truck size={14} /> Lead Time
                    </p>
                    <p className="text-white font-medium">{product.leadTime}</p>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <button
                onClick={handleInquiry}
                className="w-full py-4 bg-white text-black font-black text-lg uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors duration-300"
              >
                <Send size={22} />
                Request a Quote
              </button>

              <button className="w-full py-4 border-2 border-white/20 text-white font-bold text-lg uppercase tracking-widest flex items-center justify-center gap-3 hover:border-white/50 hover:bg-white/5 transition-colors duration-300">
                <HelpCircle size={22} />
                Discuss This Product
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <div className="text-center p-4">
                <Truck size={28} className="mx-auto mb-2 text-emerald-400" />
                <h4 className="font-bold text-sm mb-1">Global Shipping</h4>
                <p className="text-white/50 text-xs">Worldwide delivery</p>
              </div>
              <div className="text-center p-4">
                <Shield size={28} className="mx-auto mb-2 text-blue-400" />
                <h4 className="font-bold text-sm mb-1">Quality Assured</h4>
                <p className="text-white/50 text-xs">ISO certified processes</p>
              </div>
              <div className="text-center p-4">
                <RefreshCw size={28} className="mx-auto mb-2 text-purple-400" />
                <h4 className="font-bold text-sm mb-1">Flexible MOQ</h4>
                <p className="text-white/50 text-xs">Negotiable quantities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Full Description */}
        {product.description && (
          <div className="mt-20 max-w-4xl">
            <h3 className="text-2xl font-bold mb-8">Product Description</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/70 leading-relaxed mb-6">{product.description}</p>
            </div>
          </div>
        )}

        {/* Features */}
        {product.features?.length > 0 && (
          <div className="mt-20 max-w-4xl">
            <h3 className="text-2xl font-bold mb-8">Key Features</h3>
            <ul className="space-y-3 max-w-4xl">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-white/70">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Materials */}
        {product.materials?.length > 0 && (
          <div className="mt-20 max-w-4xl">
            <h3 className="text-2xl font-bold mb-8">Materials</h3>
            <ul className="space-y-3 max-w-4xl">
              {product.materials.map((material, index) => (
                <li key={index} className="flex items-center gap-3 text-white/70">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0" />
                  {material}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Category */}
        {product.category && (
          <div className="mt-20 max-w-4xl">
            <h3 className="text-2xl font-bold mb-8">Category</h3>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-medium text-white mb-2">{product.category.name}</h4>
              {product.category.description && (
                <p className="text-white/60">{product.category.description}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
