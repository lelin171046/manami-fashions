import React, { useMemo, useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const Cer = () => {
  const allCerts = [
    { name: "amfori BSCI", img: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1773076121/20170426104313_BCI_Logo_2015_m6vfni.png" },
    { name: "OEKO-TEX", img: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1773076120/Oeko-tex_standard100_logo_rgb-2022_a8e41h.jpg" },
    { name: "SEDEX", img: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1773076121/20170426104313_BCI_Logo_2015_m6vfni.png" },
    { name: "WRAP", img: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1773076121/20170426104313_BCI_Logo_2015_m6vfni.png" },
    { name: "GOTS", img: "https://res.cloudinary.com/dcdmktxtx/image/upload/v1773076121/20170426104313_BCI_Logo_2015_m6vfni.png" },
    { name: "GRS", img: "https://res.cloudinary.com/dcdmktxtx/image/upload/v1773076121/20170426104313_BCI_Logo_2015_m6vfni.png" },
    { name: "ISO 9001", img: "/certs/iso9001.png" },
    { name: "ISO 14001", img: "/certs/iso14001.png" },
    { name: "Better Work", img: "/certs/betterwork.png" },
    { name: "OCS", img: "/certs/ocs.png" },
    { name: "FSC", img: "/certs/fsc.png" },
    { name: "SA8000", img: "/certs/sa8000.png" },
    { name: "Fair Trade", img: "/certs/fairtrade.png" },
    { name: "Higg Index", img: "/certs/higgindex.png" },
  
  ];

  const radius = 180;
  const speed = useRef(0);

  const positions = useMemo(() => {
    return allCerts.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / allCerts.length);
      const theta = Math.sqrt(allCerts.length * Math.PI) * phi;

      return {
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi)
      };
    });
  }, [allCerts]);

  const containerRef = useRef(null);

  useAnimationFrame(() => {
    speed.current += 0.002;

    const container = containerRef.current;
    if (!container) return;

    const children = container.children;

    positions.forEach((pos, i) => {
      const rotateY = speed.current;

      const x =
        pos.x * Math.cos(rotateY) - pos.z * Math.sin(rotateY);
      const z =
        pos.x * Math.sin(rotateY) + pos.z * Math.cos(rotateY);

      const scale = (z + radius) / (2 * radius);
      const transform = `
        translate3d(${x}px, ${pos.y}px, 0)
        scale(${0.5 + scale})
      `;

      const el = children[i];
      if (el) {
        el.style.transform = transform;
        el.style.opacity = 0.3 + scale;
        el.style.filter = `blur(${(1 - scale) * 2}px)`;
        el.style.zIndex = Math.floor(scale * 100);
      }
    });
  });

  return (
    <section className="w-full h-screen bg-white flex items-center justify-center overflow-hidden">
      
      <div className="relative w-[500px] h-[500px]">
        
        <div
          ref={containerRef}
          className="absolute w-full h-full flex items-center justify-center"
        >
          {allCerts.map((cert, i) => (
            <div
              key={i}
              className="absolute w-16 h-16 flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d"
              }}
            >
              <img
                src={cert.img}
                alt={cert.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* CENTER GLOW */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 bg-black/5 rounded-full blur-2xl" />
        </div>

      </div>
    </section>
  );
};

export default Cer;