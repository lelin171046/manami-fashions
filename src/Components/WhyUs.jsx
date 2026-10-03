import { motion } from "framer-motion";

const WhyUs = () => {
  const advantages = [
    {
      id: "01",
      title: "100% Export Excellence",
      desc: "Dedicated exclusively to global markets, delivering consistently high standards of quality, safety, and compliance across Europe, USA and Australia.",
    },
    {
      id: "02",
      title: "Operational Precision",
      desc: "Our Industrial Engineering & Planning teams ensure lean manufacturing, optimized resource use and on-time delivery.",
    },
    {
      id: "03",
      title: "Sustainable Innovation",
      desc: "We invest in long-term sustainability and ethical production cycles.",
    },
    {
      id: "04",
      title: "Diversified Expertise",
      desc: "Seamlessly handling both complex Knit and Woven garment production with high-precision quality management.",
    },
  ];

  const stats = [
    { value: "40,000", label: "Daily Pcs Capacity" },
    { value: "1,600+", label: "Skilled Professionals" },
    { value: "700+", label: "Advanced Machinery" },
    { value: "20+", label: "Production Lines" },
  ];

  return (
    <section className="bg-white py-18 px-6 md:px-14 font-sans text-black">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
          <div className="lg:w-1/2">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold mb-6"
            >
              Why Partner With Us
            </motion.p>

            <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase leading-[0.85] mb-10">
              Excellence <br />
              <span className="font-bold text-zinc-900">By Design.</span>
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed max-w-md mb-12">
              Established in 2010, Manami Fashions Ltd. has spent over a decade refining the garment production workflow.
              We believe that enhancing our customers' success directly elevates our own.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-10 border-t border-gray-100">
              <div>
                <span className="block text-3xl font-bold tracking-tighter">2010</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400">Founded</span>
              </div>
              <div>
                <span className="block text-3xl font-bold tracking-tighter">16+</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400">Certifications</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-px bg-gray-100 border border-gray-100">
            {advantages.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ backgroundColor: "#000", color: "#fff" }}
                className="bg-white p-10 transition-all duration-500 cursor-default group"
              >
                <div className="flex items-start gap-6">
                  <span className="text-[10px] font-bold text-gray-300 group-hover:text-gray-600">
                    {item.id}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-tight mb-3">{item.title}</h3>
                    <p className="text-xs text-gray-500 group-hover:text-gray-400 leading-relaxed max-w-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex items-center gap-4 justify-center md:justify-start">
          <div className="h-[1px] w-12 bg-black" />
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold">
            Customer Success is our Ultimate Gratification
          </p>
        </div>
      </div>

      <section className="bg-white py-24 px-6 md:px-20 text-black">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 border border-black">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col p-8 border-r border-b border-black hover:bg-black hover:text-white transition-colors duration-500 group ${
                index === stats.length - 1 ? "border-r-0" : ""
              } ${index >= stats.length - 4? "border-b-0" : ""}`}
            >
              <span className="text-4xl md:text-5xl font-light tracking-tighter">{stat.value}</span>
              <span className="text-gray-500 text-[10px] uppercase tracking-widest mt-2 font-bold group-hover:text-gray-400 transition-colors">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default WhyUs;
