import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [selectedSize, setSelectedSize] = useState('M');
  const [currentImage, setCurrentImage] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Sample product data (replace with your API/data)
  const product = {
    id: 1,
    name: "Summer Floral Anarkali Kurti",
    price: "৳4,250",
    originalPrice: "৳5,800",
    category: "women",
    rating: 4.8,
    reviews: 127,
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1574251150896-225d2f8dd8dd?w=600",
      "https://images.unsplash.com/photo-1595777457473-7e8123586e10?w=600",
      "https://images.unsplash.com/photo-1602293589931-0c66e5c443eb?w=600",
      "https://images.unsplash.com/photo-1574251150896-225d2f8dd8dd?w=600"
    ],
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F9CA24'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: "Premium cotton silk blend Anarkali kurti with intricate floral embroidery. Perfect for casual outings and festive occasions. Breathable fabric with comfortable fit.",
    details: [
      "100% Cotton Silk Blend",
      "Hand Block Printed",
      "Machine Washable",
      "Custom Stitching Available"
    ],
    reviews: [
      { user: "Ayesha Khan", rating: 5, comment: "Absolutely stunning! Perfect fit and quality.", date: "Mar 2026" },
      { user: "Rahim M.", rating: 4, comment: "Great value for money. Color is exactly as shown.", date: "Feb 2026" }
    ]
  };

  const addToCart = () => {
    toast.success(`Added ${quantity} x ${product.name} to cart!`, {
      style: {
        background: '#000',
        color: '#fff',
        border: '1px solid #fff',
      }
    });
    setCartCount(cartCount + 1);
  };

  const images = product.images;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32">
      {/* Breadcrumb */}
      <div className="px-4 mb-12">
        <Link 
          to="/products" 
          className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-all duration-300 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1" />
          <span className="text-sm font-medium uppercase tracking-wider">All Products</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Image Gallery */}
          <div className="space-y-6">
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-black/50 rounded-2xl p-2 bg-white/5">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`
                    relative aspect-square rounded-xl overflow-hidden cursor-pointer group
                    border-4 transition-all duration-300 shadow-xl
                    ${currentImage === index 
                      ? 'border-white/50 shadow-white/25 scale-105 ring-2 ring-white/30' 
                      : 'border-white/10 hover:border-white/30 hover:shadow-white/15 hover:scale-102'
                    }
                  `}
                  onClick={() => setCurrentImage(index)}
                >
                  <img 
                    src={img} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 filter grayscale group-hover:grayscale-0"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative group">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-black/30 backdrop-blur-sm border border-white/10 hover:shadow-white/20 hover:shadow-2xl transition-all duration-700">
                <img 
                  src={images[currentImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 shadow-xl transition-all duration-300 hover:scale-110 -translate-x-2 group-hover:translate-x-0"
              >
                <ChevronLeft size={20} className="text-white" />
              </button>
              <button
                onClick={() => setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 shadow-xl transition-all duration-300 hover:scale-110 translate-x-2 group-hover:translate-x-0"
              >
                <ChevronRight size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8 lg:sticky lg:top-32">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex space-x-1 text-2xl">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={24} 
                      className={`transition-all ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current shadow-lg' : 'text-white/50'}`} 
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold text-white">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center space-x-6 mb-8">
                <div className="text-5xl font-black text-white">{product.price}</div>
                {product.originalPrice && (
                  <div className="text-3xl text-white/50 line-through font-medium"> {product.originalPrice}</div>
                )}
                <span className="text-xl text-emerald-400 font-bold bg-emerald-500/20 px-4 py-2 rounded-2xl">
                  {product.stock} in stock
                </span>
              </div>
            </div>

            {/* Color Selector */}
            <div className="space-y-3">
              <label className="block text-lg font-bold text-white/80 uppercase tracking-wider">Color</label>
              <div className="flex space-x-4">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`
                      w-16 h-16 rounded-3xl border-4 shadow-xl transition-all duration-400 hover:shadow-white/20 hover:scale-110
                      ${selectedColor === color 
                        ? 'border-white/60 shadow-2xl shadow-white/30 ring-4 ring-white/20 scale-110 -translate-y-2' 
                        : 'border-white/20 hover:border-white/40'
                      }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <label className="block text-lg font-bold text-white/80 uppercase tracking-wider">Size</label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`
                      px-8 py-4 rounded-3xl font-bold uppercase tracking-wider text-lg backdrop-blur-sm shadow-xl border transition-all duration-400
                      ${selectedSize === size 
                        ? 'bg-white/30 border-white/50 shadow-2xl shadow-white/25 scale-105 ring-2 ring-white/20 translate-y-[-4px]' 
                        : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-105 hover:shadow-white/15'
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center space-x-6">
              <span className="text-lg font-bold text-white/80 uppercase tracking-wider">Quantity</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-14 h-14 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl"
                >
                  <Minus size={20} className="text-white" />
                </button>
                <span className="text-3xl font-black text-white min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-14 h-14 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl"
                >
                  <Plus size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-4">
              <button
                onClick={addToCart}
                className="w-full py-6 backdrop-blur-2xl bg-gradient-to-r from-white/20 via-white/10 to-transparent border-2 border-white/30 rounded-3xl font-black text-2xl uppercase tracking-widest flex items-center justify-center space-x-4 transition-all duration-500 hover:shadow-2xl hover:shadow-white/40 hover:scale-[1.02] hover:-translate-y-3 shadow-2xl group"
              >
                <ShoppingBag size={32} className="group-hover:scale-110 transition-transform" />
                <span>Add to Cart</span>
              </button>
              
              <div className="flex items-center space-x-6 pt-6 border-t border-white/20">
                <button className="flex items-center space-x-3 p-4 backdrop-blur-sm bg-white/5 hover:bg-white/15 border border-white/20 rounded-3xl transition-all duration-400 hover:scale-105 shadow-xl group">
                  <Heart size={24} className="text-white group-hover:scale-110 transition-transform" />
                  <span className="font-semibold uppercase tracking-wider">Add to Wishlist</span>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="text-center p-6 backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <Truck size={32} className="mx-auto mb-3 text-emerald-400" />
                <h4 className="font-bold text-lg mb-1">Free Shipping</h4>
                <p className="text-white/60 text-sm">Over ৳2,000</p>
              </div>
              <div className="text-center p-6 backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <Shield size={32} className="mx-auto mb-3 text-blue-400" />
                <h4 className="font-bold text-lg mb-1">Secure Payment</h4>
                <p className="text-white/60 text-sm">SSL Encrypted</p>
              </div>
              <div className="text-center p-6 backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <RefreshCw size={32} className="mx-auto mb-3 text-purple-400" />
                <h4 className="font-bold text-lg mb-1">7 Day Return</h4>
                <p className="text-white/60 text-sm">Hassle Free</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details & Reviews */}
        <div className="mt-32">
          <div className="flex border-b border-white/10 pb-8 mb-12">
            <button className="flex-1 py-4 px-8 font-bold uppercase tracking-wider text-lg border-b-4 transition-all duration-300 bg-white/5 rounded-t-2xl">
              Description
            </button>
            <button className="flex-1 py-4 px-8 font-semibold uppercase tracking-wider text-lg text-white/60 hover:text-white transition-colors">
              Reviews ({product.reviews.length})
            </button>
          </div>

          <div className="text-lg text-white/80 leading-relaxed max-w-4xl mx-auto">
            <p className="mb-6">{product.description}</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Product Details
                </h3>
                <ul className="space-y-3">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex items-center space-x-3 p-4 backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                      <div className="w-2 h-2 bg-white/60 rounded-full" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
