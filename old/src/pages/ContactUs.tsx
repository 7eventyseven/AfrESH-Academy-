import React, { useState, useEffect } from 'react';
import {
    Phone, Mail, MapPin, Facebook, Twitter, Instagram,
    Linkedin, ChevronRight, Send, ArrowRight, Menu, X, User
} from "lucide-react";
import { Link } from 'react-router-dom';

const ContactUs: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', to: '/' },
        { name: 'About Us', to: '/about' },
        { name: 'Courses', to: '/courses' },
        { name: 'Portfolio', to: '/#portfolio' },
        { name: 'Testimonials', to: '/#testimonials' },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl z-50 bg-white/20 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/30 shadow-xl transition-all duration-300`}>
                <div className="flex items-center justify-between relative">
                    <div className="flex items-center gap-2">
                        <div className="bg-orange-500 p-1.5 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-black tracking-tighter">afr</span>
                        </div>
                        <Link
                            to="/"
                            className="cursor-pointer"
                        >
                            <span className={`text-2xl font-bold transition-colors ${scrolled ? 'text-orange-500' : 'text-white'}`}>AfRESH</span>
                        </Link>
                    </div>

                    {/* Desktop Nav - Centered */}
                    <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                className={`font-medium transition-colors ${scrolled ? 'text-orange-500 hover:text-orange-600' : 'text-white hover:text-gray-200'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right side - User icon and Contact button */}
                    <div className="hidden md:flex items-center gap-4">
                        <button className={`transition-colors ${scrolled ? 'text-orange-500 hover:text-orange-600' : 'text-white hover:text-gray-200'}`}>
                            <User className="w-5 h-5" />
                        </button>
                        <Link
                            to="/contact"
                            className="bg-[#483C5C] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-[#3D2F4A] transition-all"
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className={`md:hidden transition-colors ${scrolled ? 'text-orange-500' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                                className={`font-medium py-2 transition-colors ${scrolled ? 'text-orange-500 hover:text-orange-600' : 'text-white hover:text-gray-200'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex items-center gap-4">
                            <button className={`transition-colors ${scrolled ? 'text-orange-500 hover:text-orange-600' : 'text-white hover:text-gray-200'}`}>
                                <User className="w-5 h-5" />
                            </button>
                            <Link
                                to="/contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="bg-[#483C5C] text-white px-10 py-3 rounded-lg font-bold"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Contact Hero Section */}
            <section className="relative min-h-screen pt-20 pb-0">
                <div className="absolute inset-0">
                    <img
                        src="https://picsum.photos/seed/contact/1920/1080"
                        alt="Contact background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-20">
                    {/* Back Button */}
                    <Link
                        to="/"
                        className="mb-8 text-white hover:text-gray-200 transition-colors flex items-center gap-2 inline-flex"
                    >
                        <ChevronRight className="rotate-180" size={20} />
                        Back to Home
                    </Link>

                    {/* Hero Text Overlay */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            We'd love to hear from you. Reach out any time and we'll respond as soon as possible.
                        </p>
                    </div>

                    {/* Main Contact Card */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Left Column - Get In Touch */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">Get In Touch</h2>

                                <div className="space-y-6 mb-10">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-[#483C5C] rounded-full flex items-center justify-center shrink-0">
                                            <Phone className="text-white" size={20} />
                                        </div>
                                        <span className="text-gray-700 text-lg pt-2">+2348070123</span>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-[#483C5C] rounded-full flex items-center justify-center shrink-0">
                                            <Mail className="text-white" size={20} />
                                        </div>
                                        <span className="text-gray-700 text-lg pt-2">info@gmail.com</span>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-[#483C5C] rounded-full flex items-center justify-center shrink-0">
                                            <MapPin className="text-white" size={20} />
                                        </div>
                                        <span className="text-gray-700 text-lg pt-2">No 123, Afresh Academy, London, UK</span>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <p className="text-gray-700 font-medium mb-4">Follow our social media</p>
                                    <div className="flex gap-3">
                                        {[Facebook, Twitter, Instagram, Linkedin, Linkedin].map((Icon, i) => (
                                            <a
                                                key={i}
                                                href="#"
                                                className="w-10 h-10 bg-[#483C5C] rounded-full flex items-center justify-center hover:bg-[#3D2F4A] transition-all"
                                            >
                                                <Icon className="text-white" size={18} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Contact Form */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a message</h2>

                                <form className="space-y-6">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Name"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                                        <input
                                            type="email"
                                            placeholder="Enter Email"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="Enter Number"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Subject</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Subject"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Message</label>
                                        <textarea
                                            placeholder="Enter your message"
                                            rows={6}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent resize-y"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#483C5C] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#3D2F4A] transition-all flex items-center justify-center gap-2"
                                    >
                                        <Send size={20} />
                                        Sent
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="relative w-full h-[500px] bg-gray-200">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.032407707!2d-0.12775838422942767!3d51.50735097960455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce3941eb1f%3A0x1a1342ed5ec5e41f!2sTrafalgar%20Square%2C%20London!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'grayscale(100%)' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#483C5C] pt-24 pb-12 text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                        <div className="space-y-8">
                            <div className="flex items-center gap-2">
                                <div className="bg-white p-1.5 rounded flex items-center justify-center shadow-lg">
                                    <span className="text-[#483C5C] text-xs font-black tracking-tighter">afr</span>
                                </div>
                                <span className="text-2xl font-bold">AfRESH</span>
                            </div>
                            <p className="text-white/70 leading-relaxed text-sm">
                                A unique platform where the Afresh Academy talents upload their work, and customer hire them for projects.
                            </p>
                            <div className="flex gap-4">
                                {[Facebook, Twitter, Instagram, Linkedin, Linkedin].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold mb-8">Navigation</h4>
                            <ul className="space-y-4 text-white/70">
                                {['Home', 'About', 'Services', 'Testimonials', 'Contact Us'].map(link => (
                                    <li key={link}>
                                        <Link
                                            to={link === 'Home' ? '/' : (link === 'About' ? '/about' : (link === 'Services' ? '/courses' : '#'))}
                                            className="hover:text-white transition-colors"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold mb-8">Contact</h4>
                            <ul className="space-y-6">
                                <li className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                                        <Phone size={18} />
                                    </div>
                                    <span className="text-white/70 text-sm">+23481234442</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                                        <Mail size={18} />
                                    </div>
                                    <span className="text-white/70 text-sm">af@gmail.com</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                                        <MapPin size={18} />
                                    </div>
                                    <span className="text-white/70 text-sm">No 12A, off Airport road, Akure, Ondo state.</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold mb-8">Get the latest Information</h4>
                            <p className="text-white/70 text-sm mb-6">Learn. Grow. Succeed.</p>
                            <p className="text-white/70 text-xs mb-6">Subscribe to support the latest news, academics tips, and opportunities from all our students.</p>
                            <form className="relative">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
                                />
                                <button className="absolute right-2 top-2 bottom-2 bg-orange-500 text-white px-4 rounded-lg hover:bg-orange-600 transition-colors">
                                    <ArrowRight size={20} />
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-white/50 text-sm">© 2024 Learning Platform. All rights reserved.</p>
                        <div className="flex gap-8 text-white/50 text-sm">
                            <a href="#" className="hover:text-white">Privacy Policy</a>
                            <a href="#" className="hover:text-white">Terms of Service</a>
                        </div>
                    </div>
                </div>

                {/* Decorative background shape */}
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            </footer>
        </div>
    );
};

export default ContactUs;
