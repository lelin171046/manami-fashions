import { motion } from "framer-motion";
import { Target, Lightbulb, Heart } from "lucide-react";

const Vision = () => {
  const data = [
    {
      title: "Vision",
      icon: <Target className="text-gray-400 group-hover:text-black transition-colors" size={24} />,
      main: "To become a leading knit garments manufacturer in Bangladesh.",
      points: [
        "Deliver high-quality products providing exceptional value.",
        "Achieve operational excellence through resource utilization.",
        "Foster leadership through training and innovation recognition.",
      ],
    },
    {
      title: "Mission",
      icon: <Lightbulb className="text-gray-400 group-hover:text-black transition-colors" size={24} />,
      main: "Pursuing excellence through world-class product standards.",
      points: [
        "Innovate processes to ensure peak customer satisfaction.",
        "Empower employees to drive factory-wide excellence.",
        "Continually strive to exceed people and customer expectations.",
      ],
    },
    {
      title: "Values",
      icon: <Heart className="text-gray-400 group-hover:text-black transition-colors" size={24} />,
      main: "Collective responsibility and contagious enthusiasm.",
      points: [
        "Responsibility for individual and collective actions.",
        "Working together to achieve common and individual goals.",
        "Inspired energy to make a lasting global impact.",
      ],
    },
  ];

  return (
    <section className="py-24 px-6 md:px-20 font-sans overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] tracking-[0.6em] uppercase text-gray-500 font-bold mb-4"
          >
            The Manami Foundation
          </motion.p>
          <h2 className="text-5xl md:text-7xl text-black font-light tracking-tighter uppercase leading-none">
            Our Purpose <br />
            <span className="font-bold text-black">& Philosophy.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative flex flex-col h-full bg-[#111] p-10 border border-gray-800 hover:border-white transition-all duration-500"
            >
              <div className="flex text-white justify-between items-center mb-10">
                <h3 className="text-2xl font-bold uppercase tracking-tighter group-hover:tracking-widest transition-all duration-500">
                  {item.title}
                </h3>
                {item.icon}
              </div>

              <p className="text-lg font-light leading-tight mb-8 text-gray-300 group-hover:text-white transition-colors">
                {item.main}
              </p>

              <ul className="mt-auto space-y-4 pt-8 border-t border-gray-900 group-hover:border-gray-700 transition-colors">
                {item.points.map((point, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="h-[1px] w-3 bg-gray-600 mt-2.5 transition-all group-hover:w-6 group-hover:bg-white" />
                    <p className="text-xs text-gray-500 group-hover:text-gray-400 leading-relaxed uppercase tracking-wider">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>

              <span className="absolute -bottom-4 -right-2 text-9xl font-bold text-white/[0.02] pointer-events-none group-hover:text-white/[0.05] transition-all">
                0{index + 1}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-medium">
            Customer satisfaction is our ultimate gratification.
          </p>
          <div className="flex gap-2 items-center">
            <div className="w-12 h-[1px] bg-gray-700" />
            <span className="text-[9px] uppercase tracking-widest font-bold">JOYJATRA INITIATIVE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
