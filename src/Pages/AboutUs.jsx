import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, animate, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Boxes,
  ChevronDown,
  Gem,
  Globe2,
  Handshake,
  HeartHandshake,
  Leaf,
  Lightbulb,
  Recycle,
  Ruler,
  Scale,
  Scissors,
  Settings2,
  ShieldCheck,
  Sprout,
  Target,
  Truck,
  Zap,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const ease = [0.22, 1, 0.36, 1];

const SectionHeader = ({ kicker, title, highlight, description, align = "left", light = false }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl mb-14 md:mb-20`}
  >
    <p className={`text-[10px] tracking-[0.5em] uppercase font-bold mb-4 ${light ? "text-gray-500" : "text-gray-400"}`}>
      {kicker}
    </p>
    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter uppercase leading-[0.95] ${light ? "text-white" : "text-black"}`}>
      {title} {highlight && <span className="font-bold">{highlight}</span>}
    </h2>
    {description && (
      <p className={`mt-6 text-sm leading-relaxed ${light ? "text-gray-400" : "text-gray-500"}`}>
        {description}
      </p>
    )}
  </motion.div>
);

const Reveal = ({ children, className = "", delay = 0 }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    transition={{ delay, duration: 0.6, ease }}
    className={className}
  >
    {children}
  </motion.div>
);

const Counter = ({ value, prefix = "", suffix = "", decimals = 0, comma = true, text = null }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease,
      onUpdate: (v) => {
        const fixed = v.toFixed(decimals);
        setDisplay(comma && decimals === 0 ? Number(fixed).toLocaleString("en-US") : fixed);
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, comma]);

  return (
    <span ref={ref}>
      {text ?? `${prefix}${display}${suffix}`}
    </span>
  );
};

const HERO_IMG =
  "https://res.cloudinary.com/dcdmktxtz/image/upload/v1785532140/image_yggwdh.png";
const STORY_IMG =
  "https://res.cloudinary.com/dcdmktxtz/image/upload/v1772875746/WhatsApp_Image_2026-03-07_at_3.27.11_PM_jsogyo.jpg?q=80&w=1000&auto=format&fit=crop";
const EXCELLENCE_IMG =
  "https://res.cloudinary.com/dcdmktxtz/image/upload/v1776254791/WhatsApp_Image_2026-04-11_at_2.15.35_PM_mu5m8k.jpg";

const GLANCE_STATS = [
  { value: 2010, comma: false, label: "Established" },
  { value: 1600, suffix: "+", label: "Employees" },
  { value: 35000, suffix: "+", label: "Daily Production", note: "pcs / day" },
  { value: 25, suffix: "+", label: "Sewing Lines" },
  { value: 700, suffix: "+", label: "Machines" },
  { value: 110000, label: "Facility", note: "sq. ft." },
  { value: 25, prefix: "USD ", suffix: "M", label: "Annual Turnover" },
  { value: 0, text: "Global", label: "Export Markets" },
];

const CORE_VALUES = [
  { icon: ShieldCheck, title: "Integrity", desc: "Honesty and transparency across every relationship, from fabric sourcing to finished goods." },
  { icon: Gem, title: "Quality", desc: "Uncompromising standards at every checkpoint, delivering garments that exceed expectations." },
  { icon: Lightbulb, title: "Innovation", desc: "Continuous process improvement, modern machinery and creative product development." },
  { icon: Leaf, title: "Sustainability", desc: "Responsible production that protects people and the planet for generations to come." },
  { icon: Handshake, title: "Partnership", desc: "We grow alongside our customers, built on trust, communication and mutual success." },
  { icon: Award, title: "Excellence", desc: "A relentless pursuit of world-class output in everything we do, every single day." },
];

const EXCELLENCE_PILLARS = [
  { icon: Scissors, title: "Knit & Woven Expertise", desc: "Vertically integrated production across single jersey, pique, fleece, interlock and woven essentials." },
  { icon: Boxes, title: "Product Development", desc: "In-house design and R&D that turn buyer concepts into production-ready garments." },
  { icon: Ruler, title: "Sampling", desc: "Rapid sampling with accurate lab dips, trims and proto approvals." },
  { icon: Settings2, title: "Production Planning", desc: "Industrial engineering drives line balancing, capacity planning and resource efficiency." },
  { icon: BadgeCheck, title: "Quality Assurance", desc: "Six-stage AQL inspection from incoming fabric to finished goods." },
  { icon: Scale, title: "Compliance", desc: "Ethical, social and environmental audits that meet international buyer standards." },
  { icon: Truck, title: "On-Time Delivery", desc: "A 98%+ on-time record that keeps your retail calendar firmly on track." },
];

