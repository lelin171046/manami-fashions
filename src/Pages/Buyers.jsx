import { motion } from "framer-motion";
import InfiniteSpiral from "../Components/InfiniteSpiral.jsx";

const buyers = [
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
    src: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1791311982/Picture1_wtuswe.png",
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
    id: "norma",
    name: "Target",
    src: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1791311982/Picture3_ox0pwp.png",
    alt: "Target buyer logo",
    category: "Retail corporation",
  },
  {
    id: "lidl",
    name: "rossmann",
    src: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1791311982/Picture2_opn8bk.png",
    alt: "Lidl buyer logo",
    category: "Global discount supermarket chain",
  },
  {
    id: "Kaufland",
    name: "Aldi",
    src: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1791311982/Picture4_ottpeq.png",
    alt: "Aldi buyer logo",
    category: "Global discount supermarket chain",
  },
];

const Buyers = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-20 text-black md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:px-16">
        {/* LEFT: TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-red-500" />

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
              Global Partnerships
            </p>
          </div>

          <h2 className="text-4xl font-light leading-[0.95] tracking-tight text-black sm:text-5xl lg:text-6xl xl:text-7xl">
            Trusted by the
            <span className="mt-2 block font-semibold">
              World’s Leading Brands.
            </span>
          </h2>

          <p className="mt-8 max-w-lg text-sm leading-7 text-neutral-600 sm:text-base">
            From high-performance sportswear to volume fashion, we
            manufacture precision apparel for international buyers with
            consistent quality, responsible production, and dependable
            delivery.
          </p>

          <div className="mt-10 grid max-w-md grid-cols-2 gap-x-8 gap-y-6 border-t border-black/15 pt-6">
            <div>
              <p className="text-2xl font-semibold text-black">20+</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                Buyer groups
              </p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-black">Global</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                Market reach
              </p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-black">30+</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                Countries Served
              </p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-black">95%</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                On time delivery
              </p>
            </div>
          </div>

          
        </motion.div>

        {/* RIGHT: INFINITE SPIRAL */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: "easeOut",
          }}
          className="relative min-w-0"
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.06),transparent_65%)]" />

          <div className="relative w-full overflow-hidden sm:h-[620px]">
            <InfiniteSpiral
              items={buyers}
              animationMode="all"
              speed={0.8}
              radius={210}
              cardWidth={130}
              cardHeight={70}
              verticalSpacing={105}
              perspective={1100}
              cardRadius={12}
              centerScale={1.08}
              edgeBlur={2}
              cardsPerTurn={6}
              direction="up"
              rotation={0}
              cardTilt={0}
              edgeFade={0.35}
              pauseOnHover={false}
              imageFit="round-cover"
              grayscale={0}
            />
          </div>

          
        </motion.div>
      </div>
    </section>
  );
};

export default Buyers;