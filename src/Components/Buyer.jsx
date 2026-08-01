import { motion } from "framer-motion";

const Buyer = () => {
  const buyers = [
    { name: "PUMA", logo: "https://upload.wikimedia.org/wikipedia/en/d/da/Puma_complete_logo.svg" },
    { name: "Best & Less", logo: "https://www.cliffordgardens.com.au/wp-content/uploads/2023/06/BestAndLess_Logo.webp" },
    { name: "Walmart", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Walmart_logo_%282008%2C_stacked%29.svg/1920px-Walmart_logo_%282008%2C_stacked%29.svg.png" },
    { name: "Matalan", logo: "https://www.eclipsedigitalmedia.co.uk/wp-content/uploads/2017/02/eclipse-digital-media-digital-signage-solutions-matalan-led-wall-logo.png" },
    { name: "Kiabi", logo: "https://cdn.freebiesupply.com/logos/large/2x/kiabi-1-logo-png-transparent.png" },
    { name: "Dunnes Stores", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Logo_of_Dunnes_Stores.svg/1280px-Logo_of_Dunnes_Stores.svg.png" },
    { name: "Woolworths", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGpXrRXlQE7KEg2WLVOWCTnzjlmzQbhQYDwA&s" },
    { name: "The Warehouse", logo: "https://www.theindustry.fashion/wp-content/uploads/2021/09/warehouse.jpg" },
  ];

  const duplicatedBuyers = [...buyers, ...buyers];

  return (
    <section className="bg-white py-24 overflow-hidden border-t border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6 md:px-20 mb-12">
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

      <div className="relative flex overflow-hidden py-14 border-y border-gray-50 bg-[#fafafa]/30">
        <motion.div
          className="flex whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 30,
            repeat: Infinity,
          }}
        >
          {duplicatedBuyers.map((brand, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center px-16 md:px-24 group min-w-[250px]"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-16 md:h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <span className="mt-6 text-[10px] uppercase tracking-[0.3em] font-bold text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {brand.name}
              </span>
            </div>
          ))}
        </motion.div>

        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
      </div>

      <div className="max-w-screen-xl mx-auto mt-12 px-6 md:px-20 flex justify-between items-center opacity-20">
        <div className="h-[1px] flex-grow bg-black mr-8" />
        <p className="text-[10px] uppercase tracking-[0.5em] whitespace-nowrap font-medium">
          Strategic Manufacturing Alliances
        </p>
        <div className="h-[1px] flex-grow bg-black ml-8" />
      </div>
    </section>
  );
};

export default Buyer;