const PARTNERS = [
  "NORDIC APPAREL",
  "EUROLINE STORES",
  "PACIFIC WEAR",
  "GLOBAL RETAIL CO.",
  "ORION COLLECTION",
  "VANTA BRANDS",
];

const SUSTAINABILITY = [
  { icon: Sprout, title: "Responsible Sourcing", desc: "Ethical raw material procurement and certified supply partners." },
  { icon: Recycle, title: "Waste Reduction", desc: "Lean cutting, 95%+ fabric utilization and recycling programs." },
  { icon: Zap, title: "Energy Efficiency", desc: "Modern machinery and energy management across the facility." },
  { icon: Handshake, title: "Ethical Manufacturing", desc: "Fair wages, safe working conditions and zero child labor." },
  { icon: HeartHandshake, title: "Worker Welfare", desc: "Healthcare, canteen, transport and continuous training." },
  { icon: Globe2, title: "Environmental Responsibility", desc: "Effluent treatment, water conservation and a lower carbon footprint." },
];

const WHY_CHOOSE = [
  { title: "Certified Production", desc: "BSCI Grade A, ISO, SEDEX and OEKO-TEX accredited." },
  { title: "Flexible MOQs", desc: "Order sizes tailored for emerging and established brands." },
  { title: "Fast Lead Time", desc: "Lean planning for competitive sample and production cycles." },
  { title: "Skilled Workforce", desc: "1,600+ trained professionals across every function." },
  { title: "Modern Machinery", desc: "700+ machines including automated and specialized units." },
  { title: "Export Compliance", desc: "100% export-oriented, customs and compliance ready." },
  { title: "Merchandising Support", desc: "A dedicated merchandiser on every account." },
  { title: "Quality At Every Stage", desc: "Six-stage QC from incoming fabric to final finish." },
];

const MILESTONES = [
  { year: "2010", title: "Company Founded", desc: "Manami Fashions Ltd. is established in Dhaka, Bangladesh." },
  { year: "2013", title: "First Export Shipment", desc: "Our first international shipment leaves the factory floor." },
  { year: "2016", title: "Facility Expansion", desc: "The facility grows to 110,000 sq. ft. with modern infrastructure." },
  { year: "2018", title: "International Certifications", desc: "BSCI, ISO and global compliance accreditations are earned." },
  { year: "2021", title: "Production Capacity Growth", desc: "Scale reaches 35,000 pcs daily across 25 sewing lines." },
  { year: "2024", title: "Global Manufacturing Partnerships", desc: "Long-term partnerships are forged with buyers worldwide." },
];

