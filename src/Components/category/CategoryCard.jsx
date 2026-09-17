import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Owns the media state (local asset fallback -> backend image -> hidden) so
// it resets naturally when the parent remounts it via `key`.
const CategoryCardMedia = ({ mediaType = "image", src, fallbackSrc, title, autoPlay = false }) => {
  const [useFallback, setUseFallback] = useState(false);
  const [hidden, setHidden] = useState(false);

  const currentSrc = useFallback && fallbackSrc ? fallbackSrc : src;

  if (hidden || !currentSrc) return null;

  const handleError = () => {
    if (!useFallback && fallbackSrc) setUseFallback(true);
    else setHidden(true);
  };

  return (
    <div className="absolute inset-0">
      {mediaType === "video" ? (
        <video
          src={currentSrc}
          poster={fallbackSrc && currentSrc === src ? fallbackSrc : undefined}
          autoPlay={autoPlay}
          muted
          loop
          playsInline
          aria-hidden="true"
          onError={handleError}
          className="w-full h-full object-cover motion-safe:group-hover:scale-[1.05] transition-transform duration-[900ms] ease-out"
        />
      ) : (
        <img
          src={currentSrc}
          alt={title ? `${title} collection` : "Collection"}
          loading="lazy"
          onError={handleError}
          className="w-full h-full object-cover motion-safe:group-hover:scale-[1.05] transition-transform duration-[900ms] ease-out"
        />
      )}
    </div>
  );
};

// category shape:
// { key, title, subtitle, href, mediaType: "image"|"video", src, fallbackSrc? }
const CategoryCard = ({ category, index = 0 }) => {
  const {
    title,
    subtitle,
    href,
    mediaType = "image",
    src,
    fallbackSrc,
  } = category;

  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: reduceMotion ? 0 : index * 0.1 }}
    >
      <Link
        to={href}
        className="group relative block aspect-[3/4] overflow-hidden bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        <CategoryCardMedia
          key={`${mediaType}-${src}`}
          mediaType={mediaType}
          src={src}
          fallbackSrc={fallbackSrc}
          title={title}
          autoPlay={!reduceMotion}
        />

        {/* Tonal gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 lg:p-8">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-tight text-white leading-none">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-2 text-xs md:text-sm text-white/75 leading-relaxed max-w-[24ch]">
              {subtitle}
            </p>
          )}
          <span className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-white border-b border-white/60 pb-1.5 group-hover:border-white group-hover:gap-3 transition-all duration-300">
            Explore Collection
            <ArrowRight size={14} className="shrink-0" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
};

export default CategoryCard;