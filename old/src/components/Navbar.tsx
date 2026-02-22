import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

const Navbar: React.FC = () => {
    const location = useLocation();
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

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        window.location.reload();
    };

    const navLinks = [
        { name: 'Home', to: '/' },
        { name: 'About Us', to: '/about' },
        { name: 'Courses', to: '/courses' },
        { name: 'Portfolio', to: '/#portfolio' },
        { name: 'Testimonials', to: '/#testimonials' },
    ];

    const isTransparent = location.pathname === '/' && !scrolled;

    return (
        <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300 ${isTransparent ? 'bg-white/20' : 'bg-white/80'} backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/30 shadow-xl`}>
            <div className="flex items-center justify-between relative">
                <div className="flex items-center gap-2">
                    <div className="bg-orange-500 p-1.5 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-black tracking-tighter">afr</span>
                    </div>
                    <Link
                        to="/"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="cursor-pointer"
                    >
                        <span className={`text-2xl font-bold transition-colors ${!isTransparent ? 'text-orange-500' : 'text-white'}`}>AfRESH</span>
                    </Link>
                </div>

                {/* Desktop Nav - Centered */}
                <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            onClick={() => {
                                if (link.to.startsWith('/#')) {
                                    const id = link.to.substring(2);
                                    const el = document.getElementById(id);
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                } else if (link.to === '/' && location.pathname === '/') {
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
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/dashboard" className="flex items-center gap-2 group">
                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110">
                                    <User className="w-4 h-4" />
                                </div>
                                <span className={`text-sm font-medium ${!isTransparent ? 'text-gray-900' : 'text-white'}`}>
                                    {user.name}
                                </span>
                            </Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="text-orange-500 hover:text-orange-600 font-bold text-sm">
                                    Admin
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className={`text-sm transition-colors ${!isTransparent ? 'text-gray-600 hover:text-red-500' : 'text-white/80 hover:text-red-400'}`}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className={`transition-colors ${!isTransparent ? 'text-orange-500 hover:text-orange-600' : 'text-white hover:text-gray-200'}`}>
                                <User className="w-5 h-5" />
                            </Link>
                            <Link
                                to="/contact"
                                className="bg-[#483C5C] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-[#3D2F4A] transition-all"
                            >
                                Contact Us
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`md:hidden transition-colors ${!isTransparent ? 'text-orange-500' : 'text-white'}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav Menu */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white/10 backdrop-blur-lg rounded-2xl mt-2 shadow-xl py-6 flex flex-col items-center gap-4 md:hidden animate-fade-in-down border border-white/20">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className={`font-medium py-2 transition-colors ${!isTransparent ? 'text-orange-500 hover:text-orange-600' : 'text-white hover:text-gray-200'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col items-center gap-4 w-full px-6">
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="flex items-center gap-2 py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <span className="text-white font-medium">{user.name}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-red-500/20 text-red-400 py-3 rounded-xl font-bold border border-red-500/30"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <User className="w-6 h-6" />
                                </Link>
                                <Link
                                    to="/contact"
                                    className="bg-[#483C5C] text-white w-full py-3 rounded-lg font-bold text-center"
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