const AboutUs = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const heroWords = ["About", "Manami", "Fashions."];

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-hidden">
      {/* ============ 1. HERO ============ */}
      <section ref={heroRef} className="relative flex items-center justify-center min-h-[92vh] overflow-hidden bg-black">
        <motion.div
          style={{ y: bgY, backgroundImage: `url(${HERO_IMG})` }}
          aria-hidden
          className="absolute inset-0 bg-cover bg-center scale-110"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <div aria-hidden className="absolute inset-0 bg-black/65" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 flex flex-col items-center text-center px-6 py-24 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="h-px w-8 bg-white/40" />
            <span className="text-white/50 uppercase tracking-[0.3em] text-[11px] font-medium">
              Who We Are
            </span>
            <span className="h-px w-8 bg-white/40" />
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter uppercase leading-[0.9] text-white mb-6">
            {heroWords.map((word, i) => (
              <motion.span
                key={word}
                className={`inline-block ${i > 0 ? "font-bold" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.12, ease }}
              >
                {word}
                {i < heroWords.length - 1 && "\u00A0"}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="text-white/40 text-sm md:text-base font-light max-w-xl leading-relaxed"
          >
            A trusted, export-oriented knit &amp; woven garments manufacturer — delivering
            precision-engineered apparel to leading brands across the globe since 2010.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-12 flex items-center gap-3 text-white/40"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Scroll to explore</span>
            <ChevronDown size={14} />
          </motion.div>
        </motion.div>
      </section>

      {/* ============ 2. COMPANY STORY ============ */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-20">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold mb-6">
              Our Journey
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter uppercase leading-[0.95] mb-8">
              From 2010 To A <br />
              <span className="font-bold">Global Manufacturing Partner.</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
              Manami Fashions Ltd. began in 2010 with a single conviction — that Bangladeshi
              garment manufacturing could stand shoulder-to-shoulder with the world&apos;s best.
              From our first sewing line, we have grown into a vertically integrated factory that
              combines industrial-scale capacity with meticulous craftsmanship.
            </p>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10">
              Today, 1,600+ skilled professionals operate 25+ production lines inside a
              110,000 sq. ft. facility, shipping 35,000 garments every day to demanding buyers
              across Europe, the USA and beyond. Every step of the journey has been guided by one
              principle: enhance our customers&apos; success, and our own will follow.
            </p>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 border-l-2 border-black pl-6 py-1">
                <div>
                  <div className="text-3xl font-bold tracking-tighter">13+</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400">Years of Export</div>
                </div>
              </div>
              <div className="flex items-center gap-4 border-l-2 border-gray-200 pl-6 py-1">
                <div>
                  <div className="text-3xl font-bold tracking-tighter">98%</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400">On-Time Delivery</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="relative"
          >
            <div aria-hidden className="absolute -top-6 -right-6 w-full h-full border border-gray-100" />
            <div className="relative overflow-hidden">
              <img
                src={STORY_IMG}
                alt="Inside the Manami Fashions factory"
                className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 bg-black text-white px-6 py-4">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Established 2010</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ 3. AT A GLANCE ============ */}
      <section className="py-24 md:py-32 bg-[#111] px-6 md:px-16 lg:px-20">
        <div className="max-w-screen-xl mx-auto">
          <SectionHeader
            kicker="At A Glance"
            title="The Numbers That"
            highlight="Define Us."
            description="A snapshot of the scale, capability and discipline behind every Manami shipment."
            light
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {GLANCE_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (i % 4) * 0.08, duration: 0.6, ease }}
                className="bg-[#111] p-8 md:p-10 group"
              >
                <div className="text-4xl md:text-5xl font-light tracking-tighter text-white">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    comma={stat.comma}
                    text={stat.text}
                  />
                </div>
                <div className="mt-3 h-px w-8 bg-gray-700 group-hover:bg-white transition-colors duration-300" />
                <div className="mt-3 text-[10px] uppercase tracking-[0.25em] font-bold text-gray-500">
                  {stat.label}
                </div>
                {stat.note && (
                  <div className="mt-1 text-[9px] uppercase tracking-widest text-gray-600">
                    {stat.note}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. VISION & MISSION ============ */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-20">
        <div className="max-w-screen-xl mx-auto">
          <SectionHeader
            kicker="The Manami Foundation"
            title="Vision &"
            highlight="Mission."
            description="The principles that shape every decision we make and every garment we ship."
          />
          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                icon: Target,
                index: "01",
                title: "Vision",
                main: "To become a leading knit garments manufacturer in Bangladesh.",
                points: [
                  "Deliver high-quality products providing exceptional value.",
                  "Achieve operational excellence through resource utilization.",
                  "Foster leadership through training and innovation recognition.",
                ],
              },
              {
                icon: Lightbulb,
                index: "02",
                title: "Mission",
                main: "Pursuing excellence through world-class product standards.",
                points: [
                  "Innovate processes to ensure peak customer satisfaction.",
                  "Empower employees to drive factory-wide excellence.",
                  "Continually strive to exceed people and customer expectations.",
                ],
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.12, duration: 0.6, ease }}
                className="group relative flex flex-col bg-[#111] p-10 md:p-12 border border-gray-800 hover:border-white transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-10 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter group-hover:tracking-widest transition-all duration-500">
                    {item.title}
                  </h3>
                  <item.icon size={26} className="text-gray-500 group-hover:text-white transition-colors" />
                </div>
                <p className="text-lg font-light leading-tight text-gray-300 group-hover:text-white transition-colors mb-8">
                  {item.main}
                </p>
                <ul className="mt-auto space-y-4 pt-8 border-t border-gray-900 group-hover:border-gray-700 transition-colors">
                  {item.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-4">
                      <span className="h-px w-3 bg-gray-600 mt-2.5 transition-all group-hover:w-6 group-hover:bg-white" />
                      <p className="text-xs text-gray-500 group-hover:text-gray-400 leading-relaxed uppercase tracking-wider">
                        {point}
                      </p>
                    </li>
                  ))}
                </ul>
                <span aria-hidden className="absolute -bottom-6 -right-2 text-[9rem] font-bold text-white/[0.03] pointer-events-none select-none">
                  {item.index}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. CORE VALUES ============ */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <SectionHeader
            kicker="Core Values"
            title="The Principles We"
            highlight="Manufacture By."
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.6, ease }}
                whileHover={{ y: -6 }}
                className="group bg-white border border-gray-100 p-8 transition-all duration-500 hover:border-black hover:shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gray-50 group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <value.icon size={20} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 group-hover:text-gray-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-3">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. MANUFACTURING EXCELLENCE ============ */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-20">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="order-2 lg:order-1">
            <SectionHeader
              kicker="Manufacturing Excellence"
              title="Engineered For"
              highlight="Precision."
              description="Seven disciplines working in unison to deliver garments that are made right — every time."
            />
            <ul className="space-y-0">
              {EXCELLENCE_PILLARS.map((pillar, i) => (
                <motion.li
                  key={pillar.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease }}
                  className="group flex items-start gap-6 py-5 border-b border-gray-100"
                >
                  <span className="text-[10px] font-bold text-gray-300 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <pillar.icon size={16} strokeWidth={1.5} className="text-gray-400 group-hover:text-black transition-colors" />
                      <h3 className="font-bold uppercase tracking-tight text-sm">{pillar.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{pillar.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="order-1 lg:order-2 relative"
          >
            <div className="lg:sticky lg:top-28 overflow-hidden">
              <img
                src={EXCELLENCE_IMG}
                alt="Manami Fashions finishing section"
                className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute top-0 right-0 bg-black text-white px-6 py-4">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">700+ Machines</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ 7. GLOBAL PARTNERSHIPS ============ */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <Reveal>
                <p className="text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold mb-6">
                  Global Partnerships
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase leading-[0.95] mb-8">
                  Trusted By Buyers <br />
                  <span className="font-bold">Worldwide.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
                  Our buyers are international retailers, brands and importers who demand
                  consistency, compliance and transparency. We serve them with dedicated
                  merchandising teams, honest communication and production schedules built on
                  trust — not promises.
                </p>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                  Many of our partnerships span over a decade. We believe a long-term buyer
                  relationship is earned one shipment at a time.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="border border-gray-200 bg-white">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-gray-200">
                  {PARTNERS.map((partner, i) => (
                    <motion.div
                      key={partner}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="bg-white flex items-center justify-center h-24 md:h-28 px-4 group cursor-default"
                    >
                      <span className="text-[11px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-gray-600 transition-colors duration-300 text-center leading-relaxed">
                        {partner}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="px-6 py-4 border-t border-gray-100 text-[9px] uppercase tracking-widest text-gray-400">
                  Representative Client Portfolio
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 8. SUSTAINABILITY ============ */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-20">
        <div className="max-w-screen-xl mx-auto">
          <SectionHeader
            kicker="Sustainability Commitment"
            title="Made Responsibly,"
            highlight="Built To Last."
            description="Sustainability is not a campaign — it is how we run our factory every day."
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUSTAINABILITY.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.6, ease }}
                whileHover={{ y: -6 }}
                className={`group relative bg-white border border-gray-100 p-8 transition-all duration-500 hover:border-black hover:shadow-xl ${
                  i % 3 === 1 ? "lg:translate-y-8" : ""
                }`}
              >
                <item.icon size={24} strokeWidth={1.5} className="text-gray-400 group-hover:text-black mb-6 transition-colors" />
                <h3 className="text-lg font-bold uppercase tracking-tight mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                <span aria-hidden className="absolute bottom-0 left-0 h-0.5 bg-black w-0 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 9. LEADERSHIP ============ */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-20 bg-[#111]">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-gray-800">
              <div className="text-center">
                <div className="text-7xl md:text-8xl font-bold tracking-tighter text-white/90 select-none">MF</div>
                <div className="mt-4 h-px w-10 mx-auto bg-gray-600" />
                <div className="mt-4 text-[10px] uppercase tracking-[0.35em] text-gray-500">Managing Director</div>
              </div>
            </div>
            <div aria-hidden className="absolute -bottom-4 -right-4 w-full h-full border border-gray-800" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <p className="text-[10px] tracking-[0.5em] uppercase text-gray-500 font-bold mb-6">
              Leadership
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter uppercase leading-[0.95] text-white mb-8">
              Guided By <br />
              <span className="font-bold">Experience.</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
              Under the leadership of our Managing Director, Manami Fashions has grown from a
              single unit into an internationally recognized manufacturing partner. The philosophy
              is simple — invest in people, pursue precision, and put customer success first.
            </p>
            <div className="space-y-5 mb-10">
              {[
                "People first — our 1,600+ employees are our greatest asset.",
                "Precision over speed — quality is never compromised.",
                "Long-term thinking — partnerships built to last decades.",
              ].map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease }}
                  className="flex items-start gap-4"
                >
                  <span className="h-px w-6 bg-gray-600 mt-2.5" />
                  <p className="text-sm text-gray-400 uppercase tracking-wider leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-xl font-bold tracking-tight text-white">Mohsin Faisal</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-1">Managing Director, Manami Fashions Ltd.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ 10. WHY CHOOSE MANAMI ============ */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-20">
        <div className="max-w-screen-xl mx-auto">
          <SectionHeader
            kicker="Why Choose Manami"
            title="Built To Make Your"
            highlight="Business Easier."
            description="Eight reasons global buyers choose Manami Fashions as a long-term partner."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
            {WHY_CHOOSE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 4) * 0.08, duration: 0.5, ease }}
                className="group bg-white p-8 hover:bg-black hover:text-white transition-colors duration-500 cursor-default"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-bold text-gray-300 group-hover:text-gray-500 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="w-5 h-px bg-gray-200 group-hover:bg-white transition-colors" />
                </div>
                <h3 className="font-bold uppercase tracking-tight text-sm mb-3">{item.title}</h3>
                <p className="text-xs text-gray-500 group-hover:text-gray-400 leading-relaxed transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 11. TIMELINE ============ */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <SectionHeader
            kicker="Milestones"
            title="A Journey Of"
            highlight="Constant Growth."
            align="center"
          />
          <div className="relative max-w-4xl mx-auto">
            <div aria-hidden className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gray-200 lg:-translate-x-1/2" />
            <div className="space-y-14 lg:space-y-16">
              {MILESTONES.map((m, i) => {
                const left = i % 2 === 0;
                return (
                  <div key={m.year} className="relative flex">
                    <motion.span
                      aria-hidden
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="absolute left-4 lg:left-1/2 -translate-x-1/2 top-2 w-2.5 h-2.5 bg-black rounded-full"
                    />
                    <motion.div
                      initial={{ opacity: 0, x: left ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.7, ease }}
                      className={`ml-12 lg:ml-0 lg:w-[calc(50%-2.5rem)] ${
                        left ? "lg:pr-12 lg:text-right" : "lg:pl-12"
                      }`}
                    >
                      <div className="text-4xl md:text-5xl font-light tracking-tighter">{m.year}</div>
                      <div className={`mt-2 h-px w-10 bg-black ${left ? "lg:ml-auto" : ""}`} />
                      <h3 className="mt-4 font-bold uppercase tracking-tight text-sm">{m.title}</h3>
                      <p className="mt-2 text-sm text-gray-500 leading-relaxed">{m.desc}</p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 12. FINAL CTA ============ */}
      <section className="relative overflow-hidden bg-black text-white py-32 md:py-40 px-6 md:px-16 lg:px-20">
        <motion.div
          aria-hidden
          className="absolute -top-48 -left-48 w-[560px] h-[560px] rounded-full bg-white/[0.05] blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-48 -right-48 w-[560px] h-[560px] rounded-full bg-white/[0.05] blur-3xl"
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 rounded-full bg-white/[0.03] blur-2xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.5em] uppercase text-gray-500 font-bold mb-6"
          >
            Start The Conversation
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter uppercase leading-[0.95] mb-8"
          >
            Let&apos;s Build The Next <br />
            <span className="font-bold">Collection Together.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-12"
          >
            From first sketch to final shipment, we are ready when you are. Explore what we make,
            or talk to our team directly.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-100 transition-all duration-300"
            >
              Explore Products <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bottom tags */}
      <div className="bg-white py-12 px-6 md:px-16 lg:px-20">
        <div className="max-w-screen-xl mx-auto flex flex-wrap gap-x-12 gap-y-4 opacity-40 grayscale">
          {["100% Export Oriented", "BSCI Grade A", "ISO Certified", "BGMEA Registered"].map((tag) => (
            <div key={tag} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span className="text-[10px] uppercase tracking-widest font-bold">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
