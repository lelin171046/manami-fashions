
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  animate,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDown,
  ArrowRight,
  Award,
  BadgeCheck,
  Boxes,
  Building2,
  ChevronRight,
  Factory,
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
  Users,
  Zap,
} from "lucide-react";

import api from "../api/axios.js";

/* =========================================================
   CONSTANTS
========================================================= */

const ease = [0.22, 1, 0.36, 1];

const HERO_IMG =
  "https://res.cloudinary.com/dcdmktxtz/image/upload/v1785532140/image_yggwdh.png";

const STORY_IMG =
  "https://res.cloudinary.com/dcdmktxtz/image/upload/v1772875746/WhatsApp_Image_2026-03-07_at_3.27.11_PM_jsogyo.jpg?q=80&w=1000&auto=format&fit=crop";

const EXCELLENCE_IMG =
  "https://res.cloudinary.com/dcdmktxtz/image/upload/v1776254791/WhatsApp_Image_2026-04-11_at_2.15.35_PM_mu5m8k.jpg";

// const LEADERSHIP_IMG =
  // "https://res.cloudinary.com/dg04kyz8n/image/upload/v1787583227/WhatsApp_Image_2026-08-24_at_8.52.56_PM_n7l9cq.jpg"; 

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const slideLeft = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const slideRight = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

const Reveal = ({
  children,
  className = "",
  delay = 0,
  variant = fadeUp,
}) => {
  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-80px",
      }}
      transition={{
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionHeader = ({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  dark = false,
}) => {
  const centered = align === "center";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-80px",
      }}
      variants={fadeUp}
      className={`
        ${centered ? "mx-auto text-center" : ""}
        max-w-3xl
        ${centered ? "mb-16 md:mb-20" : "mb-14 md:mb-20"}
      `}
    >
      <div
        className={`
          mb-5 flex items-center gap-3
          ${centered ? "justify-center" : ""}
        `}
      >
        {!centered && (
          <span
            className={`h-px w-8 ${
              dark ? "bg-white/30" : "bg-black/20"
            }`}
          />
        )}

        <p
          className={`
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.28em]
            ${dark ? "text-white/40" : "text-neutral-400"}
          `}
        >
          {eyebrow}
        </p>
      </div>

      <h2
        className={`
          text-4xl
          font-light
          leading-[0.95]
          tracking-[-0.055em]
          md:text-5xl
          lg:text-6xl
          ${dark ? "text-white" : "text-neutral-950"}
        `}
      >
        {title}{" "}
        {highlight && (
          <span className="font-semibold">{highlight}</span>
        )}
      </h2>

      {description && (
        <p
          className={`
            mx-auto
            mt-6
            max-w-2xl
            text-sm
            leading-[1.8]
            tracking-[-0.01em]
            md:text-[15px]
            ${dark ? "text-white/45" : "text-neutral-500"}
          `}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};

const Counter = ({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  comma = true,
  text = null,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView || text) return;

    const controls = animate(0, value, {
      duration: 2,
      ease,
      onUpdate: (current) => {
        const fixed = current.toFixed(decimals);

        if (comma && decimals === 0) {
          setDisplay(Number(fixed).toLocaleString("en-US"));
        } else {
          setDisplay(fixed);
        }
      },
    });

    return () => controls.stop();
  }, [inView, value, decimals, comma, text]);

  return (
    <span ref={ref}>
      {text ?? `${prefix}${display}${suffix}`}
    </span>
  );
};

/* =========================================================
   DATA
========================================================= */

const STATS = [
  {
    value: 2010,
    label: "Established",
  },
  {
    value: 1600,
    suffix: "+",
    label: "Employees",
  },
  {
    value: 40000,
    suffix: "+",
    label: "Daily Production",
    note: "pcs / day",
  },
  {
    value: 20,
    suffix: "+",
    label: "Sewing Lines",
  },
  {
    value: 700,
    suffix: "+",
    label: "Machines",
  },
  {
    value: 110000,
    label: "Facility",
    note: "sq. ft.",
  },
  {
    value: 20,
    prefix: "USD ",
    suffix: "M",
    label: "Annual Turnover",
  },
  {
    text: "Global",
    label: "Export Focus",
  },
];

const VALUES = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Integrity",
    description:
      "Honest communication and transparent relationships across every stage of the supply chain.",
  },
  {
    icon: Gem,
    number: "02",
    title: "Quality",
    description:
      "Consistent standards from raw materials through inspection, finishing and final shipment.",
  },
  {
    icon: Lightbulb,
    number: "03",
    title: "Innovation",
    description:
      "Smarter processes, modern machinery and continuous improvement across our operations.",
  },
  {
    icon: Leaf,
    number: "04",
    title: "Sustainability",
    description:
      "Responsible manufacturing practices designed to create long-term value for people and planet.",
  },
  {
    icon: Handshake,
    number: "05",
    title: "Partnership",
    description:
      "Long-term buyer relationships built through reliability, communication and shared success.",
  },
  {
    icon: Award,
    number: "06",
    title: "Excellence",
    description:
      "A culture of discipline and continuous improvement in everything we manufacture.",
  },
];

const CAPABILITIES = [
  {
    icon: Scissors,
    title: "Knit & Woven",
    description:
      "Production capabilities across a broad range of knit and woven apparel categories.",
  },
  {
    icon: Boxes,
    title: "Product Development",
    description:
      "From buyer concepts to production-ready garments through structured development.",
  },
  {
    icon: Ruler,
    title: "Sampling",
    description:
      "Structured sampling with attention to measurements, materials, trims and approvals.",
  },
  {
    icon: Settings2,
    title: "Production Planning",
    description:
      "Industrial engineering, line balancing and capacity planning for efficient production.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assurance",
    description:
      "Multi-stage quality control from incoming materials through finished garments.",
  },
  {
    icon: Scale,
    title: "Compliance",
    description:
      "Structured systems supporting social, ethical and environmental buyer requirements.",
  },
  {
    icon: Truck,
    title: "On-Time Delivery",
    description:
      "Production planning and communication focused on reliable shipment schedules.",
  },
];

const SUSTAINABILITY = [
  {
    icon: Sprout,
    title: "Responsible Sourcing",
    description:
      "Ethical procurement and responsible supply-chain relationships.",
  },
  {
    icon: Recycle,
    title: "Waste Reduction",
    description:
      "Lean production and material-efficiency initiatives across operations.",
  },
  {
    icon: Zap,
    title: "Energy Efficiency",
    description:
      "Modern equipment and operational practices designed to reduce resource consumption.",
  },
  {
    icon: HeartHandshake,
    title: "Worker Welfare",
    description:
      "A workplace focused on safety, development, welfare and dignity.",
  },
  {
    icon: Globe2,
    title: "Environmental Care",
    description:
      "Responsible water, waste and environmental-management practices.",
  },
  {
    icon: Users,
    title: "People Development",
    description:
      "Training and continuous development supporting a skilled workforce.",
  },
];

const WHY_MANAMI = [
  "Export-oriented manufacturing",
  "Dedicated merchandising support",
  "Modern production machinery",
  "Experienced workforce",
  "Structured quality control",
  "Buyer-focused communication",
  "Flexible production capabilities",
  "Long-term partnership approach",
];

