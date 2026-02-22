'use client';

import React, { useState } from 'react';
import {
  Menu, X, User, Phone, Mail, MapPin, Facebook, Twitter, Instagram,
  Linkedin, ArrowRight, Send
} from 'lucide-react';
import Link from 'next/link';

const Application: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNo: '',
    email: 'info.email@gmail.com',
    programQuestion: '',
    program: '',
    homeNumber: '',
    stateCity: '',
    zipCode: '',
    address: 'Your full address',
    highestEducation: '',
    relevantSkills: 'Give brief about your education & background',
    motivation: 'Give brief about your motivation to join us',
    resume: null as File | null
  });

  React.useEffect(() => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    alert('Application submitted successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        resume: e.target.files[0]
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className={`fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-1rem)] sm:w-[95%] max-w-7xl z-50 bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-white/30 shadow-xl transition-all duration-300`}>
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black tracking-tighter">afr</span>
            </div>
            <Link
              href="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
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
                href={link.to}
                onClick={() => {
                  if (link.name === 'Home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
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
              href="/contact"
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
                href={link.to}
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
                href="/contact"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="bg-[#483C5C] text-white px-10 py-3 rounded-lg font-bold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="/office-pic.jpeg"
            alt="AfrESH Academy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Application Form
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Become part of the Afresh community. All information provided will be treated as confidential.
          </p>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Application Form</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone No</label>
                    <input
                      type="tel"
                      name="phoneNo"
                      value={formData.phoneNo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Program Question</label>
                    <select
                      name="programQuestion"
                      value={formData.programQuestion}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="web-dev">Web Development</option>
                      <option value="graphic-design">Graphic Design</option>
                      <option value="ui-ux">UI/UX Design</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Home Number</label>
                    <input
                      type="text"
                      name="homeNumber"
                      value={formData.homeNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State / City</label>
                    <input
                      type="text"
                      name="stateCity"
                      value={formData.stateCity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                    <select
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="10001">10001</option>
                      <option value="10002">10002</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Educational Background */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Educational Background</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Highest Education Level</label>
                    <select
                      name="highestEducation"
                      value={formData.highestEducation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="high-school">High School</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relevant Skills</label>
                    <textarea
                      name="relevantSkills"
                      value={formData.relevantSkills}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Motivation */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Motivation</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to join the Afresh Academy?
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Resume Upload</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload your resume</label>
                  <div className="border border-gray-300 rounded-lg p-4">
                    <input
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#483C5C] file:text-white hover:file:bg-[#3D2F4A] cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-2">Max size 1MB</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-[#483C5C] text-white px-12 py-4 rounded-lg font-bold hover:bg-[#3D2F4A] transition-all shadow-lg"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
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
                      href={link === 'Home' ? '/' : '#'}
                      onClick={(e) => {
                        if (link === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
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
                  <span className="text-white/70 text-sm">+120027718304</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <span className="text-white/70 text-sm">support@afresh.academy</span>
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

export default Application;
