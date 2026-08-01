import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/operations", label: "Operations" },
  { to: "/certifications", label: "Certifications" },
  { to: "/gallery", label: "Highlights" },
  { to: "/buyers", label: "Buyers" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
      isActive ? "text-black font-bold" : "text-gray-500 hover:text-black"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 shrink-0" aria-label="Manami Fashions Ltd - Home">
          <img
            src="https://res.cloudinary.com/dcdmktxtz/image/upload/v1772729679/Manami_wjbweo.png"
            alt="Manami Fashions Ltd logo"
            className="h-8 sm:h-10 w-auto object-contain"
            loading="eager"
          />
        </NavLink>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <NavLink
            to="/contact"
            className="px-5 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors duration-200"
          >
            Contact
          </NavLink>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-black transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-100 shadow-lg" aria-label="Mobile navigation">
          <ul className="flex flex-col px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  onClick={() => setMenuOpen(false)}
                  to={link.to}
                  className={({ isActive }) =>
                    `block py-3 px-4 text-sm font-medium tracking-wide rounded transition-colors ${
                      isActive ? "bg-gray-50 text-black font-bold" : "text-gray-500 hover:bg-gray-50 hover:text-black"
                    }`
                  }
                  end={link.to === "/"}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <NavLink
                onClick={() => setMenuOpen(false)}
                to="/contact"
                className="block text-center bg-black text-white py-3 px-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
