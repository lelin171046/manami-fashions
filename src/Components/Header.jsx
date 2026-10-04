import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/buyers", label: "Buyers" },
  { to: "/operations", label: "Operations" },
  { to: "/certifications", label: "Certifications" },
  { to: "/gallery", label: "CSR" },
  { to: "/about", label: "About Us" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        bg-white
        border-t
        border-black/20
        border-b
        border-black/5
        font-['Josefin_Sans',sans-serif]
      "
    >
      <div className="mx-auto max-w-[1240px] px-5 lg:px-0">

        <div className="h-[66px] flex items-center justify-between">

          {/* ================= LOGO ================= */}
          <NavLink
            to="/"
            className="flex items-center shrink-0"
          >
            <motion.img
              src="https://res.cloudinary.com/dg04kyz8n/image/upload/v1789150151/MFl_Logo_xm63xv.png"
              alt="Manami Fashions Ltd."
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="w-[48px] h-[48px] object-contain"
            />
          </NavLink>


          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden lg:flex items-center gap-[2px]">

            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `
                  relative
                  px-[16px]
                  py-2
                  text-[12px]
                  font-light
                  uppercase
                  tracking-[0.13em]
                  leading-none
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "text-black"
                      : "text-[#737983] hover:text-black"
                  }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}

                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="
                          absolute
                          left-[16px]
                          right-[16px]
                          -bottom-[4px]
                          h-[1px]
                          bg-black
                        "
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

          </nav>


          {/* ================= CONTACT ================= */}
          <div className="hidden lg:block">

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <NavLink
                to="/contact"
                className="
                  inline-flex
                  items-center
                  justify-center
                  h-[33px]
                  min-w-[104px]
                  px-5
                  bg-black
                  text-white
                  text-[11px]
                  font-light
                  uppercase
                  tracking-[0.18em]
                  leading-none
                  transition-all
                  duration-300
                  hover:bg-[#222]
                "
              >
                Contact
              </NavLink>
            </motion.div>

          </div>


          {/* ================= MOBILE BUTTON ================= */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              lg:hidden
              flex
              items-center
              justify-center
              w-10
              h-10
              text-black
              border
              border-black/10
              hover:bg-gray-50
              transition-colors
            "
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={21} strokeWidth={1.5} />
            ) : (
              <Menu size={21} strokeWidth={1.5} />
            )}
          </button>

        </div>


        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="
                lg:hidden
                overflow-hidden
                border-t
                border-black/10
                bg-white
              "
            >

              <div className="py-3">

                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `
                      block
                      px-5
                      py-4
                      text-[12px]
                      font-light
                      uppercase
                      tracking-[0.14em]
                      transition-colors
                      ${
                        isActive
                          ? "text-black bg-gray-50"
                          : "text-[#737983] hover:text-black hover:bg-gray-50"
                      }
                      `
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}


                <NavLink
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="
                    block
                    mx-4
                    mt-3
                    py-3
                    text-center
                    bg-black
                    text-white
                    text-[11px]
                    font-light
                    uppercase
                    tracking-[0.18em]
                    hover:bg-[#222]
                    transition-colors
                  "
                >
                  Contact
                </NavLink>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.header>
  );
};

export default Header;