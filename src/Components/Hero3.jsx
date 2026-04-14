import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, ShieldCheck, Zap, Globe } from 'lucide-react'; // Optional: npm install lucide-react
import Hero from './Hero';

const Hero3 = () => {
  return (
    <div className="bg-white font-sans text-slate-950">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center px-6 md:px-20 overflow-hidden bg-[#0a0a0a]">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#111] translate-x-10 -skew-x-12 hidden md:block" />
        
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-gray-500"></span>
              <span className="text-gray-400 uppercase tracking-[0.4em] text-[10px] font-bold">
                Established 2010
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-white leading-[0.9] mb-8">
              MANAMI <br />
              <span className="font-semibold italic text-gray-500 text-5xl md:text-7xl">Fashions Ltd.</span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-md mb-10">
              A 100% export-oriented powerhouse delivering precision-engineered apparel for global leaders.
            </p>

            <div className="flex flex-wrap gap-6">
              <button className="bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center gap-2">
                Our Profile <ArrowRight size={14} />
              </button>
              <button className="border border-gray-700 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                The Factory
              </button>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="relative h-[500px] md:h-[650px] overflow-hidden rounded-sm"
          >
            <img 
              src="https://res.cloudinary.com/dcdmktxtz/image/upload/v1772875746/WhatsApp_Image_2026-03-07_at_3.27.11_PM_jsogyo.jpg?q=80&w=1000&auto=format&fit=crop" 
              alt="Industrial Precision"
              className="w-full h-full object-cover grayscale brightness-75 hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute bottom-0 left-0 bg-white p-8 hidden lg:block max-w-xs">
              <p className="text-black text-xs font-bold uppercase tracking-tighter mb-2">Annual Capacity</p>
              <p className="text-4xl font-light text-black tracking-tighter">12.5M <span className="text-sm uppercase">Units</span></p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CAPABILITIES GRID (Modern Layout) */}
      <section className="py-32 px-6 md:px-20 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start mb-14">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase mb-2 leading-none">
              Engineering the <br /> 
              <span className="font-bold">Future of RMG.</span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-xs text-sm leading-relaxed mt-4 md:mt-0">
            We integrate advanced Industrial Engineering (IE) with sustainable practices to ensure zero-defect production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              title: "Digital Workflow", 
              desc: "Fully automated ERP system from sampling to export for 100% transparency.",
              icon: <Zap size={24} className="mb-6 text-gray-400" /> 
            },
            { 
              title: "Compliance First", 
              desc: "BSCI 'A' Grade facility ensuring ethical labor and global safety standards.",
              icon: <ShieldCheck size={24} className="mb-6 text-gray-400" /> 
            },
            { 
              title: "Global Reach", 
              desc: "Strategic partnerships with PUMA, Walmart, and Matalan across Europe and USA.",
              icon: <Globe size={24} className="mb-6 text-gray-400" /> 
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group p-10 border border-r-2 border-gray-100 hover:border-black transition-all duration-500"
            >
              {item.icon}
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                {item.desc}
              </p>
              <div className="mt-8 h-[2px] w-0 bg-black group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. THE "DARK" TRUST SECTION */}
      <section className="bg-zinc-900 py-24 px-6 md:px-20 flex flex-wrap justify-between items-center gap-12">
        <div className="flex flex-col">
          <span className="text-white text-5xl font-light tracking-tighter">35,000</span>
          <span className="text-gray-500 text-[10px] uppercase tracking-widest mt-2 font-bold">Daily Pcs Capacity</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white text-5xl font-light tracking-tighter">1,600+</span>
          <span className="text-gray-500 text-[10px] uppercase tracking-widest mt-2 font-bold">Skilled Professionals</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white text-5xl font-light tracking-tighter">700+</span>
          <span className="text-gray-500 text-[10px] uppercase tracking-widest mt-2 font-bold">Advanced Machinery</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white text-5xl font-light tracking-tighter">25+</span>
          <span className="text-gray-500 text-[10px] uppercase tracking-widest mt-2 font-bold">Production Lines</span>
        </div>
      </section>
    </div>
  );
};

export default Hero3;