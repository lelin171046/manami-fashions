import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Filter, 
  Search, 
  Grid, 
  List, 
  Heart, 
  ShoppingBag,
  Star 
} from 'lucide-react';
import toast from 'react-hot-toast';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState(0);

  // Garments Categories & Products Data
  const categories = [
    { id: 'all', name: 'All Products', count: 24 },
    { id: 'women', name: 'Women Wear', count: 8 },
    { id: 'men', name: "Men's Wear", count: 6 },
    { id: 'kids', name: 'Kids Wear', count: 4 },
    { id: 'saree', name: 'Sarees', count: 3 },
    { id: 'kurti', name: 'Kurtis', count: 3 }
  ];

  const products = [
    {
      id: 1,
      name: "Summer Floral Kurti",
      price: "৳1,850",
      originalPrice: "৳2,500",
      category: "kurti",
      image: "https://images.unsplash.com/photo-1574251150896-225d2f8dd8dd?w=400",
      rating: 4.8,
      reviews: 127,
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
      sizes: ['S', 'M', 'L', 'XL'],
      stock: 24
    },
    {
      id: 2,
      name: "Men's Linen Shirt",
      price: "৳2,200",
      originalPrice: "৳3,000",
      category: "men",
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400",
      rating: 4.6,
      reviews: 89,
      colors: ['#2C3E50', '#34495E', '#ECF0F1'],
      sizes: ['M', 'L', 'XL', 'XXL'],
      stock: 18
    },
    {
      id: 3,
      name: "Silk Kanjeevaram Saree",
      price: "৳8,500",
      originalPrice: "",
      category: "saree",
      image: "https://images.unsplash.com/photo-1608254977395-d3f7279efa6f?w=400",
      rating: 4.9,
      reviews: 45,
      colors: ['#D68910', '#F39C12'],
      sizes: ['Free Size'],
      stock: 12
    },
    {
      id: 4,
      name: "Girls Ethnic Dress",
      price: "৳1,450",
      originalPrice: "৳1,950",
      category: "kids",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      rating: 4.7,
      reviews: 62,
      colors: ['#FF9FF3', '#F368E0'],
      sizes: ['2Y', '4Y', '6Y', '8Y'],
      stock: 15
    },
    {
      id: 5,
      name: "Anarkali Suit Set",
      price: "৳4,200",
      originalPrice: "৳5,800",
      category: "women",
      image: "https://images.unsplash.com/photo-1595777457473-7e8123586e10?w=400",
      rating: 4.9,
      reviews: 203,
      colors: ['#A23B72', '#F18F01', '#C44569'],
      sizes: ['S', 'M', 'L', 'XL'],
      stock: 9
    },
    {
      id: 6,
      name: "Cotton Printed Saree",
      price: "৳3,800",
      originalPrice: "",
      category: "saree",
      image: "https://images.unsplash.com/photo-1602293589931-0c66e5c443eb?w=400",
      rating: 4.5,
      reviews: 34,
      colors: ['#6C5CE7', '#A29BFE'],
      sizes: ['Free Size'],
      stock: 20
    }
  ];

  const filteredProducts = products.filter(product => 
    (activeCategory === 'all' || product.category === activeCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="px-4 mb-12">
        <Link to="/" className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-all duration-300 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1" />
          <span className="text-sm font-medium uppercase tracking-wider">Home</span>
        </Link>
      </div>

      {/* Header */}
      <section className="px-4 mb-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-6">
            Our Collection
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Premium quality garments crafted with love. Starting from ৳1,450 only.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="px-4 mb-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-center justify-between">
          
          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Search kurtis, sarees, shirts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl text-white placeholder-white/50 focus:outline-none focus:border-white/30 focus:shadow-white/20 transition-all duration-300 shadow-xl"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  px-6 py-3 rounded-2xl font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl
                  backdrop-blur-sm border ${activeCategory === category.id 
                    ? 'bg-white/20 border-white/50 shadow-white/25 scale-105 -translate-y-1' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 hover:shadow-white/10 hover:scale-102'
                  }
                `}
              >
                {category.name} <span className="text-white/50">({category.count})</span>
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white/20 border-white/50 shadow-white/25 scale-105' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              <Grid size={20} className="text-white" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white/20 border-white/50 shadow-white/25 scale-105' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              <List size={20} className="text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onViewDetails={() => setSelectedProduct(product)}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProducts.map(product => (
                <ProductListItem 
                  key={product.id}
                  product={product}
                  onViewDetails={() => setSelectedProduct(product)}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      )}
    </div>
  );
};

// Product Card (Grid View)
const ProductCard = ({ product, onViewDetails, cartItems, setCartItems }) => (
  <div className="group relative overflow-hidden rounded-3xl shadow-2xl shadow-black/30 hover:shadow-white/20 hover:shadow-2xl hover:-translate-y-4 transition-all duration-700">
    <div className="relative h-80 overflow-hidden bg-gradient-to-br from-white/5 to-black/10 backdrop-blur-sm">
      <img 
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
      />
      
      {/* Quick Actions */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col space-y-2">
        <button className="w-12 h-12 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
          <Heart size={20} className="text-white" />
        </button>
      </div>

      {/* Sale Badge */}
      {product.originalPrice && (
        <div className="absolute top-4 left-4 backdrop-blur-sm bg-rose-500/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Sale
        </div>
      )}
    </div>

    {/* Product Info */}
    <div className="p-8">
      <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
        {product.name}
      </h3>
      
      <div className="flex items-center mb-4">
        <div className="flex space-x-1 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'fill-current' : ''} />
          ))}
        </div>
        <span className="ml-2 text-white/60 text-sm">({product.reviews})</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-2xl font-black text-white">{product.price}</span>
          {product.originalPrice && (
            <span className="ml-4 text-lg text-white/50 line-through">{product.originalPrice}</span>
          )}
        </div>
        <span className="text-sm text-white/60 font-medium">{product.stock} left</span>
      </div>

      <button
        onClick={() => onViewDetails(product)}
        className="w-full py-4 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-bold text-white uppercase tracking-wider transition-all duration-400 hover:shadow-2xl hover:shadow-white/20 hover:scale-[1.02] hover:-translate-y-1 shadow-xl"
      >
        View Details
      </button>
    </div>
  </div>
);

// Product Modal
const ProductModal = ({ product, onClose, cartItems, setCartItems }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
    <div className="bg-gradient-to-b from-white/5 via-black/30 to-black/50 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 transition-all duration-300 hover:scale-110 shadow-xl"
        >
          <X size={24} className="text-white" />
        </button>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
          </div>
          
          <div>
            <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              {product.name}
            </h2>
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex space-x-1 text-yellow-400 text-2xl">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} className={i < Math.floor(product.rating) ? 'fill-current' : ''} />
                ))}
              </div>
              <span className="text-2xl font-bold text-white">({product.reviews} reviews)</span>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black text-white">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-2xl text-white/50 line-through">{product.originalPrice}</span>
                )}
              </div>

              {/* Colors */}
              <div>
                <label className="block text-sm font-bold text-white/80 mb-3 uppercase tracking-wider">Colors</label>
                <div className="flex space-x-3">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      className={`w-12 h-12 rounded-2xl border-4 transition-all duration-300 shadow-xl ${
                        color === product.colors[0] 
                          ? 'border-white/50 shadow-white/25 scale-110 -translate-y-1' 
                          : 'border-white/20 hover:border-white/50 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-bold text-white/80 mb-3 uppercase tracking-wider">Size</label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size, i) => (
                    <button
                      key={i}
                      className={`px-6 py-3 rounded-2xl font-bold uppercase tracking-wider transition-all duration-300 backdrop-blur-sm border shadow-xl ${
                        i === 0 
                          ? 'bg-white/20 border-white/50 shadow-white/25 scale-105' 
                          : 'bg-white/5 border-white/20 hover:bg-white/15 hover:border-white/40 hover:scale-105'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setCartItems(cartItems + 1);
                  toast.success(`${product.name} added to cart!`);
                  onClose();
                }}
                className="flex-1 py-5 backdrop-blur-sm bg-gradient-to-r from-white/20 to-transparent border-2 border-white/30 rounded-3xl font-bold text-2xl text-white uppercase tracking-wider transition-all duration-500 hover:shadow-2xl hover:shadow-white/30 hover:scale-[1.02] hover:-translate-y-2 shadow-2xl"
              >
                <ShoppingBag size={28} className="inline mr-3" />
                Add to Cart
              </button>
              <button className="p-5 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-3xl transition-all duration-300 hover:scale-110 shadow-xl">
                <Heart size={28} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Product List Item (List View)
const ProductListItem = ({ product, onViewDetails }) => (
  <div className="group flex items-center gap-6 p-8 backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/30 hover:shadow-2xl hover:shadow-white/20 transition-all duration-500">
    <div className="relative flex-shrink-0 w-32 h-32 rounded-2xl overflow-hidden shadow-xl group-hover:scale-110 transition-transform">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
        {product.name}
      </h3>
      <p className="text-white/60 mb-4 line-clamp-2">{product.description || 'Premium quality garments with modern design'}</p>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-3xl font-black text-white">{product.price}</span>
          {product.originalPrice && (
            <span className="ml-4 text-xl text-white/50 line-through">{product.originalPrice}</span>
          )}
        </div>
        <button
          onClick={() => onViewDetails(product)}
          className="px-8 py-4 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-xl hover:shadow-white/20"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
);

export default Products;
