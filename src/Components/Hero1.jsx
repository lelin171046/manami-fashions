import React from 'react';
import { motion } from 'framer-motion';

const Hero1 = () => {
  const steps = [
    {
      no: "01",
      title: "Precision Cutting",
      desc: "5 advanced cutting tables with 40,000 pcs daily capacity and 86% marker efficiency.",
    },
    {
      no: "02",
      title: "Technical Sewing",
      desc: "25 specialized lines equipped with 700+ machines for knit and woven expertise.",
    },
    {
      no: "03",
      title: "Quality Assurance",
      desc: "Strict 6-checkpoint inspection system ensuring AQL compliance for global brands.",
    },
    {
      no: "04",
      title: "Ethical Finishing",
      desc: "Metal-free zones and moisture-controlled environments for export-ready packaging.",
    }
  ];

  return (
    <section className="bg-white py-24 px-8 md:px-20 text-black">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] tracking-[0.4em] uppercase text-gray-400 block mb-4"
          >
            Our Infrastructure
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase leading-none">
            Built for <span className="font-medium text-gray-400">Scale</span>,<br /> 
            Defined by <span className="font-medium">Precision</span>.
          </h2>
        </div>
        <div className="hidden md:block">
          <p className="text-xs uppercase tracking-widest border-b border-black pb-2">
            2026 Production Standards
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-black">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-8 border-r border-b border-black hover:bg-black hover:text-white transition-colors duration-500 group"
          >
            <span className="text-4xl font-light mb-12 block group-hover:text-gray-500 transition-colors">
              {step.no}
            </span>
            <h3 className="text-xl font-medium uppercase tracking-tight mb-4">
              {step.title}
            </h3>
            <p className="text-sm font-light leading-relaxed opacity-70 group-hover:opacity-100">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Industrial Detail Footer */}
      <div className="mt-12 flex flex-wrap gap-x-12 gap-y-4 opacity-40 grayscale">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-black rounded-full"></div>
          <span className="text-[10px] uppercase tracking-widest font-bold">100% Export Oriented</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-black rounded-full"></div>
          <span className="text-[10px] uppercase tracking-widest font-bold">ERP Automated Workflow</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-black rounded-full"></div>
          <span className="text-[10px] uppercase tracking-widest font-bold">Sustainability Focused</span>
        </div>
      </div>
    </section>
  );
};

export default Hero1;