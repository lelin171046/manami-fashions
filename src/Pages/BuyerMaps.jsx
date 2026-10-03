import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Globe, ChevronLeft, ChevronRight, MapPin, Building2, Truck, Award, Clock, Sparkles, Loader2 } from "lucide-react";
import api from "../api/axios.js";
import useEmblaCarousel from "embla-carousel-react";

const WORLD_MAP_SVG = "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/world_lpqpq3.svg";

const FALLBACK_BUYERS = [
  {
    _id: "fallback-1",
    name: "H&M",
    logo: { url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/hm_logo.svg" },
    country: "Sweden",
    partnershipYear: "Since 2015",
    description: "Long-standing partnership with H&M for sustainable knitwear and basic collections. Collaborating on conscious cotton initiatives and circular fashion programs.",
    featured: true,
    stats: [
      { label: "Annual Volume", value: "3.2M pcs" },
      { label: "Main Category", value: "Knitwear & Basics" },
      { label: "Compliance", value: "OEKO-TEX, BSCI, GOTS" },
      { label: "Lead Time", value: "45-60 days" },
    ],
    orderCategories: ["T-Shirts", "Polos", "Sweatshirts", "Leggings", "Underwear"],
    sortOrder: 1,
  },
  {
    _id: "fallback-2",
    name: "ZARA",
    logo: { url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/zara_logo.svg" },
    country: "Spain",
    partnershipYear: "Since 2018",
    description: "Strategic partner for fast-fashion denim and woven collections. Quick turnaround capabilities for trend-driven seasonal drops.",
    featured: true,
    stats: [
      { label: "Annual Volume", value: "2.8M pcs" },
      { label: "Main Category", value: "Denim & Woven" },
      { label: "Compliance", value: "OEKO-TEX, ZDHC, WRAP" },
      { label: "Lead Time", value: "30-45 days" },
    ],
    orderCategories: ["Jeans", "Jackets", "Shirts", "Dresses", "Skirts"],
    sortOrder: 2,
  },
  {
    _id: "fallback-3",
    name: "Target",
    logo: { url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/target_logo.svg" },
    country: "USA",
    partnershipYear: "Since 2016",
    description: "Major US retailer partnership for private label apparel. Focus on inclusive sizing, sustainable materials, and value-driven fashion.",
    featured: true,
    stats: [
      { label: "Annual Volume", value: "4.1M pcs" },
      { label: "Main Category", value: "Family Apparel" },
      { label: "Compliance", value: "OEKO-TEX, BSCI, SLCP" },
      { label: "Lead Time", value: "60-75 days" },
    ],
    orderCategories: ["T-Shirts", "Hoodies", "Pants", "Activewear", "Sleepwear", "Kids Wear"],
    sortOrder: 3,
  },
  {
    _id: "fallback-4",
    name: "Uniqlo",
    logo: { url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/uniqlo_logo.svg" },
    country: "Japan",
    partnershipYear: "Since 2019",
    description: "Japanese retail giant collaboration for HEATTECH and AIRism technology garments. Precision manufacturing for technical fabrics.",
    featured: true,
    stats: [
      { label: "Annual Volume", value: "2.5M pcs" },
      { label: "Main Category", value: "Technical Knitwear" },
      { label: "Compliance", value: "OEKO-TEX, ISO 9001, Bluesign" },
      { label: "Lead Time", value: "50-65 days" },
    ],
    orderCategories: ["Heattech Tops", "AIRism Innerwear", "Ultra Light Down", "Supima Cotton Tees"],
    sortOrder: 4,
  },
  {
    _id: "fallback-5",
    name: "Primark",
    logo: { url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/primark_logo.svg" },
    country: "Ireland",
    partnershipYear: "Since 2017",
    description: "Value fashion retailer partnership for high-volume basics and seasonal trends. Ethical sourcing through Primark Cares program.",
    featured: true,
    stats: [
      { label: "Annual Volume", value: "5.5M pcs" },
      { label: "Main Category", value: "Value Basics" },
      { label: "Compliance", value: "OEKO-TEX, BSCI, Primark Cares" },
      { label: "Lead Time", value: "40-55 days" },
    ],
    orderCategories: ["T-Shirts", "Leggings", "Pajamas", "Socks", "Accessories"],
    sortOrder: 5,
  },
  {
    _id: "fallback-6",
    name: "M&S",
    logo: { url: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1790947734/ms_logo.svg" },
    country: "United Kingdom",
    partnershipYear: "Since 2014",
    description: "Marks & Spencer premium quality partnership. Plan A sustainability commitments with focus on responsible sourcing and quality assurance.",
    featured: false,
    stats: [
      { label: "Annual Volume", value: "1.8M pcs" },
      { label: "Main Category", value: "Premium Knitwear" },
      { label: "Compliance", value: "OEKO-TEX, BSCI, Plan A" },
      { label: "Lead Time", value: "55-70 days" },
    ],
    orderCategories: ["Cashmere Sweaters", "Merino Wool", "Cotton Rich Tees", "Lingerie"],
    sortOrder: 6,
  },
];

const COUNTRY_COORDINATES = {
  "Sweden": { x: 52, y: 22 },
  "Spain": { x: 42, y: 38 },
  "USA": { x: 12, y: 30 },
  "Japan": { x: 85, y: 30 },
  "Ireland": { x: 35, y: 25 },
  "United Kingdom": { x: 38, y: 27 },
  "Netherlands": { x: 44, y: 26 },
  "France": { x: 42, y: 33 },
};

const BuyerCard = ({ buyer, isSelected, onSelect }) => {
  const countryCoords = COUNTRY_COORDINATES[buyer.country] || { x: 50, y: 50 };

  return (
    <motion.button
      onClick={() => onSelect(buyer)}
      className={`relative group w-full max-w-sm mx-auto bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 transition-all duration-500 hover:border-neutral-700 ${
        isSelected ? "border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20" : ""
      }`}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-neutral-800/50 rounded-xl flex items-center justify-center overflow-hidden border border-neutral-700">
            {buyer.logo?.url && (
              <img src={buyer.logo.url} alt={buyer.name} className="w-full h-full object-contain p-1" loading="lazy" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{buyer.name}</h3>
            <div className="flex items-center gap-1 text-neutral-400 text-sm mt-0.5">
              <MapPin size={12} />
              <span>{buyer.country}</span>
            </div>
          </div>
        </div>
        {buyer.featured && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex items-center justify-center w-8 h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-full"
          >
            <Sparkles size={14} className="text-emerald-400" />
          </motion.div>
        )}
      </div>

      {buyer.partnershipYear && (
        <div className="flex items-center gap-1.5 text-neutral-500 text-sm mb-4 px-2">
          <Clock size={13} />
          <span className="font-mono text-neutral-300">{buyer.partnershipYear}</span>
        </div>
      )}

      <p className="text-neutral-400 text-sm leading-relaxed mb-5 line-clamp-3">{buyer.description}</p>

      <div className="space-y-2 mb-5">
        {buyer.stats?.map((stat, index) => (
          <motion.div
            key={`${buyer._id}-${index}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
            className="flex items-center gap-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-3 hover:border-emerald-500/30 transition-colors"
          >
            <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Award size={14} className="text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-neutral-500 text-xs uppercase tracking-wider">{stat.label}</p>
              <p className="text-white font-medium text-sm truncate">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {buyer.orderCategories?.slice(0, 6).map((cat, index) => (
          <motion.span
            key={`${buyer._id}-cat-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index }}
            className="px-2.5 py-1 text-xs bg-neutral-800 border border-neutral-700 rounded-full text-neutral-300 hover:bg-neutral-700 hover:border-neutral-600 transition-colors"
          >
            {cat}
          </motion.span>
        ))}
        {buyer.orderCategories && buyer.orderCategories.length > 6 && (
          <span className="px-2.5 py-1 text-xs bg-neutral-800 border border-neutral-700 rounded-full text-neutral-500">
            +{buyer.orderCategories.length - 6}
          </span>
        )}
      </div>

      {isSelected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
        />
      )}
    </motion.button>
  );
};

const WorldMap = ({ buyers, selectedBuyer, onCountryClick }) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.onload = () => setMapLoaded(true);
    }
  }, []);

  return (
    <div className="relative w-full aspect-[2/1] max-h-[600px] min-h-[400px] bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-950 z-10">
          <Loader2 size={48} className="text-emerald-500 animate-spin" />
        </div>
      )}
      <img
        ref={mapRef}
        src={WORLD_MAP_SVG}
        alt="World map showing buyer locations"
        className="w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: mapLoaded ? 1 : 0 }}
      />
      <div className="absolute inset-0 pointer-events-none">
        {buyers.map((buyer) => {
          const coords = COUNTRY_COORDINATES[buyer.country] || { x: 50, y: 50 };
          const isSelected = selectedBuyer?._id === buyer._id;
          return (
            <motion.button
              key={buyer._id}
              onClick={() => onCountryClick(buyer)}
              className="absolute pointer-events-auto"
              style={{
                left: `${coords.x}%`,
                top: `${coords.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`View ${buyer.name} in ${buyer.country}`}
            >
              <motion.div
                animate={{ scale: isSelected ? 1.4 : 1, boxShadow: isSelected ? "0 0 20px rgba(16,185,129,0.6)" : "0 0 10px rgba(16,185,129,0.3)" }}
                transition={{ duration: 300 }}
                className={`w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-300 ${
                  isSelected ? "bg-emerald-500 border-emerald-500" : "bg-emerald-500/80 border-emerald-400"
                }`}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: isSelected ? 1 : 0, scale: isSelected ? 1 : 0.5 }}
                transition={{ duration: 200 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1 text-xs text-white opacity-0 pointer-events-none"
              >
                {buyer.name}
              </motion.div>
            </motion.button>
          );
        })}
      </div>
      <div className="absolute bottom-4 right-4 bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-lg p-3 text-xs text-neutral-400">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span>Featured Partners</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500/50 border border-emerald-500/30" />
          <span>Active Partners</span>
        </div>
      </div>
    </div>
  );
};

const BuyersCarousel = ({ buyers, selectedBuyer, onSelect }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 1 },
      "(min-width: 1024px)": { slidesToScroll: 1 },
    },
  });

  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onInit = () => setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("init", onInit);
    emblaApi.on("select", onSelect);
    onInit();
    return () => { emblaApi.off("init", onInit); emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <div className="relative mt-8">
      <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
        <div className="flex gap-4 pb-4">
          {buyers.map((buyer, i) => (
            <BuyerCard
              key={buyer._id}
              buyer={buyer}
              isSelected={selectedBuyer?._id === buyer._id}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 bg-neutral-900/90 backdrop-blur-sm border border-neutral-800 rounded-full shadow-xl hover:bg-neutral-800 hover:border-emerald-500/30 transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        aria-label="Previous buyer"
      >
        <ChevronLeft size={22} className="text-neutral-300" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 bg-neutral-900/90 backdrop-blur-sm border border-neutral-800 rounded-full shadow-xl hover:bg-neutral-800 hover:border-emerald-500/30 transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        aria-label="Next buyer"
      >
        <ChevronRight size={22} className="text-neutral-300" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {scrollSnaps.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => scrollTo(i)}
            initial={{ scale: 0.8 }}
            animate={{ scale: i === selectedIndex ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]"
                : "bg-neutral-700 hover:bg-neutral-600"
            }`}
            aria-label={`View partner ${i + 1}`}
            aria-current={i === selectedIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="relative py-20 lg:py-32 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.08)_0%,_transparent_70%)]" />
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        className="inline-flex items-center gap-2 bg-neutral-800/50 border border-neutral-700 rounded-full px-4 py-2 mb-8"
      >
        <Globe size={16} className="text-emerald-500" />
        <span className="text-sm font-medium text-neutral-300 tracking-wide uppercase">Global Partnerships</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter text-white mb-6"
      >
        Trusted by <span className="font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Global Fashion Leaders</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed"
      >
        From Stockholm to Tokyo, New York to Paris — we partner with the world's most discerning fashion brands.
        Delivering quality, sustainability, and innovation at scale across 10+ countries.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-center"
      >
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">10+</div>
          <div className="text-neutral-500 text-sm mt-1">Countries Served</div>
        </div>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-neutral-700 to-transparent mx-2" />
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">50+</div>
          <div className="text-neutral-500 text-sm mt-1">Global Brands</div>
        </div>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-neutral-700 to-transparent mx-2" />
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">35M+</div>
          <div className="text-neutral-500 text-sm mt-1">Garments Annually</div>
        </div>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-neutral-700 to-transparent mx-2" />
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">99.8%</div>
          <div className="text-neutral-500 text-sm mt-1">Quality Score</div>
        </div>
      </motion.div>
    </div>
  </motion.section>
);

const StatsSection = () => {
  const stats = [
    { icon: Building2, label: "Manufacturing Facilities", value: "5", desc: "State-of-the-art" },
    { icon: Truck, label: "Countries Exported To", value: "25+", desc: "Global reach" },
    { icon: Award, label: "Certifications Held", value: "12+", desc: "Industry leading" },
    { icon: Clock, label: "Average Lead Time", value: "45 Days", desc: "Fast turnaround" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-neutral-900/50 border-y border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 bg-neutral-900/80 border border-neutral-800 rounded-2xl hover:border-emerald-500/30 transition-colors"
            >
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all">
                <stat.icon size={24} className="text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-neutral-300 font-medium mb-1">{stat.label}</div>
              <div className="text-neutral-500 text-sm">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BuyerMaps = () => {
  const { data: response, isLoading, isError, refetch } = useQuery({
    queryKey: ["public-buyer-maps"],
    queryFn: async () => {
      const { data } = await api.get("/buyer-maps/public");
      return data.data;
    },
  });

  const buyers = response || (isLoading ? [] : FALLBACK_BUYERS);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [mapView, setMapView] = useState(true);

  const featuredBuyers = buyers.filter(b => b.featured);
  const otherBuyers = buyers.filter(b => !b.featured);
  const displayBuyers = [...featuredBuyers, ...otherBuyers];

  const handleBuyerSelect = (buyer) => {
    setSelectedBuyer(buyer);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="text-emerald-500 animate-spin mx-auto mb-4" />
          <p className="text-neutral-400">Loading global partnerships...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">Unable to Load Partnerships</h2>
          <p className="text-neutral-400 mb-6">Please check your connection and try again.</p>
          <button onClick={() => refetch()} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <HeroSection />
      <StatsSection />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tighter">
                Our <span className="font-bold">Global Footprint</span>
              </h2>
              <p className="text-neutral-400 mt-2 max-w-xl">
                Explore our partner network across continents. Click on a location or use the carousel to discover each partnership.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMapView(true)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  mapView ? "bg-emerald-500 text-neutral-950" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                }`}
              >
                <Globe size={16} className="inline mr-1" /> World Map
              </button>
              <button
                onClick={() => setMapView(false)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  !mapView ? "bg-emerald-500 text-neutral-950" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                }`}
              >
                Carousel View
              </button>
            </div>
          </motion.div>

          {mapView ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <WorldMap buyers={displayBuyers} selectedBuyer={selectedBuyer} onCountryClick={handleBuyerSelect} />
            </motion.div>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: mapView ? 0.2 : 0 }}
          >
            <BuyersCarousel buyers={displayBuyers} selectedBuyer={selectedBuyer} onSelect={handleBuyerSelect} />
          </motion.div>

          {selectedBuyer && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="mt-16"
            >
              <SelectedBuyerDetail buyer={selectedBuyer} onClose={() => setSelectedBuyer(null)} />
            </motion.div>
          )}
        </div>
      </section>

      <footer className="py-16 border-t border-neutral-800 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-neutral-500 mb-4">Ready to join our global network of fashion leaders?</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-bold rounded-xl transition-colors">
            Become a Partner <ChevronRight size={18} />
          </a>
        </div>
      </footer>
    </div>
  );
};

const SelectedBuyerDetail = ({ buyer, onClose }) => (
  <div className="max-w-4xl mx-auto">
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-neutral-900 to-neutral-800">
        {buyer.logo?.url && (
          <img src={buyer.logo.url} alt={buyer.name} className="absolute inset-0 w-full h-full object-contain p-8 opacity-10" />
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-neutral-900/80 backdrop-blur-sm border border-neutral-700 rounded-xl flex items-center justify-center hover:bg-neutral-800 hover:border-neutral-600 transition-colors"
          aria-label="Close details"
        >
          <ChevronRight size={20} className="rotate-90 text-neutral-300" />
        </button>
      </div>

      <div className="p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-neutral-800 rounded-xl flex items-center justify-center overflow-hidden border border-neutral-700 flex-shrink-0">
              {buyer.logo?.url && <img src={buyer.logo.url} alt={buyer.name} className="w-full h-full object-contain p-2" />}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{buyer.name}</h3>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-neutral-400 text-sm">
                <span className="flex items-center gap-1"><MapPin size={14} />{buyer.country}</span>
                {buyer.partnershipYear && <span className="flex items-center gap-1"><Clock size={14} />{buyer.partnershipYear}</span>}
                {buyer.featured && <span className="flex items-center gap-1 text-emerald-400"><Sparkles size={14} />Featured Partner</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-neutral-300 leading-relaxed">{buyer.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {buyer.stats?.map((stat, index) => (
            <motion.div
              key={`${buyer._id}-detail-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 hover:border-emerald-500/30 transition-colors"
            >
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-white font-semibold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">Product Categories</h4>
          <div className="flex flex-wrap gap-2">
            {buyer.orderCategories?.map((cat, index) => (
              <motion.span
                key={`${buyer._id}-cat-detail-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.03 * index }}
                className="px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-full text-sm text-neutral-300 hover:bg-neutral-700 hover:border-neutral-600 transition-colors"
              >
                {cat}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BuyerMaps;