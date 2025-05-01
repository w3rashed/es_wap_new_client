'use client'
import React, { useState, useEffect } from 'react';
import { FaHome, FaUsers, FaBox, FaShoppingCart, FaChartBar, FaCog, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/Providers/auth/AuthContext';
import UseAxiosPrivet from '@/hooks/UseAxiosPrivet';

const menuItems = [
    { name: 'Users', path: '/dashboard/users', icon: FaUsers },
    { name: 'Products', path: '/dashboard/products', icon: FaBox },
    { name: 'Orders', path: '/dashboard/orders', icon: FaShoppingCart },
    { name: 'Analytics', path: '/dashboard/analytics', icon: FaChartBar },
    { name: 'Settings', path: '/dashboard/settings', icon: FaCog },
];

const SideMenu = () => {
    const router = useRouter();
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const axiosPrivet = UseAxiosPrivet();

    useEffect(() => {
        // Redirect to orders page if we're on the dashboard root
        if (pathname === '/dashboard') {
            router.push('/dashboard/orders');
        }
    }, [pathname, router]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            logout();
            await axiosPrivet.post('/auth/logout');
            toast.success('Logged out successfully');
            router.push('/adminLogin');
        } catch (error) {
            toast.error('Failed to logout');
        }
    };

    return (
        <>
            {/* Menu Toggle Button - Always Visible */}
            <div className="fixed top-4 left-4 z-50">
                <button
                    onClick={toggleMenu}
                    className="p-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 focus:outline-none"
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Overlay - Always Visible */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleMenu}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } w-64 z-50`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo and Close Button */}
                    <div className="p-4 border-b flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-orange-500">Admin Panel</h1>
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                        >
                            <FaTimes className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 overflow-y-auto">
                        <ul className="space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.path;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.path}
                                            className={`flex items-center p-2 rounded-lg transition-colors ${
                                                isActive
                                                    ? 'bg-orange-500 text-white'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <Icon className="w-5 h-5 mr-3" />
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* User Profile and Logout */}
                    <div className="p-4 border-t">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white">
                                    <span className="text-lg font-semibold">A</span>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-700">Admin User</p>
                                    <p className="text-xs text-gray-500">admin@example.com</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none text-gray-500 hover:text-red-500 transition-colors"
                                title="Logout"
                            >
                                <FaSignOutAlt className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideMenu;