import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Factory,
  Layers,
  Scissors,
  Shirt,
  Truck,
  Wrench,
} from "lucide-react";

const HARDCODED_SECTIONS = [
  {
    title: "Sample Development",
    image: "https://thygesenapparel.com/wp-content/uploads/2025/05/sample-development.jpg",
    imageAlt: "Garment sample development and sewing production workspace",
    stats: [
      {
        label: "Number of Sewing Lines",
        value: "5",
      },
      {
        label: "Sewing Machines Capacity",
        value: "70",
      },
      {
        label: "Sewing Capacity/Day",
        value: "200/Shift",
      },
      {
        label: "Sewing Efficiency",
        value: "65%",
      },
      {
        label: "Special Machines — Bartack, Buttonhole, etc.",
        value: "120",
      },
    ],
    captions: [
      "Sewing Floor 1",
      "Sewing Floor 2",
      "Special Machines",
      "Quality Check Points",
    ],
    icon: Shirt,
  },
  {
    title: "CAD & Pattern Making",
    image: "https://i.pinimg.com/736x/7f/98/01/7f9801dbaaa2892ca87f0f0cb1f966cb.jpg",
    imageAlt: "CAD workstation and pattern-making table for garment production",
    stats: [
      {
        label: "CAD Workstations",
        value: "04",
      },
      {
        label: "Pattern Making Tables",
        value: "06",
      },
      {
        label: "Auto Pattern Making Machines",
        value: "02",
      },
      {
        label: "Plotter Machines",
        value: "02",
      },
      {
        label: "Fabric Relaxation Area",
        value: "10 tons",
      },
    ],
    captions: [
      "CAD Workstations",
      "Pattern Making Tables",
      "Auto Pattern Making Machines",
      "Plotter Machines",
    ],
    icon: Wrench,
  },
  {
    title: "Cutting",
    image: "https://t4.ftcdn.net/jpg/02/35/49/43/360_F_235494394_H4rDjsm9mLFmKWQDMTuZ7QnSZQOVaE1i.jpg",
    imageAlt: "Garment cutting room with fabric cutting tables",
    stats: [
      {
        label: "Number of Cutting Tables",
        value: "05",
      },
      {
        label: "Capacity/Day — Knit + Woven",
        value: "45,000 pcs",
      },
      {
        label: "CAD Marker Efficiency",
        value: "85%",
      },
      {
        label: "Fabric Relaxation Capacity",
        value: "10 tons",
      },
      {
        label: "Cut Panels Check",
        value: "100%",
      },
      {
        label: "Printed/Embroidery Panel Check",
        value: "100%",
      },
      {
        label: "Replace Cut Point",
        value: "5",
      },
    ],
    captions: [
      "Cutting Room Floor",
      "CAD Marker Planning",
      "Auto Plotter",
      "Panel Verification",
    ],
    icon: Scissors,
  },
  {
    title: "Sewing & Assembly",
    image: "https://thumbs.dreamstime.com/b/textile-workers-sewing-garments-production-line-operating-industrial-machines-manufacturing-clothing-busy-garment-factory-430137317.jpg",
    imageAlt: "Garment sewing and assembly production line",
    stats: [
      {
        label: "Number of Sewing Lines",
        value: "5",
      },
      {
        label: "Sewing Machines Capacity",
        value: "70",
      },
      {
        label: "Sewing Capacity/Day",
        value: "200/Shift",
      },
      {
        label: "Sewing Efficiency",
        value: "65%",
      },
      {
        label: "Special Machines — Bartack, Buttonhole, etc.",
        value: "120",
      },
    ],
    captions: [
      "Sewing Floor 1",
      "Sewing Floor 3",
      "Special Machines",
      "Quality Check Points",
    ],
    icon: Shirt,
  },
  {
    title: "Finishing & Packing",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJQ1DJX7oxLTLTZo5U33vlzjxxdI9OCuImw7Qe0JvFP2J5p9wJfET23mE&s=10",
    imageAlt: "Garment finishing and packing department",
    stats: [
      {
        label: "Finishing Lines",
        value: "08",
      },
      {
        label: "Daily Finishing Capacity",
        value: "35,000 pcs",
      },
      {
        label: "Needle Detection Machines",
        value: "04",
      },
      {
        label: "Auto Poly Bagging Machines",
        value: "06",
      },
      {
        label: "Carton Packing Stations",
        value: "12",
      },
      {
        label: "Final Inspection Pass Rate",
        value: "98.5%",
      },
    ],
    captions: [
      "Finishing Floor",
      "Needle Detection",
      "Auto Bagging",
      "Carton Packing",
    ],
    icon: Truck,
  },
  {
    title: "Quality Assurance",
    image: "https://i0.wp.com/textilelearner.net/wp-content/uploads/2013/05/garment-inspection-1.jpg?resize=600%2C400&ssl=1",
    imageAlt: "Garment quality inspection and assurance process",
    stats: [
      {
        label: "QC Inspectors",
        value: "45",
      },
      {
        label: "Inline Inspection Points",
        value: "12",
      },
      {
        label: "Final Audit Standard",
        value: "AQL 2.5",
      },
      {
        label: "Fabric Testing Lab",
        value: "In-house",
      },
      {
        label: "Approved 3rd Party Labs",
        value: "SGS, Intertek, Bureau Veritas",
      },
      {
        label: "Customer Complaint Rate",
        value: "< 0.5%",
      },
    ],
    captions: [
      "Fabric Inspection",
      "Inline QC",
      "Final Audit",
      "Testing Lab",
    ],
    icon: CheckCircle2,
  },
  {
    title: "Store & Logistics",
    image: "https://thygesenapparel.com/wp-content/uploads/2025/05/qp9x9v2j.png",
    imageAlt: "Garment warehouse and logistics storage area",
    stats: [
      {
        label: "Warehouse Capacity",
        value: "10,000 sq ft",
      },
      {
        label: "Inventory Management System",
        value: "ERP Integrated",
      },
      {
        label: "Daily Dispatch Capacity",
        value: "5,000 pcs",
      },
      {
        label: "Global Shipping Partners",
        value: "DHL, FedEx, UPS",
      },
      {
        label: "Order Fulfillment Accuracy",
        value: "99.8%",
      },
    ],
    captions: [
      "Warehouse Overview",
      "Inventory Management",
      "Dispatch Area",
      "Shipping Partners",
    ],
    icon: Layers,
  },
];

