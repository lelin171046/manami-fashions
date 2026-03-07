import { useState } from "react";
import { Search, Grid, List, Heart } from "lucide-react";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "women", name: "Women Wear" },
    { id: "men", name: "Men Wear" },
    { id: "kids", name: "Kids Wear" },
    { id: "saree", name: "Sarees" },
    { id: "kurti", name: "Kurtis" },
  ];

  const products = [
    {
      id: 1,
      name: "Summer Floral Kurti",
      category: "kurti",
      image:
        "https://res.cloudinary.com/dcdmktxtz/image/upload/v1768888316/samples/look-up.jpg",
    },
    {
      id: 2,
      name: "Men Linen Shirt",
      category: "men",
      image:
        "https://res.cloudinary.com/dcdmktxtz/image/upload/v1768888319/samples/woman-on-a-football-field.jpg",
    },
    {
      id: 3,
      name: "Silk Saree",
      category: "saree",
      image:
        "https://images.unsplash.com/photo-1608254977395-d3f7279efa6f?w=500",
    },
    {
      id: 4,
      name: "Girls Ethnic Dress",
      category: "kids",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
    },
    {
      id: 5,
      name: "Anarkali Suit",
      category: "women",
      image:
        "https://images.unsplash.com/photo-1595777457473-7e8123586e10?w=500",
    },
    {
      id: 6,
      name: "Cotton Printed Saree",
      category: "saree",
      image:
        "https://images.unsplash.com/photo-1602293589931-0c66e5c443eb?w=500",
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      (activeCategory === "all" || product.category === activeCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 py-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12 px-4">
        <h1 className="text-4xl font-bold mb-4">Our Collection</h1>
        <p className="text-gray-600">
          Premium quality garments crafted with modern fashion trends.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">
        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-lg text-sm transition ${
                activeCategory === cat.id
                  ? "bg-black text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-3 rounded ${
              viewMode === "grid"
                ? "bg-black text-white"
                : "bg-white border border-gray-300"
            }`}
          >
            <Grid size={18} />
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={`p-3 rounded ${
              viewMode === "list"
                ? "bg-black text-white"
                : "bg-white border border-gray-300"
            }`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4">
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProducts.map((product) => (
              <ProductList
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          close={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

const ProductCard = ({ product, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer group"
  >
    <div className="h-72 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition"
      />
    </div>

    <div className="p-4 flex justify-between items-center">
      <h3 className="font-semibold">{product.name}</h3>
      <Heart size={18} className="text-gray-500" />
    </div>
  </div>
);

const ProductList = ({ product, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-6 bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer"
  >
    <img
      src={product.image}
      alt={product.name}
      className="w-28 h-28 object-cover rounded-lg"
    />

    <h3 className="text-lg font-semibold">{product.name}</h3>
  </div>
);

const ProductModal = ({ product, close }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl max-w-xl w-full p-6 relative">
      <button
        onClick={close}
        className="absolute top-4 right-4 text-gray-500"
      >
        ✕
      </button>

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />

      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="text-gray-600 mt-3">
        Premium quality garment crafted with modern fashion design and comfort.
      </p>
    </div>
  </div>
);

export default Products;