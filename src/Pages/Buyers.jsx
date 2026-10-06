import { motion } from "framer-motion";
import InfiniteSpiral from "../Components/InfiniteSpiral.jsx";

const images = [
  {
    id: "puma",
    name: "PUMA",
    src: "https://upload.wikimedia.org/wikipedia/en/d/da/Puma_complete_logo.svg",
    alt: "PUMA buyer logo",
    category: "Sportswear",
  },
  {
    id: "kiabi",
    name: "Kiabi",
    src: "https://images.ctfassets.net/0y25wr71xvc0/lfsNGs720v8hlefs8K1ZL/cab18fe8b2bc9ecdb477798950bc5431/Kiabi26.png?fm=webp&fit=scale&r=0&q=75&w=1920",
    alt: "Kiabi buyer logo",
    category: "Value fashion retail",
  },
  {
    id: "dunnes",
    name: "Dunnes Stores",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Logo_of_Dunnes_Stores.svg/1280px-Logo_of_Dunnes_Stores.svg.png",
    alt: "Dunnes Stores buyer logo",
    category: "Fashion and home retail",
  },
  {
    id: "matalan",
    name: "Matalan",
    src: "https://www.eclipsedigitalmedia.co.uk/wp-content/uploads/2017/02/eclipse-digital-media-digital-signage-solutions-matalan-led-wall-logo.png",
    alt: "Matalan buyer logo",
    category: "Clothing retailer",
  },
  {
    id: "walmart",
    name: "Walmart",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXqR1i07MgglXVrv-cWoR9TEEG2mOWJY8vJElGH0vVH5THOELNydaZ6r4j&s=10",
    alt: "Walmart buyer logo",
    category: "Global retail",
  },
  {
    id: "best-less",
    name: "Best & Less",
    src: "https://www.cliffordgardens.com.au/wp-content/uploads/2023/06/BestAndLess_Logo.webp",
    alt: "Best and Less buyer logo",
    category: "Family apparel retail",
  },
  {
    id: "target",
    name: "Target",
    src: "https://www.studenterlauget.dk/wp-content/uploads/2024/07/Lidl-Logo.jpg",
    alt: "Target buyer logo",
    category: "Retail corporation",
  },
  {
    id: "lidl",
    name: "Lidl",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx3nvd3mnH9nNzk1-QOMDzmu7YUnaUKVd1HNb8PdM4HdQtxwMgZ4VS_ng&s=10",
    alt: "Lidl buyer logo",
    category: "Global discount supermarket chain",
  },
  {
    id: "aldi",
    name: "Aldi",
    src: "https://www.theindustry.fashion/wp-content/uploads/2021/09/warehouse.jpg",
    alt: "Aldi buyer logo",
    category: "Global discount supermarket chain",
  },
];

const Buyers = () => {
  return (
    <section className="relative w-full py-16 bg-none text-white overflow-hidden">
      {/* HEADER SECTION FOR BUYERS */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-8 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500 mb-3"
        >
          Global Partnerships
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-light tracking-tight text-black mb-4"
        >
          Trusted by the World’s <span className="font-semibold text-black">Leading Brands.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed"
        >
          From high-performance sportswear to volume fashion, we engineer precision apparel for global market leaders with ethical compliance and unmatched speed-to-market.
        </motion.p>
      </div>

      {/* INFINITE SPIRAL CANVAS */}
      <div className="relative h-[650px] w-full">
        <InfiniteSpiral
          items={images}
          animationMode="all"
          speed={0.35}
          radius={510}
          cardWidth={160}
          cardHeight={100}
          verticalSpacing={110}
          perspective={1000}
          cardRadius={10}
          centerScale={1}
          edgeBlur={3}
          cardsPerTurn={8}
          direction="clockwise"
          rotation={0}
          cardTilt={0}
          edgeFade={0.3}
          pauseOnHover={false}
          imageFit="contain"
          grayscale={0}
        />
      </div>
    </section>
  );
};

export default Buyers;