import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import logo from '../../assets/images/logo-primary.png'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeMenu);
        return () => {
            document.removeEventListener("mousedown", closeMenu);
        };
    }, []);

    return (
        <div>
            <nav className="bg-blue-800">
                <div className="mx-auto max-w-full w-[1156px]">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div>
                                <img
                                    className=""
                                    src={logo}
                                    alt="Your Company"
                                />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <NavLink to="/admin/dashboard" className={({ isActive }) =>
                                        isActive
                                            ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                            : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }>
                                        Dashboard
                                    </NavLink>
                                    <NavLink to="/admin/bookings" className={({ isActive }) =>
                                        isActive
                                            ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                            : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }>
                                        Booking
                                    </NavLink>
                                    <NavLink to="/admin/accounts" className={({ isActive }) =>
                                        isActive
                                            ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                            : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }>
                                        Accounts
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">View notifications</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                    </svg>
                                </button>
                                <div className="relative ml-3">
                                    <button type="button" className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" onClick={toggleMenu}>
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                    </button>
                                    {isMenuOpen && (
    <div ref={menuRef} className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem" tabIndex="-1">Your Profile</a>
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem" tabIndex="-1">Settings</a>
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem" tabIndex="-1">Sign out</a>
    </div>
)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mobile menu */}
                <div className="-mr-2 flex md:hidden">
                    {/* Mobile button code here */}
                </div>
            </nav>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-full w-[1156px] py-6">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Xin chào Admin!</h1>
                </div>
            </header>
        </div>
    );
};

export default Header;