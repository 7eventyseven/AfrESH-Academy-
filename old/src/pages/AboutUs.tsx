import React from 'react';
import {
  Brain, Building2, Sparkles, Twitter,
  Linkedin, Award, Heart, Users, Lightbulb, Globe, AtSign,
  ArrowRight, Phone, Mail, MapPin, Facebook, Instagram
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { TEAM } from '../constants';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#483C5C]/80"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About AfRESH Academy
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            The comprehensive platform for technology learning and problem-solving in a progressive and collaborative environment.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-[#483C5C] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80 text-sm md:text-base">Happy Students</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">95%</div>
              <div className="text-white/80 text-sm md:text-base">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">200+</div>
              <div className="text-white/80 text-sm md:text-base">Courses</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">400+</div>
              <div className="text-white/80 text-sm md:text-base">Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - About Us and What We Do */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Image Collage */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-2xl aspect-square">
                <div className="absolute top-0 left-0 w-[48%] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=800&fit=crop"
                    alt="Work"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-0 right-0 w-[42%] aspect-square rounded-full overflow-hidden shadow-xl border-4 border-dashed border-orange-500 p-2 bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=600&fit=crop"
                    alt="Tape"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-[40%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop"
                    alt="Presentation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-[42%] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop"
                    alt="Together"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div>
              <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">About Us</span>
              <p className="text-gray-700 mt-4 mb-4 leading-relaxed text-base">
                Afresh Academy is a forward-thinking learning institution committed to equipping individuals and businesses with practical skills for today's digital and business world.
              </p>
              <div className="space-y-6 mb-8 mt-8">
                <h3 className="text-xl font-bold text-gray-900">What We Do</h3>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#483C5C] rounded-full flex items-center justify-center shrink-0">
                    <Brain className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm">Courses and programs from beginners to advanced levels.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#483C5C] rounded-full flex items-center justify-center shrink-0">
                    <Building2 className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm">Collaborative learning environment fostering innovation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Dedicated professionals passionate about transforming education through technology.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <div className="h-64 relative overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                  <p className="text-[#483C5C] font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">{member.description}</p>
                  <div className="flex gap-3">
                    <a href="#" className="text-gray-600 hover:text-[#483C5C]"><Linkedin size={18} /></a>
                    <a href="#" className="text-gray-600 hover:text-[#483C5C]"><Twitter size={18} /></a>
                    <a href="#" className="text-gray-600 hover:text-[#483C5C]"><AtSign size={18} /></a>
                  </div>
                </div>
              </div>
            ))}
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
              <p className="text-white/70 text-sm">A unique platform for technology and business training.</p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><Icon size={18} /></a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-8">Navigation</h4>
              <ul className="space-y-4 text-white/70">
                {['Home', 'About Us', 'Courses', 'Contact Us'].map(link => (
                  <li key={link}><Link to={link === 'Home' ? '/' : (link === 'About Us' ? '/about' : (link === 'Courses' ? '/courses' : '/contact'))} className="hover:text-white transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-8">Contact</h4>
              <ul className="space-y-4 text-white/70 text-sm">
                <li className="flex items-center gap-4"><Phone size={18} /> +23481234442</li>
                <li className="flex items-center gap-4"><Mail size={18} /> af@gmail.com</li>
                <li className="flex items-center gap-4"><MapPin size={18} /> No 12A, Akure, Nigeria</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-8">Newsletter</h4>
              <form className="relative">
                <input type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white" />
                <button className="absolute right-2 top-2 bottom-2 bg-orange-500 text-white px-4 rounded-lg"><ArrowRight size={20} /></button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
