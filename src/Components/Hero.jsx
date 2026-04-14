import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Menswear', 'Womenswear', 'Kids', 'Active & Innerwear'];

  const products = [
    {
      id: 1,
      category: 'Menswear',
      name: 'Premium Polo Shirt',
      fabric: 'Single Jersey / Pique',
      details: 'Organic Cotton, 180-220 GSM',
      image: 'https://img.drz.lazcdn.com/static/bd/p/a821c829f953f33270baa0e663f012a7.jpg_960x960q80.jpg_.webp'
    },
    {
      id: 2,
      category: 'Active & Innerwear',
      name: 'Performance Leggings',
      fabric: 'Interlock / Lycra Blend',
      details: 'Moisture-wicking, Four-way stretch',
      image: 'https://www.buytshirtsonline.co.uk/images/womens-tridri-recycled-performance-leggings-3-4-length-p11960-384304_image.jpg'
    },
    {
      id: 3,
      category: 'Womenswear',
      name: 'Structured Fashion Tee',
      fabric: 'Viscose / Elastane',
      details: 'High-density print compatible',
      image: 'https://buonitalianfashion.lu/cdn/shop/files/0040-2026.02.20-photo-catalogBIF2078.jpg?v=1772529432'
    },
    {
      id: 4,
      category: 'Kids',
      name: 'Children’s Nightwear Set',
      fabric: '100% Rib Cotton',
      details: 'Hypoallergenic, Soft-touch finish',
      image: 'https://www.petite-plume.com/cdn/shop/files/SPJPS_Pink_2_73198fd2-bd62-4f55-b49a-28fe315e71e7.jpg?v=1770410987'
    },
    {
      id: 5,
      category: 'Menswear',
      name: 'Technical Hoodie',
      fabric: 'CVC Fleece',
      details: 'Brushed interior, Ribbed cuffs',
      image: 'https://cdn.shopify.com/s/files/1/2415/8099/files/FINAL_0009_PRO-TECH_HOODIE_BLACK12_6f2a5ad7-fd01-497f-a511-253d4f0b8f48.jpg?v=1773254728'
    },
    {
      id: 6,
      category: 'Active & Innerwear',
      name: 'Ergonomic Boxer Briefs',
      fabric: 'Modal / Spandex',
      details: 'Seamless construction',
      image: 'https://m.media-amazon.com/images/I/717gK47yfpL._AC_UY1100_.jpg'
    }
  ];

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <section className="bg-white py-24 px-6 md:px-20 font-sans text-black">
      {/* Header */}
      <div className="mb-20">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold block mb-4"
        >
          Product Portfolio
        </motion.span>
        <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase mb-12">
          Diverse <span className="font-bold">Expertise.</span>
        </h2>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-8 border-b border-gray-100 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs uppercase tracking-widest transition-all duration-300 ${
                filter === cat ? 'font-bold border-b-2 border-black pb-6 -mb-[26px]' : 'text-gray-400 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[9px] uppercase tracking-widest font-bold">
                  {product.category}
                </div>
              </div>
              
              <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-xl font-medium tracking-tight uppercase mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">{product.fabric}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 font-light italic">{product.details}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Footer Call to Action */}
      <div className="mt-24 p-12 bg-[#fafafa] flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-sm uppercase tracking-widest font-light max-w-sm">
          Looking for a specific fabric or custom development? Our sampling team is ready.
        </p>
        <button className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">
          Request Tech Pack Review
        </button>
      </div>
    </section>
  );
};

export default Hero;