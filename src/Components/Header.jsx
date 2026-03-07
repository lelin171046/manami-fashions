import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
   <header className="p-4 fixed top-0 left-0 w-full bg-white shadow-md z-50 dark:bg-gray-100 dark:text-gray-800">
	<div className="container flex justify-between h-16 mx-auto">
		<NavLink to="/" aria-label="Back to homepage" className="flex w-20 items-center p-2">
			<img src="https://res.cloudinary.com/dcdmktxtz/image/upload/v1772729679/Manami_wjbweo.png" alt="" />
		</NavLink>
		<ul className="items-stretch hidden space-x-3 lg:flex">
			<NavLink to="/" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-gray-900">Home</NavLink>
			<NavLink to="/products" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-gray-900">Products</NavLink>
			<NavLink to="/operations" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-gray-900">Operations</NavLink>
			<NavLink to="/certifications" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-gray-900">Certifications</NavLink>
			<NavLink to="/gallery" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-gray-900">Gallery</NavLink>
			<NavLink to="/buyers" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-gray-900">Buyers</NavLink>
			<NavLink to="/contact" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-gray-900">Contact</NavLink>	
		</ul>
		<div className="flex items-center md:space-x-4">
			
			<button type="button" className="hidden px-6 py-2 font-semibold rounded lg:block dark:bg-violet-600 dark:text-gray-50">Contact</button>
		</div>
		<button title="Open menu" type="button" className="p-4 lg:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-800">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		</button>
	</div>

</header>
    );
};

export default Header;