const MILESTONES = [
  {
    year: "2010",
    title: "Company Founded",
    description:
      "Manami Fashions Ltd. begins its journey in Bangladesh's apparel manufacturing industry.",
  },
  {
    year: "2013",
    title: "International Expansion",
    description:
      "The company expands its international customer and export relationships.",
  },
  {
    year: "2016",
    title: "Facility Development",
    description:
      "Production infrastructure and manufacturing capabilities continue to expand.",
  },
  {
    year: "2018",
    title: "Compliance Growth",
    description:
      "The company strengthens its international compliance and certification framework.",
  },
  {
    year: "2021",
    title: "Production Scale",
    description:
      "Manufacturing capacity grows with additional production lines and machinery.",
  },
  {
    year: "2024",
    title: "Global Partnerships",
    description:
      "Long-term manufacturing relationships continue to develop across international markets.",
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

const AboutUs = () => {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "18%"]
  );

  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.08, 1.16]
  );

  const heroContentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "24%"]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.65],
    [1, 0]
  );

  const { data: buyers, isLoading: buyersLoading } = useQuery({
    queryKey: ["public-featured-buyers"],
    queryFn: async () => {
      const { data } = await api.get("/buyers/public?featured=true");
      return data.data;
    },
  });

  return (
    <main className="min-h-screen overflow-hidden bg-white font-['Manrope',sans-serif] text-neutral-950 antialiased">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        ref={heroRef}
        className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-black"
      >
        <motion.div
          style={{
            y: heroImageY,
            scale: heroScale,
          }}
          className="absolute inset-0 bg-cover bg-center"
        >
          <img
            src={HERO_IMG}
            alt="Manami Fashions manufacturing facility"
            className="h-full w-full object-cover"
            loading="eager"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/80" />

        <motion.div
          style={{
            y: heroContentY,
            opacity: heroOpacity,
          }}
          className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="h-px w-8 bg-white/30" />

            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/55">
              About Manami Fashions
            </span>

            <span className="h-px w-8 bg-white/30" />
          </motion.div>

          <h1 className="max-w-5xl text-5xl font-light uppercase leading-[0.88] tracking-[-0.065em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease }}
              className="block"
            >
              About
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.48, ease }}
              className="block font-semibold"
            >
              Manami
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.61, ease }}
              className="block"
            >
              Fashions.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 max-w-2xl text-sm font-light leading-[1.8] text-white/55 md:text-base"
          >
            An export-oriented knit and woven apparel manufacturer
            combining production capability, disciplined quality systems
            and long-term buyer partnerships.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-14 flex flex-col items-center gap-3 text-white/40"
          >
            <span className="text-[9px] font-medium uppercase tracking-[0.4em]">
              Scroll to explore
            </span>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowDown size={15} strokeWidth={1.2} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="px-6 py-24 md:px-16 md:py-32 lg:px-20">
        <div className="mx-auto grid max-w-screen-xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">

          <Reveal variant={slideLeft}>
            <div className="relative">
              <div className="absolute -right-5 -top-5 h-full w-full border border-neutral-100" />

              <div className="relative overflow-hidden">
                <img
                  src={STORY_IMG}
                  alt="Inside Manami Fashions factory"
                  className="aspect-[4/5] w-full object-cover grayscale transition-all duration-1000 hover:grayscale-0"
                  loading="lazy"
                />

                <div className="absolute bottom-0 left-0 bg-black px-6 py-4 text-white">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em]">
                    Established 2010
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal variant={slideRight}>
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-black" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
                  Our Journey
                </span>
              </div>

              <h2 className="text-4xl font-light uppercase leading-[0.94] tracking-[-0.055em] md:text-5xl lg:text-6xl">
                Built For
                <br />
                <span className="font-semibold">
                  Long-Term Partnerships.
                </span>
              </h2>

              <div className="mt-8 space-y-5 text-sm leading-[1.85] tracking-[-0.01em] text-neutral-500 md:text-[15px]">
                <p>
                  Manami Fashions Ltd. began its journey in 2010 with a
                  clear ambition — to build a reliable Bangladeshi apparel
                  manufacturing partner capable of meeting international
                  expectations.
                </p>

                <p>
                  Over the years, the company has developed its production
                  infrastructure, workforce and technical capabilities while
                  maintaining a strong focus on quality, compliance and
                  customer service.
                </p>

                <p>
                  Today, Manami operates as an export-oriented manufacturer,
                  supporting international buyers through structured
                  production, merchandising and quality-management systems.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 border-t border-neutral-200 pt-8">
                <div>
                  <div className="text-3xl font-light tracking-[-0.05em]">
                    2010
                  </div>

                  <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                    Established
                  </p>
                </div>

                <div className="border-l border-neutral-200 pl-6">
                  <div className="text-3xl font-light tracking-[-0.05em]">
                    Global
                  </div>

                  <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                    Export Focus
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          STATEMENT
      ===================================================== */}

      <section className="border-y border-neutral-900 bg-black px-6 py-28 text-white md:px-16 md:py-36 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
              Our Approach
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-8 max-w-5xl text-4xl font-light leading-[0.95] tracking-[-0.055em] md:text-6xl lg:text-7xl">
              We don't simply manufacture garments.
              <span className="block font-semibold text-white/80">
                We build manufacturing partnerships.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12 flex max-w-2xl items-start gap-5">
              <span className="mt-3 h-px w-10 shrink-0 bg-white/30" />

              <p className="text-sm leading-[1.8] text-white/45 md:text-[15px]">
                From product development and sampling to production,
                quality assurance and shipment, our systems are designed
                around one objective: making the manufacturing process
                more predictable for our buyers.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          AT A GLANCE
      ===================================================== */}

      <section className="bg-[#111] px-6 py-24 md:px-16 md:py-32 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <SectionHeader
            eyebrow="At A Glance"
            title="The Scale Behind"
            highlight="Every Shipment."
            description="A concise view of the infrastructure, workforce and production capability supporting Manami Fashions."
            dark
          />

          <div className="grid grid-cols-2 border border-white/10 lg:grid-cols-4">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  margin: "-60px",
                }}
                transition={{
                  delay: (index % 4) * 0.08,
                  duration: 0.6,
                  ease,
                }}
                className="group border-b border-r border-white/10 p-7 transition-colors duration-500 hover:bg-white/[0.035] md:p-9 lg:p-10"
              >
                <div className="text-3xl font-light tracking-[-0.05em] text-white md:text-4xl lg:text-5xl">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    comma={stat.value >= 1000}
                    text={stat.text}
                  />
                </div>

                <div className="mt-5 h-px w-7 bg-white/20 transition-all duration-500 group-hover:w-12 group-hover:bg-white" />

                <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  {stat.label}
                </p>

                {stat.note && (
                  <p className="mt-1 text-[9px] uppercase tracking-widest text-white/20">
                    {stat.note}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          VISION / MISSION
      ===================================================== */}

      <section className="px-6 py-24 md:px-16 md:py-32 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <SectionHeader
            eyebrow="The Foundation"
            title="Vision."
            highlight="Mission."
            description="Two principles that define where Manami is going and how we intend to get there."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                number: "01",
                icon: Target,
                title: "Vision",
                text: "To become a leading knit garments manufacturer in Bangladesh.",
                points: [
                  "Deliver high-quality products with exceptional value.",
                  "Achieve operational excellence through effective resource utilization.",
                  "Develop leadership through training, innovation and recognition.",
                ],
              },
              {
                number: "02",
                icon: Lightbulb,
                title: "Mission",
                text: "Pursuing excellence through world-class product and manufacturing standards.",
                points: [
                  "Continuously improve processes and customer satisfaction.",
                  "Empower employees to contribute to factory-wide excellence.",
                  "Consistently exceed customer and stakeholder expectations.",
                ],
              },
            ].map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.7,
                  ease,
                }}
                className="group relative overflow-hidden border border-neutral-200 p-8 md:p-12"
              >
                <span className="absolute -right-5 -top-12 select-none text-[10rem] font-semibold leading-none tracking-tighter text-neutral-100">
                  {item.number}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center bg-neutral-950 text-white">
                      <item.icon size={19} strokeWidth={1.4} />
                    </div>

                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-300">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-12 text-3xl font-light uppercase tracking-[-0.04em]">
                    {item.title}
                  </h3>

                  <p className="mt-5 max-w-lg text-lg font-light leading-[1.45] tracking-[-0.02em] text-neutral-700">
                    {item.text}
                  </p>

                  <div className="mt-8 border-t border-neutral-200 pt-7">
                    <ul className="space-y-4">
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-4 text-sm leading-relaxed text-neutral-500"
                        >
                          <span className="mt-2 h-px w-5 shrink-0 bg-neutral-300 transition-all duration-300 group-hover:w-8 group-hover:bg-black" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CAPABILITIES
      ===================================================== */}

      <section className="bg-neutral-50 px-6 py-24 md:px-16 md:py-32 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <SectionHeader
            eyebrow="Manufacturing Capability"
            title="From Concept"
            highlight="To Shipment."
            description="A connected production ecosystem supporting product development, manufacturing, quality and delivery."
            align="center"
          />

          <div className="grid gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  margin: "-50px",
                }}
                transition={{
                  delay: (index % 4) * 0.07,
                  duration: 0.6,
                  ease,
                }}
                className="group bg-white p-7 transition-all duration-500 hover:bg-black hover:text-white md:p-8"
              >
                <div className="flex items-center justify-between">
                  <item.icon
                    size={21}
                    strokeWidth={1.4}
                    className="text-neutral-400 transition-colors duration-300 group-hover:text-white"
                  />

                  <span className="text-[9px] font-semibold tracking-[0.2em] text-neutral-300 group-hover:text-white/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-10 text-base font-semibold uppercase tracking-[-0.01em]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-[1.7] text-neutral-500 transition-colors duration-300 group-hover:text-white/45">
                  {item.description}
                </p>

                <div className="mt-7 h-px w-0 bg-white transition-all duration-500 group-hover:w-10" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CORE VALUES
      ===================================================== */}

      <section className="px-6 py-24 md:px-16 md:py-32 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <SectionHeader
            eyebrow="What Guides Us"
            title="Values Behind"
            highlight="The Work."
          />

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  margin: "-60px",
                }}
                transition={{
                  delay: (index % 3) * 0.1,
                  duration: 0.6,
                  ease,
                }}
                className="group border-t border-neutral-200 pt-7"
              >
                <div className="flex items-center justify-between">
                  <item.icon
                    size={21}
                    strokeWidth={1.4}
                    className="text-neutral-400 transition-colors group-hover:text-black"
                  />

                  <span className="text-[10px] font-semibold tracking-[0.25em] text-neutral-300">
                    {item.number}
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-semibold uppercase tracking-[-0.025em]">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-[1.75] text-neutral-500">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          GLOBAL PARTNERSHIPS
      ===================================================== */}

      <section className="bg-neutral-50 px-6 py-24 md:px-16 md:py-32 lg:px-20">
        <div className="mx-auto grid max-w-screen-xl items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-black" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
                  Global Partnerships
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="text-4xl font-light uppercase leading-[0.94] tracking-[-0.055em] md:text-5xl">
                Trusted By
                <br />
                <span className="font-semibold">
                  Buyers Worldwide.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-sm leading-[1.8] text-neutral-500 md:text-[15px]">
                <p>
                  Our buyers value consistency, compliance, transparency
                  and dependable communication throughout the production
                  cycle.
                </p>

                <p>
                  We approach every relationship as a long-term
                  partnership, supporting buyers through dedicated
                  merchandising and structured production planning.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] transition-all hover:gap-5"
              >
                Start a conversation
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="overflow-hidden border border-neutral-200 bg-white">
              <div className="grid grid-cols-2 gap-px bg-neutral-200 sm:grid-cols-3">
                {buyersLoading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex h-28 animate-pulse items-center justify-center bg-white px-4"
                    >
                      <div className="h-7 w-24 rounded bg-neutral-100" />
                    </div>
                  ))
                ) : buyers?.length ? (
                  buyers.map((buyer) => (
                    <div
                      key={buyer._id}
                      className="group flex h-28 items-center justify-center bg-white px-4"
                    >
                      {buyer.logo?.url ? (
                        <img
                          src={buyer.logo.url}
                          alt={`${buyer.brandName} logo`}
                          className="max-h-12 max-w-[120px] object-contain opacity-50 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-300 transition-colors group-hover:text-neutral-700">
                          {buyer.brandName}
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex h-32 items-center justify-center bg-white">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-300">
                      Client portfolio
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-neutral-100 px-6 py-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                  Representative Client Portfolio
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          SUSTAINABILITY
      ===================================================== */}

      <section className="px-6 py-24 md:px-16 md:py-32 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <SectionHeader
            eyebrow="Responsible Manufacturing"
            title="Made Responsibly."
            highlight="Built To Last."
            description="Sustainability is approached as an operational responsibility rather than a marketing campaign."
            align="center"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SUSTAINABILITY.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  margin: "-60px",
                }}
                transition={{
                  delay: (index % 3) * 0.1,
                  duration: 0.6,
                  ease,
                }}
                whileHover={{
                  y: -5,
                }}
                className="group border border-neutral-200 bg-white p-8 transition-all duration-500 hover:border-black hover:shadow-xl"
              >
                <item.icon
                  size={23}
                  strokeWidth={1.4}
                  className="text-neutral-400 transition-colors group-hover:text-black"
                />

                <h3 className="mt-8 text-base font-semibold uppercase tracking-[-0.01em]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-[1.75] text-neutral-500">
                  {item.description}
                </p>

                <div className="mt-8 h-px w-0 bg-black transition-all duration-500 group-hover:w-10" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          LEADERSHIP
      ===================================================== */}
{/* =====================================================
    LEADERSHIP
===================================================== */}

<section className="bg-[#111] px-6 py-24 text-white md:px-16 md:py-32 lg:px-20">
  <div className="mx-auto max-w-screen-xl">
    <div className="max-w-4xl">
      
      <Reveal>
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-white/30" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
            Leadership
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="text-4xl font-light uppercase leading-[0.94] tracking-[-0.055em] md:text-5xl lg:text-6xl">
          Guided By
          <br />
          <span className="font-semibold">Experience.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-2xl text-sm leading-[1.85] text-white/45 md:text-[15px]">
          Under the leadership of our Managing Director, Manami Fashions
          continues to develop its manufacturing capabilities with a focus
          on people, precision, operational discipline and long-term
          customer relationships.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          "People first — investing in the strength of our workforce.",
          "Precision matters — maintaining disciplined quality standards.",
          "Long-term thinking — building relationships designed to last.",
        ].map((point, index) => (
          <motion.div
            key={point}
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.15 + index * 0.1,
              duration: 0.5,
              ease,
            }}
            className="border-t border-white/10 pt-5"
          >
            <span className="mb-4 block h-px w-6 bg-white/25" />

            <p className="text-sm leading-relaxed text-white/45">
              {point}
            </p>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xl font-semibold tracking-[-0.02em] text-white">
            Mohsin Faisal
          </p>

          <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/30">
            Managing Director
          </p>
        </div>
      </Reveal>

    </div>
  </div>
