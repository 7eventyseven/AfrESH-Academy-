'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User } from 'lucide-react';

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch {
            // Ignore logout errors
        }
        window.location.href = '/';
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Courses', href: '/courses' },
        { name: 'Portfolio', href: '/#portfolio' },
        { name: 'Testimonials', href: '/#testimonials' },
    ];

    const isTransparent = pathname === '/' && !scrolled;

    return (
        <nav className={`fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-1rem)] sm:w-[95%] max-w-7xl z-50 transition-all duration-300 ${isTransparent ? 'bg-white/20' : 'bg-white/80'} backdrop-blur-xl rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-white/30 shadow-xl`}>
            <div className="flex items-center justify-between relative">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="bg-orange-500 p-1.5 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-white text-xs font-black tracking-tighter">afr</span>
                    </div>
                    <Link
                        href="/"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="cursor-pointer shrink-0"
                    >
                        <span className={`text-xl sm:text-2xl font-bold transition-colors truncate ${!isTransparent ? 'text-orange-500' : 'text-white'}`}>AfRESH</span>
                    </Link>
                </div>

                {/* Desktop Nav - only on large screens so iPad gets hamburger menu */}
                <div className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 transform -translate-x-1/2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => {
                                if (link.href.startsWith('/#')) {
                                    // Handle anchor links if needed, or let default behavior work but careful with smooth scroll
                                    // For now, let's keep it simple or implement scroll logic if strictly needed
                                    // Original logic:
                                    /*
                                    const id = link.to.substring(2);
                                    const el = document.getElementById(id);
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                    */
                                    // In Next.js, hash links usually work.
                                } else if (link.href === '/' && pathname === '/') {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                            className={`font-medium transition-colors ${!isTransparent ? 'text-orange-500 hover:text-orange-600' : 'text-white hover:text-gray-200'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right side - Auth & Contact */}
                <div className="hidden lg:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-2 group">
                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110">
                                    <User className="w-4 h-4" />
                                </div>
                                <span className={`text-sm font-medium ${!isTransparent ? 'text-gray-900' : 'text-white'}`}>
                                    {user.name}
                                </span>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className={`text-sm transition-colors ${!isTransparent ? 'text-gray-600 hover:text-red-500' : 'text-white/80 hover:text-red-400'}`}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className={`transition-colors ${!isTransparent ? 'text-orange-500 hover:text-orange-600' : 'text-white hover:text-gray-200'}`}>
                                <User className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/contact"
                                className="bg-[#483C5C] text-white px-5 xl:px-8 py-2.5 rounded-lg font-bold text-sm xl:text-base hover:bg-[#3D2F4A] transition-all whitespace-nowrap"
                            >
                                Contact Us
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile/Tablet Menu Button - show on iPad and below (lg) */}
                <button
                    type="button"
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    className={`lg:hidden p-2.5 -m-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors ${!isTransparent ? 'text-orange-500 hover:bg-orange-500/10' : 'text-white hover:bg-white/10'}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav Menu - solid bg on small screens for readability */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-xl py-4 flex flex-col lg:hidden animate-fade-in-down border border-white/20 bg-[#483C5C] sm:bg-[#483C5C]/95 backdrop-blur-xl">
                    <div className="px-4 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block font-medium py-3.5 px-4 rounded-xl text-white hover:bg-white/10 transition-colors min-h-[44px] flex items-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="border-t border-white/20 mt-2 pt-4 px-4 space-y-2">
                        {user ? (
                            <>
                                <Link
                                    href={user.role === 'admin' ? '/admin' : '/dashboard'}
                                    className="flex items-center gap-3 py-3.5 px-4 rounded-xl min-h-[44px] text-white hover:bg-white/10"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white shrink-0">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium">{user.name}</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full bg-red-500/20 text-red-300 py-3.5 rounded-xl font-bold border border-red-500/30 min-h-[44px]"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="flex items-center gap-3 py-3.5 px-4 rounded-xl min-h-[44px] text-white hover:bg-white/10"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <User className="w-5 h-5" /> Login
                                </Link>
                                <Link
                                    href="/contact"
                                    className="block bg-orange-500 text-white w-full py-3.5 rounded-xl font-bold text-center min-h-[44px] flex items-center justify-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Contact Us
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
