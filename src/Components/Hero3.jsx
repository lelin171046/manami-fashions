import { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1785532140/image_yggwdh.png",
    title: "Factory Building",
    subtitle: "Gazipur, Bangladesh",
  },
  {
    url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0MkHdCKdDsTChqZiYO8TS5rhOCzJ3LtrL4BlB_V_sqCvXMmqa3OCjbNPawSJl7ExwJq6rxG-wXrT7NUeA6uml6xzQRfThHC4SPVLUmZlLCXtqMk6pXM9bo2h6NuGM9mECkXvODtV0omOyKfWXFTsC-g6_6nghIUZyoMrvqEBDjdtnHVCWwTOojnxnm8p2/s1408/Sewing%20Line.png",
    title: "Sewing Line",
    subtitle: "700+ Machines in Operation",
  },
  {
    url: "https://glorystarwears.com/assets/images/quality-inspection-workflow.jpg",
    title: "Fabric Inspection",
    subtitle: "AQL Quality Control",
  },
  {
    url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1776708037/IMG_8167.JPG_jackdx.jpg",
    title: "Quality Inspection",
    subtitle: "6-Checkpoint System",
  },
  {
    url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1776254793/WhatsApp_Image_2026-04-11_at_5.25.27_PM_c8rrrs.jpg",
    title: "Cutting Section",
    subtitle: "5 Advanced Cutting Tables",
  },
  {
    url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1776254791/WhatsApp_Image_2026-04-11_at_2.15.35_PM_mu5m8k.jpg",
    title: "Finishing Section",
    subtitle: "Export-Ready Packaging",
  },
];

const slideVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const HeroBackground = memo(() => {
  const [[current, direction], setPage] = useState([0, 0]);
  const intervalRef = useRef(null);

  const paginate = useCallback((dir) => {
    setPage(([prev]) => [(prev + dir + SLIDES.length) % SLIDES.length, dir]);
  }, []);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => paginate(1), 5000);
  }, [paginate]);

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [startInterval]);

  const slide = SLIDES[current];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url(${slide.url})` }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { paginate(i - current); startInterval(); }}
            className={`transition-all duration-700 rounded-full ${
              i === current ? "w-12 h-[3px] bg-white" : "w-3 h-[3px] bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => { paginate(-1); startInterval(); }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/30 hover:text-white transition-colors duration-300 hidden md:block"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={() => { paginate(1); startInterval(); }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/30 hover:text-white transition-colors duration-300 hidden md:block"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
});

HeroBackground.displayName = "HeroBackground";

const Letters = memo(({ text, delay = 0, className = "" }) => (
  <span className={className}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: delay + i * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
));

Letters.displayName = "Letters";

const HeroStats = memo(() => {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 12.5, suffix: "M+", label: "Annual Production", decimals: 1 },
    { value: 4500, suffix: "+", label: "Employees" },
    { value: 28, suffix: "", label: "Production Lines" },
    { value: 35, suffix: "+", label: "Export Countries" },
    { value: 98, suffix: "%", label: "On-Time Delivery" },
  ];

  return (
    <div ref={ref} className="w-full bg-white border-t border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <CountUp end={stat.value} decimals={stat.decimals || 0} started={started} delay={i * 0.1} />
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mt-1.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

HeroStats.displayName = "HeroStats";

const CountUp = ({ end, decimals = 0, started, delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const timeout = setTimeout(() => {
      let startTime = null;
      const duration = 2000;
      const step = (now) => {
        if (!startTime) startTime = now;
        const elapsed = Math.min(now - startTime, duration);
        const progress = elapsed / duration;
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(eased * end);
        if (elapsed < duration) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [started, end, delay]);

  return (
    <p className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
      {count.toFixed(decimals)}
      <span className="text-gray-900">{end >= 1000 ? "" : ""}</span>
    </p>
  );
};

const HeroContent = memo(() => (
  <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex items-center gap-4 mb-8"
    >
      <span className="h-px w-8 bg-white/50" />
      <span className="text-white/50 uppercase tracking-[0.3em] text-[11px] font-medium">
        Since 2010
      </span>
      <span className="h-px w-8 bg-white/50" />
    </motion.div>

    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white leading-[0.85] mb-4">
      <Letters text="MANAMI" delay={0.4} />
      <br />
      <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/60 tracking-[0.15em]">
        <Letters text="FASHIONS LTD." delay={0.8} />
      </span>
    </h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="text-white/40 text-sm md:text-base font-light max-w-lg mx-auto mt-4 mb-10 leading-relaxed"
    >
      A 100% export-oriented garment manufacturer delivering precision-engineered apparel for global leaders.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.4 }}
      className="flex flex-wrap justify-center gap-4"
    >
      <a
        href="/profile"
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gray-900 text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-100 transition-all duration-300"
      >
        Explore Factory
      </a>
      <a
        href="/products"
        className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-white/10 transition-all duration-300"
      >
        View Products
      </a>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-px h-10 bg-white/20"
      />
    </motion.div>
  </div>
));

HeroContent.displayName = "HeroContent";

const Hero3 = () => (
  <div className="bg-white">
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-900">
      <HeroBackground />
      <HeroContent />
    </section>
    <HeroStats />
  </div>
);

export default Hero3;