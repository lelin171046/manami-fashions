import React from "react";
import { motion } from "framer-motion";

const Buyer = () => {
  const buyers = [
    { name: "PUMA", logo: "https://upload.wikimedia.org/wikipedia/en/d/da/Puma_complete_logo.svg" },
    { name: "Best & Less", logo: "https://www.cliffordgardens.com.au/wp-content/uploads/2023/06/BestAndLess_Logo.webp" },
    { name: "Walmart", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg" },
    { name: "Matalan", logo: "https://1000logos.net/wp-content/uploads/2021/05/Matalan-logo.png" },
    { name: "Kiabi", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Logo_Kiabi.svg" },
    { name: "Dunnes Stores", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Dunnes_Stores_logo.svg" },
    { name: "ASDA", logo: "https://upload.wikimedia.org/wikipedia/commons/6/68/Asda_logo.svg" },
    { name: "Tesco", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tesco_Logo.svg" }
  ];

  const duplicatedBuyers = [...buyers, ...buyers];

  return (
    <section className="bg-white py-24 overflow-hidden border-t border-gray-100">
      <div className="px-6 md:px-20 mb-12">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold mb-4"
        >
          Global Partners
        </motion.p>
        <h2 className="text-3xl md:text-5xl font-light tracking-tighter uppercase">
          Trusted by <span className="font-bold">Industry Leaders.</span>
        </h2>
      </div>

      {/* INFINITE SLIDER CONTAINER */}
      <div className="relative flex overflow-hidden py-14 border-y border-gray-50 bg-[#fafafa]/30">
        <motion.div 
          className="flex whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 30, // Slightly slower for better visibility of colorful logos
            repeat: Infinity 
          }}
        >
          {duplicatedBuyers.map((brand, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center px-16 md:px-24 group min-w-[250px]"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                // Increased height (h-16 to h-20) and removed grayscale/opacity
                className="h-16 md:h-20 w-auto object-contain transform group-hover:scale-110 transition-transform duration-500"
              />
              <span className="mt-6 text-[10px] uppercase tracking-[0.3em] font-bold text-black opacity-0 group-hover:opacity-100 transition-opacity">
                {brand.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
      </div>

      <div className="mt-12 px-6 md:px-20 flex justify-between items-center opacity-20">
        <div className="h-[px] flex-grow bg-black mr-8" />
        <p className="text-[10px] uppercase tracking-[0.5em] whitespace-nowrap font-medium">
          Strategic Manufacturing Alliances
        </p>
        <div className="h-[1px] flex-grow bg-black ml-8" />
      </div>
    </section>
  );
};

export default Buyer;