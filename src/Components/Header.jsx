import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Logo.png"; // Adjust the path as necessary
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/operations", label: "Operations" },
  { to: "/certifications", label: "Certifications" },
  { to: "/gallery", label: "Highlights" },
  { to: "/buyers", label: "Buyers" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-sm border border-white/10 bg-blend-saturation backdrop-blur-2xl text-black shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between h-20 lg:h-24 px-4 lg:px-6">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1, rotate: -2 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="h-16 w-16 lg:h-20 lg:w-20 rounded-sm bg-white p-1 shadow-xl ring-1 ring-white/20"
              >
                {/* Replace with your actual logo */}
                <img
                  src={logo}
                  alt="Manami Fashions Ltd."
                  className="h-full w-full object-contain rounded-sm"
                />
              </motion.div>

              <div className="hidden md:block">
              
                
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === "/"} className="relative px-4 py-2 text-xl font-medium tracking-wide text-black/80 hover:text-green-500 transition-colors duration-300">
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute left-4 right-4 -bottom-1 h-[2px] rounded-full bg-lime-400"
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:block">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <NavLink
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#0F4C81] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all duration-300 hover:bg-[#15619E]"
                >
                  Let's Talk
                </NavLink>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/15"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden lg:hidden border-t border-white/10 bg-[#041B2D]/90 backdrop-blur-2xl rounded-b-[28px]"
              >
                <div className="px-4 py-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.to}
                      initial={{ x: -12, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <NavLink
                        to={link.to}
                        end={link.to === "/"}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="pt-4"
                  >
                    <NavLink
                      to="/contact"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-full bg-[#0F4C81] py-3 text-center text-sm font-semibold text-white hover:bg-[#15619E] transition"
                    >
                      Let's Talk
                    </NavLink>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;