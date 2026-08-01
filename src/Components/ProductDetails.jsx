import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Truck,
  Shield,
  RefreshCw,
} from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [selectedSize, setSelectedSize] = useState('M');
  const [currentImage, setCurrentImage] = useState(0);

  const product = {
    name: "Summer Floral Anarkali Kurti",
    price: "৳4,250",
    originalPrice: "৳5,800",
    rating: 4.8,
    reviewCount: 127,
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1574251150896-225d2f8dd8dd?w=600",
      "https://images.unsplash.com/photo-1595777457473-7e8123586e10?w=600",
      "https://images.unsplash.com/photo-1602293589931-0c66e5c443eb?w=600",
      "https://images.unsplash.com/photo-1574251150896-225d2f8dd8dd?w=600",
    ],
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F9CA24'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      "Premium cotton silk blend Anarkali kurti with intricate floral embroidery. Perfect for casual outings and festive occasions. Breathable fabric with comfortable fit.",
    details: [
      "100% Cotton Silk Blend",
      "Hand Block Printed",
      "Machine Washable",
      "Custom Stitching Available",
    ],
    reviews: [
      { user: "Ayesha Khan", rating: 5, comment: "Absolutely stunning! Perfect fit and quality.", date: "Mar 2026" },
      { user: "Rahim M.", rating: 4, comment: "Great value for money. Color is exactly as shown.", date: "Feb 2026" },
    ],
  };

  const addToCart = () => {
    toast.success(`Added ${quantity} x ${product.name} to cart!`, {
      style: {
        background: '#000',
        color: '#fff',
        border: '1px solid #fff',
      },
    });
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
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-4 transition-all duration-300 ${
                    currentImage === index
                      ? 'border-white/50 ring-2 ring-white/30 scale-105'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                  onClick={() => setCurrentImage(index)}
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

            <div className="relative group">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={product.images[currentImage]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <button
                onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-300"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-8 lg:sticky lg:top-32">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}
                    />
                  ))}
                </div>
                <span className="text-sm text-white/60">({product.reviewCount} reviews)</span>
              </div>

              <div className="flex items-center space-x-4 mb-8">
                <span className="text-4xl font-black">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-white/40 line-through">{product.originalPrice}</span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold uppercase tracking-wider text-white/80">Color</label>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      selectedColor === color
                        ? 'border-white ring-2 ring-white/30 scale-110'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold uppercase tracking-wider text-white/80">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm border transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-white/20 border-white/50'
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-bold uppercase tracking-wider text-white/80">Quantity</span>
              <div className="flex items-center border border-white/20 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-white/10 rounded-l-xl transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-bold min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-white/10 rounded-r-xl transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button
              onClick={addToCart}
              className="w-full py-4 bg-white text-black font-black text-lg uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors duration-300"
            >
              <ShoppingBag size={22} />
              Add to Cart
            </button>

            <button className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
              <Heart size={18} />
              Add to Wishlist
            </button>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <div className="text-center p-4">
                <Truck size={28} className="mx-auto mb-2 text-emerald-400" />
                <h4 className="font-bold text-sm mb-1">Free Shipping</h4>
                <p className="text-white/50 text-xs">Over ৳2,000</p>
              </div>
              <div className="text-center p-4">
                <Shield size={28} className="mx-auto mb-2 text-blue-400" />
                <h4 className="font-bold text-sm mb-1">Secure Payment</h4>
                <p className="text-white/50 text-xs">SSL Encrypted</p>
              </div>
              <div className="text-center p-4">
                <RefreshCw size={28} className="mx-auto mb-2 text-purple-400" />
                <h4 className="font-bold text-sm mb-1">7 Day Return</h4>
                <p className="text-white/50 text-xs">Hassle Free</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-8">Product Details</h3>
          <p className="text-white/70 leading-relaxed max-w-4xl mb-6">{product.description}</p>
          <ul className="space-y-2 max-w-4xl">
            {product.details.map((detail, index) => (
              <li key={index} className="flex items-center gap-3 text-white/70">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full shrink-0" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
