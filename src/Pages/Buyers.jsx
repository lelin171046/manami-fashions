import { motion } from "framer-motion";
import InfiniteSpiral from "../Components/InfiniteSpiral.jsx";

const Buyers = () => {
  const buyers = [
    {
      name: "PUMA",
      logo:
        "https://upload.wikimedia.org/wikipedia/en/d/da/Puma_complete_logo.svg",
    },
    {
      name: "Best & Less",
      logo:
        "https://www.cliffordgardens.com.au/wp-content/uploads/2023/06/BestAndLess_Logo.webp",
    },
    {
      name: "Walmart",
      logo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Walmart_logo_%282008%2C_stacked%29.svg/1920px-Walmart_logo_%282008%2C_stacked%29.svg.png",
    },
    {
      name: "Matalan",
      logo:
        "https://www.eclipsedigitalmedia.co.uk/wp-content/uploads/2017/02/eclipse-digital-media-digital-signage-solutions-matalan-led-wall-logo.png",
    },
    {
      name: "Kiabi",
      logo:
        "https://cdn.freebiesupply.com/logos/large/2x/kiabi-1-logo-png-transparent.png",
    },
    {
      name: "Dunnes Stores",
      logo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Logo_of_Dunnes_Stores.svg/1280px-Logo_of_Dunnes_Stores.svg.png",
    },
    {
      name: "Woolworths",
      logo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGpXrRXlQE7KEg2WLVOWCTnzjlmzQbhQYDwA&s",
    },
    {
      name: "The Warehouse",
      logo:
        "https://www.theindustry.fashion/wp-content/uploads/2021/09/warehouse.jpg",
    },
    // add the rest of your buyers...
  

    // add the rest of your buyers...
  ];

  const spiralItems = buyers.map((buyer) => ({
    src: buyer.logo,
    alt: buyer.name,
    label: buyer.name,
  }));

  return (
    <section className="bg-white py-24 overflow-hidden border-t border-gray-100">

      {/* HEADER */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-20 mb-12">

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            text-xs
            uppercase
            tracking-[0.3em]
            text-gray-400
            mb-4
          "
        >
          Global Partners
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            text-4xl
            md:text-6xl
            font-extralight
            tracking-tight
            text-gray-900
          "
        >
          Trusted by{" "}
          <span className="text-gray-400">
            Global Leaders.
          </span>
        </motion.h2>

        <p className="
          mt-6
          max-w-2xl
          text-sm
          md:text-base
          font-light
          leading-relaxed
          text-gray-500
        ">
          Building long-term manufacturing partnerships
          with internationally recognized brands across
          global markets.
        </p>

      </div>

      {/* SPIRAL */}
      <div className="
        relative
        h-[600px]
        md:h-[700px]
        lg:h-[760px]
        overflow-hidden
      ">

        <InfiniteSpiral
          items={spiralItems}

          speed={0.32}
          direction="up"
          animationMode="all"

          radius={230}
          cardsPerTurn={8}
          verticalSpacing={105}

          rotation={0}
          cardTilt={0}

          cardWidth={190}
          cardHeight={115}

          cardRadius={4}

          perspective={1200}

          centerScale={1.15}

          edgeFade={0.25}
          edgeBlur={0}

          pauseOnHover

          imageFit="contain"
          grayscale={0}

          className="w-full h-full"
        />

      </div>

      {/* BOTTOM INFORMATION */}
      <div className="
        max-w-screen-xl
        mx-auto
        px-6
        md:px-20
        pt-12
      ">

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-end
          md:justify-between
          gap-6
          border-t
          border-gray-100
          pt-8
        ">

          <div>
            <p className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-gray-400
            ">
              Manufacturing Partnerships
            </p>

            <h3 className="
              mt-3
              text-2xl
              md:text-3xl
              font-extralight
              tracking-tight
              text-gray-900
            ">
              Global Reach.
              <span className="text-gray-400">
                {" "}Consistent Quality.
              </span>
            </h3>
          </div>

          <div className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-gray-400
          ">
            100% Export Focused
          </div>

        </div>

      </div>

    </section>
  );
};

export default Buyers;