</section>

      {/* =====================================================
          WHY MANAMI
      ===================================================== */}

      <section className="px-6 py-24 md:px-16 md:py-32 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <SectionHeader
            eyebrow="Why Manami"
            title="Built To Make"
            highlight="Business Easier."
            description="A manufacturing partner focused on reliability, communication, quality and operational consistency."
          />

          <div className="grid border border-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_MANAMI.map((item, index) => (
              <motion.div
                key={item}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-50px",
                }}
                transition={{
                  delay: (index % 4) * 0.07,
                  duration: 0.5,
                  ease,
                }}
                className="group border-b border-r border-neutral-200 p-7 transition-all duration-500 hover:bg-black hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-semibold tracking-[0.2em] text-neutral-300 group-hover:text-white/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="h-px w-5 bg-neutral-200 transition-all group-hover:w-8 group-hover:bg-white/50" />
                </div>

                <h3 className="mt-7 text-sm font-semibold uppercase tracking-[-0.01em]">
                  {item}
                </h3>

                <ChevronRight
                  size={15}
                  strokeWidth={1.4}
                  className="mt-8 text-neutral-300 transition-all group-hover:translate-x-1 group-hover:text-white"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TIMELINE
      ===================================================== */}

      <section className="bg-neutral-50 px-6 py-24 md:px-16 md:py-32 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <SectionHeader
            eyebrow="Our Journey"
            title="Growth Through"
            highlight="Every Chapter."
            align="center"
          />

          <div className="relative mx-auto max-w-5xl">
            <div className="absolute bottom-0 left-[9px] top-0 w-px bg-neutral-200 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-14 md:space-y-20">
              {MILESTONES.map((milestone, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={milestone.year}
                    className="relative md:grid md:grid-cols-2"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.15,
                      }}
                      className="absolute left-[4px] top-2 z-10 h-3 w-3 rounded-full bg-black ring-8 ring-neutral-50 md:left-1/2 md:-translate-x-1/2"
                    />

                    <motion.div
                      initial={{
                        opacity: 0,
                        x: isLeft ? -35 : 35,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                        margin: "-60px",
                      }}
                      transition={{
                        duration: 0.7,
                        ease,
                      }}
                      className={`
                        ml-10
                        md:ml-0
                        ${
                          isLeft
                            ? "md:pr-16 md:text-right"
                            : "md:col-start-2 md:pl-16"
                        }
                      `}
                    >
                      <span className="text-4xl font-light tracking-[-0.055em] md:text-5xl">
                        {milestone.year}
                      </span>

                      <div
                        className={`mt-3 h-px w-8 bg-black ${
                          isLeft ? "md:ml-auto" : ""
                        }`}
                      />

                      <h3 className="mt-5 text-sm font-semibold uppercase tracking-[-0.01em]">
                        {milestone.title}
                      </h3>

                      <p className="mt-2 max-w-md text-sm leading-[1.75] text-neutral-500 md:inline-block">
                        {milestone.description}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-black px-6 py-32 text-white md:px-16 md:py-40 lg:px-20">
        <motion.div
          aria-hidden
          className="absolute -left-48 -top-48 h-[500px] w-[500px] rounded-full bg-white/[0.04] blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          aria-hidden
          className="absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full bg-white/[0.04] blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
              Start a Conversation
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-7 text-4xl font-light uppercase leading-[0.94] tracking-[-0.055em] md:text-6xl lg:text-7xl">
              Build The Next
              <br />
              <span className="font-semibold">
                Collection Together.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-8 max-w-xl text-sm leading-[1.8] text-white/40 md:text-[15px]">
              From product development and sampling to production and
              final shipment, our team is ready to support your next
              collection.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 bg-white px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-neutral-200"
              >
                Explore Products

                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-white hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          FOOTER TRUST STRIP
      ===================================================== */}

     
    </main>
  );
};

export default AboutUs;

