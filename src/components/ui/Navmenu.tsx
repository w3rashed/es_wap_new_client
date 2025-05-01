"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navmenu = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Phones', path: '/phones' },
        { name: 'Tablets', path: '/tablets' },
        { name: 'Phone Accessories', path: '/phoneAccessories' },
        { name: 'Mac', path: '/mac' },
        { name: 'Watches', path: '/Watches' },
        { name: 'Headphones & Speakes', path: '/headphonesAndSpeakers' },
        { name: 'Pc Accessories', path: '/pcAccessories' },
        { name: 'Camera', path: '/camera' },
        { name: 'Gadget', path: '/gadget' },
        { name: 'Networking', path: '/networking' },
        { name: 'Gaming', path: '/gaming' },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1.5"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <FaTimes className="h-6 w-6" />
                            ) : (
                                <FaBars className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex justify-center flex-1">
                        <ul className="flex flex-wrap gap-1 items-center">
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${
                                            pathname === item.path
                                                ? 'bg-blue-500 text-white shadow-sm'
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Empty div for flex spacing */}
                    <div className="md:hidden w-6"></div>
                </div>

                {/* Mobile menu */}
                <div 
                    className={`md:hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen 
                            ? 'max-h-[500px] opacity-100' 
                            : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                >
                    <ul className="py-2 space-y-1">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                                        pathname === item.path
                                            ? 'bg-blue-500 text-white shadow-sm'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navmenu;