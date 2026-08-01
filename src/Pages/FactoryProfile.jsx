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
  { label: "Year of Establishment", value: "2010", icon: Calendar },
  { label: "Certificate of Incorporation", value: "C-41931(1290)/2000", icon: FileBadge },
  {
    label: "Tax Identifications",
    value: (
      <div className="flex flex-wrap gap-4">
        <span><span className="opacity-50 mr-2">BIN</span>001404019-0403</span>
        <span><span className="opacity-50 mr-2">TIN</span>443760895954</span>
      </div>
    ),
    icon: Hash,
  },
  { label: "BGMEA Registration", value: "4713", icon: BadgeCheck },
  {
    label: "Executive Leadership",
    value: (
      <div>
        <p className="font-semibold text-black">Mohsin Faisal</p>
        <p className="text-sm opacity-70">faisal@manamibd.com &bull; +880 1711 556121</p>
      </div>
    ),
    icon: UserSquare2,
  },
  { label: "Operational Base", value: "Kabirpur, Ashulia, Savar, Dhaka-1349, Bangladesh", icon: MapPin },
  { label: "Corporate Headquarters", value: "House 7/7A, Floor E-9, Sector-17, BGMEA Complex, Uttara, Dhaka", icon: Building },
  { label: "Banking Partner", value: "Eastern Bank PLC — S.W.I.F.T: EBLDBDDH", icon: Landmark },
  { label: "Annual Turnover", value: "USD $25 Million", icon: DollarSign },
  { label: "Human Capital", value: "1,600+ Employees", icon: Users },
  { label: "Production Scale", value: "35,000 pcs / day — 25 Specialized Sewing Lines", icon: Factory },
  { label: "Facility Footprint", value: "110,000 sq. ft.", icon: Ruler },
];

const FactoryProfile = () => {
  return (
    <section className="bg-white text-black py-24 px-6 md:px-16 lg:px-24 antialiased">
      <div className="max-w-screen-xl mx-auto">
        <header className="mb-20">
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-4">
            Corporate Identification / 2026
          </p>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-none italic">
            Factory <span className="font-black not-italic">Profile.</span>
          </h1>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden"
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
            <p className="text-xl md:text-2xl font-light leading-relaxed tracking-tight">
              Manami Fashions Ltd. operates as a vertically integrated apparel manufacturer,
              combining industrial-scale production with precision craftsmanship. Our facility
              is engineered to meet international compliance standards while maintaining
              efficiency across high-volume output.
            </p>
            <p className="mt-6 text-base text-gray-500 leading-relaxed max-w-lg">
              With advanced machinery, structured workflows, and a skilled workforce,
              the company ensures consistent quality, timely delivery, and operational transparency
              across global supply chains.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
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
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gray-50 group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <Icon size={16} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-black transition-colors">
                    {row.label}
                  </span>
                </div>
                <div className="text-lg md:text-xl font-light tracking-tight leading-snug pl-11">
                  {row.value}
                </div>
              </motion.div>
            );
          })}
        </div>

        <footer className="mt-32 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap gap-6">
            {["100% Export", "BSCI Grade A", "BGMEA"].map((tag) => (
              <span key={tag} className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-[10px] font-mono opacity-30">CONFIDENTIAL // MFL-ST-026</div>
        </footer>
      </div>
    </section>
  );
};

export default FactoryProfile;
