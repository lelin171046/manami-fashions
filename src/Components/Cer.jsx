import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const certData = [
  { name: "amfori BSCI", img: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1773076121/20170426104313_BCI_Logo_2015_m6vfni.png" },
  { name: "OEKO-TEX", img: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1773076120/Oeko-tex_standard100_logo_rgb-2022_a8e41h.jpg" },
  { name: "SEDEX", img: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1773076121/20170426104313_BCI_Logo_2015_m6vfni.png" },
  { name: "WRAP", img: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1773076121/20170426104313_BCI_Logo_2015_m6vfni.png" },
  { name: "GOTS", img: "https://cdn.shopify.com/s/files/1/0255/5976/0973/files/gots_logo_copy_240x240.png?v=1569937434" },
  { name: "GRS", img: "https://www.sinox-polymers.com/files/sinox-custom/images/certifications/global-recycled-standard-grs-zertifizierung-sinox-polymers.png" },
  { name: "ISO 9001", img: "https://www.iso-9001-checklist.co.uk/wp-content/uploads/2024/04/iso-9001-certified-stamp.webp" },
  { name: "ISO 14001", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOtSCbks1G8Q5idQNXK-Uk8h_OK-Q3A34VUA&s" },
  { name: "Better Work", img: "https://www.betterwork.org/wp-content/uploads/BW-Bangladesh-Stacked-rgb.png" },
  { name: "OCS", img: "https://rkcotweaving.com/wp-content/uploads/2024/04/ocs-certificate.webp" },
  { name: "FSC", img: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Forest_Stewardship_Council_%28logo%29.svg/1280px-Forest_Stewardship_Council_%28logo%29.svg.png" },
  { name: "SA8000", img: "https://5.imimg.com/data5/SELLER/Default/2024/11/465177391/GS/HN/RF/30601387/sa-8000-certification-services.png" },
  { name: "Fair Trade", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8H1m8FFtezr-xZtNeMsC6snTEA2T5QBqA1w&s" },
  { name: "Higg Index", img: "https://www.minlan.com.tw/wp-content/uploads/2020/03/higg-index-logo-vector.png" },
];

const allCerts = [...certData, ...certData];

const Cer = () => {
  const [radius, setRadius] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 768 ? 130 : 190
  );
  const [hovered, setHovered] = useState(null);

  const containerRef = useRef(null);
  const rotation = useRef(0);
  const paused = useRef(false);

  useEffect(() => {
    const onResize = () => setRadius(window.innerWidth < 768 ? 130 : 190);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const positions = useMemo(
    () =>
      allCerts.map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / allCerts.length);
        const theta = Math.sqrt(allCerts.length * Math.PI) * phi;
        return {
          x: radius * Math.cos(theta) * Math.sin(phi),
          y: radius * Math.sin(theta) * Math.sin(phi),
          z: radius * Math.cos(phi),
        };
      }),
    [radius]
  );

  useAnimationFrame((time, delta) => {
    if (paused.current) return;

    const breath = 1 + 0.25 * Math.sin(time * 0.0005);
    rotation.current += delta * 0.00011 * breath;

    const rotateY = rotation.current;
    const container = containerRef.current;
    if (!container) return;

    positions.forEach((pos, i) => {
      const x = pos.x * Math.cos(rotateY) - pos.z * Math.sin(rotateY);
      const z = pos.x * Math.sin(rotateY) + pos.z * Math.cos(rotateY);
      const scale = (z + radius) / (2 * radius);

      const el = container.children[i];
      if (!el) return;
      el.style.transform = `translate3d(${x}px, ${pos.y}px, 0) scale(${0.55 + scale})`;
      el.style.opacity = String(0.35 + scale);
      el.style.filter = `blur(${(1 - scale) * 2.5}px)`;
      el.style.zIndex = String(Math.floor(scale * 100));
    });
  });

  return (
    <section className="w-full h-[420px] lg:h-[560px] flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-[300px] h-[300px] lg:w-[500px] lg:h-[500px]"
      >
        {/* soft vignette */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0)_70%)]" />

        {/* orbit ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute inset-3 lg:inset-6 rounded-full border border-dashed border-gray-200"
        />

        <div
          ref={containerRef}
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          {allCerts.map((cert, i) => (
            <div
              key={i}
              className="absolute will-change-transform"
              onMouseEnter={() => { paused.current = true; setHovered(i); }}
              onMouseLeave={() => { paused.current = false; setHovered(null); }}
            >
              <div
                className={`relative w-11 h-11 lg:w-14 lg:h-14 flex items-center justify-center rounded-lg bg-white/90 shadow-sm backdrop-blur-sm border border-gray-100 transition-all duration-300 ${
                  hovered === i ? "scale-125 shadow-md z-50" : ""
                }`}
              >
                <img
                  src={cert.img}
                  alt={`${cert.name} certification`}
                  className="w-3/4 h-3/4 object-contain"
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <span
                className={`absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider text-gray-900 bg-white/95 backdrop-blur-sm border border-gray-100 px-2.5 py-1 rounded-md shadow-sm transition-opacity duration-200 ${
                  hovered === i ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {cert.name}
              </span>
            </div>
          ))}
        </div>

        {/* center badge */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-black text-white flex items-center justify-center text-center shadow-xl"
          >
            <div>
              <span className="block text-2xl lg:text-3xl font-bold tracking-tight">{allCerts.length / 2}+</span>
              <span className="block text-[8px] lg:text-[9px] uppercase tracking-[0.2em] text-white/60 mt-1 px-2">
                Global Certifications
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Cer;
