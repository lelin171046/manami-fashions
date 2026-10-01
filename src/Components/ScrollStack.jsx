"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * @typedef {Object} ScrollStackCard
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} [image]
 * @property {string[]} [details]
 * @property {number} [step]
 * @property {string} [color]
 */

/**
 * @typedef {Object} ScrollStackProps
 * @property {ScrollStackCard[]} cards
 * @property {string} [className]
 */

const cardColors = [
  "from-slate-900 to-slate-700",
  "from-amber-900 to-amber-700",
  "from-emerald-900 to-emerald-700",
  "from-blue-900 to-blue-700",
  "from-violet-900 to-violet-700",
  "from-rose-900 to-rose-700",
];

function ScrollStackCard({ card, index, totalCards, scrollYProgress, cardHeight, stackGap }) {
  const startProgress = index / totalCards;
  const endProgress = (index + 1) / totalCards;

  const scale = useTransform(scrollYProgress,
    [startProgress - 0.1, startProgress, endProgress, endProgress + 0.1],
    [0.85, 1, 1, 0.85]
  );

  const rotate = useTransform(scrollYProgress,
    [startProgress - 0.1, startProgress, endProgress, endProgress + 0.1],
    [-3, 0, 0, 3]
  );

  const opacity = useTransform(scrollYProgress,
    [startProgress - 0.15, startProgress, endProgress, endProgress + 0.15],
    [0, 1, 1, 0]
  );

  const y = useTransform(scrollYProgress,
    [startProgress, endProgress],
    [0, -(index * (cardHeight + stackGap))]
  );

  const zIndex = useTransform(scrollYProgress,
    [startProgress, endProgress],
    [index, totalCards - index]
  );

  const colorGradient = card.color || cardColors[index % cardColors.length];

  return (
    <motion.div
      key={card.id}
      style={{
        scale,
        rotate,
        opacity,
        y,
        zIndex,
        position: "sticky",
        top: 100,
      }}
      className="relative w-full max-w-4xl mx-auto"
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br text-white shadow-2xl">
        {/* Background image with gradient overlay */}
        {card.image && (
          <motion.div
            className="absolute inset-0"
            style={{ backgroundImage: `url(${card.image})` }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-br opacity-80" style={{
          background: `linear-gradient(135deg, ${colorGradient.replace("from-", "").replace(" to-", ", ")})`
        }} />

        {/* Card content */}
        <div className="relative p-8 md:p-12 lg:p-16 h-[500px] flex flex-col justify-between">
          {/* Top: Step badge */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
              Step {card.step || index + 1}
            </span>
            {card.step && (
              <span className="w-24 h-px bg-white/30" />
            )}
          </motion.div>

          {/* Center: Title & Description */}
          <motion.div
            className="flex-1 flex flex-col justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight uppercase mb-4 leading-tight">
              {card.title}
            </h2>
            <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
              {card.description}
            </p>
          </motion.div>

          {/* Bottom: Details */}
          {card.details && card.details.length > 0 && (
            <motion.ul
              className="space-y-3 pt-6 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {card.details.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-white/90"
                >
                  <span className="w-2 h-2 bg-white/50 rounded-full shrink-0" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ScrollStack({ cards, className = "" }) {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef]);

  const totalCards = cards.length;
  const cardHeight = 500;
  const stackGap = 40;

  return (
    <motion.div
      ref={containerRef}
      className={`relative h-[${totalCards * cardHeight + (totalCards - 1) * stackGap}px] ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {cards.map((card, index) => (
        <ScrollStackCard
          key={card.id}
          card={card}
          index={index}
          totalCards={totalCards}
          scrollYProgress={scrollYProgress}
          cardHeight={cardHeight}
          stackGap={stackGap}
        />
      ))}
    </motion.div>
  );
}