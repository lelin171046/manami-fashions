import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
   <header className="p-4 fixed top-0 left-0 w-full bg-white shadow-md z-50 dark:bg-gray-100 dark:text-gray-800">
	<div className="container flex justify-between h-16 mx-auto md:justify-center md:space-x-8">
		<ul className="items-stretch  hidden space-x-3 md:flex">
			<li className="flex">
				<NavLink to="/products" className="flex items-center front-bold dark:border-">Products</NavLink>
			</li>
			<li className="flex">
				<NavLink to="/operations" className="flex items-center px-4 dark:border-">Operations</NavLink>
			</li>
			<li className="flex">
				<NavLink to="/certifications" className="flex items-center dark:border- dark:text-violet-600 dark:border-violet-600">Certifications</NavLink>
			</li>
		</ul>
		<NavLink to="/" aria-label="Back to homepage" className="flex w-20 items-center p-2">
			<img src="https://res.cloudinary.com/dcdmktxtz/image/upload/v1772729679/Manami_wjbweo.png" alt="" />
		</NavLink>
		<ul className="items-stretch hidden space-x-3 md:flex">
			<li className="flex">
				<NavLink to="/gallery" className="flex items-center dark:border-">Gallery</NavLink>
			</li>
			<li className="flex">
				<NavLink to="/buyers" className="flex items-center dark:border-">Our Buyers</NavLink>
			</li>
			<li className="flex">
				<NavLink to="/contact" className="flex items-center dark:border-">Contact</NavLink>
			</li>
		</ul>
		<button title="Button" type="button" className="p-4 md:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-800">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		</button>
	</div>
</header>
    );
};

export default Header;