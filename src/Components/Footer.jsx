import { NavLink } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111] text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <NavLink to="/" className="flex items-center gap-3 mb-6">
              <img
                src="https://res.cloudinary.com/dcdmktxtz/image/upload/v1772729679/Manami_wjbweo.png"
                alt="Manami Fashions Ltd logo"
                className="h-8 w-auto object-contain brightness-0 invert"
                loading="lazy"
              />
              <span className="text-lg font-bold tracking-tight">MANAMI FASHIONS LTD</span>
            </NavLink>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              A 100% export oriented garment manufacturer delivering precision-engineered apparel for global brands since 2010.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100063746221165"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-700 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Visit our Facebook page"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-700 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Visit our Twitter page"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-700 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Visit our Instagram page"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-white">Products</h3>
            <ul className="space-y-3">
              <li><NavLink to="/products/men" className="text-sm text-gray-400 hover:text-white transition-colors">Menswear</NavLink></li>
              <li><NavLink to="/products/women" className="text-sm text-gray-400 hover:text-white transition-colors">Womenswear</NavLink></li>
              <li><NavLink to="/products/kids" className="text-sm text-gray-400 hover:text-white transition-colors">Kids Wear</NavLink></li>
              <li><NavLink to="/products/active-innerwear" className="text-sm text-gray-400 hover:text-white transition-colors">Active & Innerwear</NavLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              <li><NavLink to="/profile" className="text-sm text-gray-400 hover:text-white transition-colors">Factory Profile</NavLink></li>
              <li><NavLink to="/operations" className="text-sm text-gray-400 hover:text-white transition-colors">Operations</NavLink></li>
              <li><NavLink to="/certifications" className="text-sm text-gray-400 hover:text-white transition-colors">Certifications</NavLink></li>
              <li><NavLink to="/buyers" className="text-sm text-gray-400 hover:text-white transition-colors">Our Buyers</NavLink></li>
              <li><NavLink to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</NavLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-white">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-gray-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400"> info@manamibd.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-gray-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">+8801738001243</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gray-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">Factory: Kabirpur, Ashulia, Savar, Dhaka-1349, Bangladesh</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gray-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">Head Office: House 7/7A, Floor E-9, Sector-17, Block H-1, BGMEA Complex, Uttara, Dhaka-1230, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Manami Fashions Ltd. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">
            Develop by <a href="https://zaman.gt.tc/?i=1#about" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Lelin</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