const LocalLineSidebar = ({
  items,
  activeIndex,
  onItemClick,
  operations,
}) => {
  return (
    <nav
      className="relative space-y-1.5 border-l border-black/15 pl-3"
      aria-label="Operations sections"
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        const operation = operations[index];
        const Icon = operation?.icon || Factory;

        return (
          <button
            key={item}
            type="button"
            onClick={() => onItemClick(index)}
            aria-current={isActive ? "page" : undefined}
            className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 ${
              isActive
                ? "bg-neutral-900 text-white shadow-sm"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
            }`}
          >
            <span
              className={`font-mono text-[11px] transition-colors ${
                isActive
                  ? "font-semibold text-neutral-300"
                  : "text-neutral-400 group-hover:text-black"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <Icon
              size={16}
              strokeWidth={1.8}
              className={`shrink-0 transition-colors ${
                isActive
                  ? "text-white"
                  : "text-neutral-400 group-hover:text-black"
              }`}
            />

            <span
              className={`text-sm tracking-wide transition-all ${
                isActive
                  ? "font-medium text-white"
                  : "text-neutral-600 group-hover:text-black"
              }`}
            >
              {item}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

const Operations = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const operations = HARDCODED_SECTIONS.map((section, index) => ({
    ...section,
    step: index + 1,
    _id: `hardcoded-${index}`,
  }));

  const activeOperation = operations[activeIndex];

  const sidebarItems = operations.map((operation) => operation.title);

  if (!activeOperation) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white font-['Manrope',sans-serif] text-black">
      {/* PAGE HEADER */}
      <section className="px-6 pt-16 pb-8 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1600px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500">
              Production Capabilities
            </p>

            <h1 className="text-4xl font-light tracking-tight text-black md:text-5xl lg:text-6xl">
              Our{" "}
              <span className="font-semibold tracking-tight">
                Operations.
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="px-6 pb-28 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-start gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          {/* SIDEBAR NAVIGATION */}
          <aside className="lg:sticky lg:top-28 z-10">
            <div className="mb-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                Sections
              </span>
            </div>

            <LocalLineSidebar
              items={sidebarItems}
              activeIndex={activeIndex}
              onItemClick={setActiveIndex}
              operations={operations}
            />
          </aside>

          {/* ACTIVE CONTENT CONTAINER */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeOperation._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {/* SECTION HEADER */}
                <div className="mb-6 border-b border-neutral-100 pb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-red-500">
                      Section{" "}
                      {String(activeOperation.step).padStart(2, "0")}
                    </span>

                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.5}
                      className="text-neutral-400"
                    />
                  </div>

                  <h2 className="text-2xl font-light tracking-tight text-black md:text-4xl">
                    {activeOperation.title}
                  </h2>
                </div>

                {/* MEDIA & METRICS GRID */}
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
                  {/* LEFT: IMAGE & CAPTION */}
                  <div className="space-y-3">
                    <div className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-black/10 bg-neutral-900 shadow-lg md:h-[420px]">
                      <AnimatePresence mode="wait">
                        {activeOperation.image ? (
                          <motion.img
                            key={activeOperation.image}
                            src={activeOperation.image}
                            alt={
                              activeOperation.imageAlt || activeOperation.title
                            }
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 h-full w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <motion.div
                            key={`fallback-${activeOperation.title}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex h-full w-full flex-col items-center justify-center bg-neutral-900 p-6 text-center"
                          >
                            <activeOperation.icon
                              size={44}
                              strokeWidth={1.2}
                              className="mb-3 text-neutral-600"
                            />
                            <p className="text-xs uppercase tracking-widest text-neutral-400">
                              {activeOperation.title} Floor Photo
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* IMAGE OVERLAY */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                      {/* IMAGE BADGE */}
                      <div className="absolute bottom-5 left-5 right-5">
                        <span className="inline-block rounded-lg border border-white/20 bg-black/60 px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-white backdrop-blur-md">
                          {activeOperation.title} Operational Unit
                        </span>
                      </div>
                    </div>

                    {/* CAPTION SUMMARY */}
                    {activeOperation.captions?.length > 0 && (
                      <p className="pl-1 font-mono text-xs text-neutral-500">
                        {activeOperation.captions.join(" — ")}
                      </p>
                    )}
                  </div>

                  {/* RIGHT: METRICS LIST */}
                  <div className="space-y-2.5">
                    <p className="mb-3 pl-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                      Key Operational Metrics
                    </p>

                    {activeOperation.stats?.map((stat, index) => (
                      <motion.div
                        key={`${stat.label}-${index}`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.04,
                          duration: 0.3,
                        }}
                        className="flex items-center justify-between gap-4 rounded-xl border border-black/10 bg-neutral-950 p-3.5 transition-colors hover:border-red-500/60"
                      >
                        <span className="text-xs font-medium text-neutral-300 md:text-sm">
                          {stat.label}
                        </span>

                        <span className="shrink-0 rounded-md border border-red-900/40 bg-red-950/30 px-2.5 py-1 font-mono text-xs font-semibold text-red-400 md:text-sm">
                          {stat.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Operations;