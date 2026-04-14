import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container flex justify-between items-center h-16 mx-auto px-4">

        {/* LOGO */}
        <NavLink to="/" className="flex w-20  items-center">
          <img
            src="https://res.cloudinary.com/dcdmktxtz/image/upload/v1772729679/Manami_wjbweo.png"
            alt="Manami Logo"
			className="h-8 sm:h-10 md:h-12 w-auto object-contain"
          />
        </NavLink>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex items-center space-x-4">
          <NavLink to="/" className="px-3 py-2 hover:text-gray-600">Home</NavLink>
          <NavLink to="/products" className="px-3 py-2 hover:text-gray-600">Products</NavLink>
          <NavLink to="/operations" className="px-3 py-2 hover:text-gray-600">Operations</NavLink>
          <NavLink to="/certifications" className="px-3 py-2 hover:text-gray-600">Certifications</NavLink>
          <NavLink to="/gallery" className="px-3 py-2 hover:text-gray-600">Gallery</NavLink>
          <NavLink to="/buyers" className="px-3 py-2 hover:text-gray-600">Buyers</NavLink>
          <NavLink to="/contact" className="px-3 py-2 hover:text-gray-600">Contact</NavLink>
        </ul>

        {/* DESKTOP BUTTON */}
        <div className="hidden lg:block">
          <NavLink
            to="/contact"
            className="px-6 py-2 bg-black text-white text-sm rounded hover:bg-gray-800"
          >
            Contact
          </NavLink>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2"
        >
          {menuOpen ? (
            // CLOSE ICON
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // HAMBURGER ICON
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden bg-white w-full h-auto border-t shadow-md">
          <ul className="flex flex-col px-1 py-2 space-y-1">
            <NavLink onClick={() => setMenuOpen(false)} to="/" className="py-1">Home</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/products" className="py-1">Products</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/operations" className="py-1">Operations</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/certifications" className="py-1">Certifications</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/gallery" className="py-1">Gallery</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/buyers" className="py-1">Buyers</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/contact" className="py-1">Contact</NavLink>

            {/* Mobile Button */}
            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/contact"
              className="mt-3 text-center bg-black text-white py-2 rounded"
            >
              Contact
            </NavLink>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;