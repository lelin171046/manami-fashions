import { motion } from "framer-motion";
import Cer from "./Cer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const BrandSlider = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-20 font-sans text-black border-t border-gray-100">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2 w-full order-2 lg:order-1">
          <Cer />
        </div>

        <div className="lg:w-1/2 w-full order-1 lg:order-2 flex flex-col justify-between">
          <div className="sticky top-24">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="text-[10px] tracking-[0.6em] uppercase text-gray-400 font-bold mb-6"
            >
              Ethics & Governance
            </motion.p>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl font-light tracking-tighter uppercase leading-[0.9] mb-8"
            >
              Certified <br />
              <span className="font-bold">Global <br /> Standards.</span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6 text-gray-500"
            >
              <p className="text-sm leading-relaxed max-w-sm">
                As a responsible organization, we prioritize ethical business practices and sustainable growth. Our commitment to excellence is reflected in our 13+ international audit registries.
              </p>

              <div className="pt-8 border-t border-gray-100">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-black mb-2">Quality Assurance</h4>
                <p className="text-xs italic leading-relaxed">
                  "Enhancing our customers' success directly elevates our own. Customer satisfaction is our ultimate gratification."
                </p>
              </div>

              <div className="flex items-center gap-4 mt-10">
                <div className="px-4 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                  BSCI Grade A
                </div>
                <div className="px-4 py-2 border border-black text-black text-[10px] font-bold uppercase tracking-widest">
                  100% Export
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;
