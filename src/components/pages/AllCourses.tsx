'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen, Users, Star,
  Phone, Mail, MapPin, Facebook, Twitter, Instagram,
  Linkedin, ArrowRight
} from "lucide-react";
import Link from 'next/link';
import Navbar from '../Navbar';
import { getCourses } from '@/lib/api/endpoints';

const AllCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setError(null);
        const { data } = await getCourses();
        setCourses(Array.isArray(data) ? data : []);
      } catch {
        setCourses([]);
        setError(null);
        // Treat any failure (503, 500, network) as empty list – no console error
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/office-pic.jpeg"
            alt="AfrESH Academy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full pt-16 sm:pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4">
              Our Courses
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto px-2">
              Build impactful tech skills with industry-focused training designed to prepare you for real-world opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* All Courses Grid */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500">Loading courses...</div>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 mb-2">{error}</p>
                <p className="text-sm text-gray-500">If you just set up the app, add MONGODB_URI to .env.local in the project root.</p>
              </div>
            ) : courses.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500">No courses available yet.</div>
              </div>
            ) : (
              courses.map((course: any) => (
                <div key={course._id} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all group">
                  <div className="h-40 relative overflow-hidden bg-gray-200">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-[#483C5C] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {course.tag || course.level}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-[#483C5C] transition-colors line-clamp-2 min-h-[3.5rem]">
                      {course.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4 border-b border-gray-100 pb-3">
                      <span className="flex items-center gap-1">
                        <BookOpen size={12} /> {course.duration || 'Self-paced'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={12} /> {course.students ?? 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={12} className="fill-amber-400 text-amber-400" /> {course.rating ?? 0}
                      </span>
                    </div>
                    <Link
                      href={`/enroll?id=${course._id}`}
                      className="w-full bg-[#483C5C] text-white py-2.5 rounded-lg font-bold hover:bg-[#3D2F4A] transition-all text-sm block text-center"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#483C5C] pt-12 sm:pt-24 pb-8 sm:pb-12 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 mb-12 sm:mb-20">
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
                {['Home', 'AboutUs', 'Courses', 'Contact Us'].map(link => (
                  <li key={link}><Link href={link === 'Home' ? '/' : (link === 'AboutUs' ? '/about' : (link === 'Courses' ? '/courses' : '/contact'))} className="hover:text-white transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-8">Contact</h4>
              <ul className="space-y-6 text-white/70 text-sm">
                <li className="flex items-center gap-4"><Phone size={18} /> +23481234442</li>
                <li className="flex items-center gap-4"><Mail size={18} /> af@gmail.com</li>
                <li className="flex items-center gap-4"><MapPin size={18} /> No 12A, Akure, Nigeria</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-8">Newsletter</h4>
              <form className="relative">
                <input type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white" suppressHydrationWarning />
                <button className="absolute right-2 top-2 bottom-2 bg-orange-500 text-white px-4 rounded-lg"><ArrowRight size={20} /></button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AllCourses;
