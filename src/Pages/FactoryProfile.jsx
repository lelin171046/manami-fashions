import { motion } from "framer-motion";
import {
  Building2,
  Briefcase,
  ScrollText,
  Calendar,
  FileBadge,
  Hash,
  BadgeCheck,
  UserSquare2,
  MapPin,
  Building,
  Landmark,
  DollarSign,
  Users,
  Factory,
  Ruler,
} from "lucide-react";

const rows = [
  { label: "Name of the Company", value: "Manami Fashions Ltd.", icon: Building2 },
  { label: "Type of Business", value: "Garments Manufacturer & Exporter", icon: Briefcase },
  { label: "Legal Status", value: "Private Limited Company", icon: ScrollText },
  { label: "Year of Establishment", value: "2010", icon: Calendar, isMono: true },
  { label: "Certificate of Incorporation", value: "C-41931(1290)/2000", icon: FileBadge, isMono: true },
  {
    label: "Tax Identifications",
    value: (
      <div className="flex flex-wrap gap-4 font-mono text-sm tracking-tight text-neutral-800">
        <span><span className="font-sans text-[11px] font-semibold text-neutral-400 mr-2 tracking-widest uppercase">BIN</span>17141010178</span>
      </div>
    ),
    icon: Hash,
  },
  { label: "BGMEA Registration", value: "4713", icon: BadgeCheck, isMono: true },
  {
    label: "Executive Leadership",
    value: (
      <div>
        <p className="font-medium text-neutral-900 tracking-tight">Mohsin Faisal <span className="text-xs text-neutral-400 font-normal font-mono ml-1.5">(Managing Director)</span></p>
        <p className="text-xs text-neutral-500 font-mono mt-1 tracking-tight">faisal@manamibd.com &bull;</p>
      </div>
    ),
    icon: UserSquare2,
  },
  {
    label: "Operational Base",
    value: (
      <div>
        <p className="text-neutral-800 font-normal">Kabirpur, Ashulia, Savar, Dhaka-1349, Bangladesh</p>
        <p className="text-xs text-neutral-500 font-mono mt-1 tracking-tight">Phone: +880 1991 390121</p>
      </div>
    ),
    icon: MapPin,
  },
  { label: "Corporate Headquarters", value: "House 7/7A, Floor E-9, Sector-17, Block H-1, BGMEA Complex, Uttara, Dhaka-1230", icon: Building },
  {
    label: "Banking Partner",
    value: (
      <div className="space-y-2 text-sm md:text-base">
        <p className="text-neutral-800">Eastern Bank PLC — <span className="text-xs text-neutral-500 font-light">100 Gulshan Avenue, Dhaka-1212</span> <span className="font-mono text-xs text-neutral-600 block sm:inline sm:ml-2 font-medium">(SWIFT: EBLDBDDH)</span></p>
        <p className="text-neutral-800">EXIM Bank Bangladesh — <span className="text-xs text-neutral-500 font-light">House-61/A, Rd-07, Sector-04, Uttara</span> <span className="font-mono text-xs text-neutral-600 block sm:inline sm:ml-2 font-medium">(SWIFT: EXBKBDDH015)</span></p>
      </div>
    ),
    icon: Landmark,
  },
  { label: "Annual Turnover", value: "USD $25 Million", icon: DollarSign },
  { label: "Human Capital", value: "1,600+ Full-time Employees", icon: Users },
  { label:
    
    "Production Scale", value: (
      <div className="space-y-2 text-sm md:text-base">
        <p className="text-neutral-800">40,000 pcs / day | 7050 sewing hrs/day </p>
        <p className="text-neutral-800">700 machine Capacity | 20 Sewing Lines </p>
      </div>
    ), icon: Factory },
  { label: "Facility Footprint", value: "110,000 sq. ft.", icon: Ruler },

  { label: "Sewing Efficiency", value: (
    <div className="space-y-2 text-sm md:text-base">
      <p className="text-neutral-800">65%</p>
     
    </div>
  ), icon: BadgeCheck },    
];

const FactoryProfile = () => {
  return (
    <section className="bg-white text-neutral-900 py-24 px-6 md:px-16 lg:px-24 antialiased font-sans">
      <div className="max-w-screen-xl mx-auto">
        <header className="mb-20">
          <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-neutral-400 mb-3 font-mono">
            Corporate Identification // 2026
          </p>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight leading-none text-neutral-900">
            Factory <span className="font-semibold text-black tracking-tighter">Profile.</span>
          </h1>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-sm"
          >
            <img
              src="https://res.cloudinary.com/dcdmktxtz/image/upload/v1772875746/WhatsApp_Image_2026-03-07_at_3.27.11_PM_jsogyo.jpg?q=80&w=1000&auto=format&fit=crop"
              alt="Manami Fashions factory floor"
              className="w-full h-[420px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl md:text-2xl font-light leading-relaxed tracking-tight text-neutral-800">
              Manami Fashions Ltd. operates as a vertically integrated apparel manufacturer,
              combining industrial-scale production with precision craftsmanship. Our facility
              is engineered to meet international compliance standards while maintaining
              efficiency across high-volume output.
            </p>
            <p className="mt-6 text-sm md:text-base text-neutral-500 leading-relaxed max-w-lg font-normal">
              With advanced machinery, structured workflows, and a skilled workforce,
              the company ensures consistent quality, timely delivery, and operational transparency
              across global supply chains.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
          {rows.map((row, i) => {
            const Icon = row.icon;
            return (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex flex-col"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="p-2 bg-neutral-50 group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300 rounded-sm text-neutral-700">
                    <Icon size={15} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400 group-hover:text-neutral-900 transition-colors font-mono">
                    {row.label}
                  </span>
                </div>
                <div className={`text-base md:text-lg text-neutral-800 tracking-tight leading-relaxed pl-10 ${row.isMono ? 'font-mono text-sm tracking-normal' : 'font-light'}`}>
                  {row.value}
                </div>
              </motion.div>
            );
          })}
        </div>

   
      </div>
    </section>
  );
};

export default FactoryProfile;