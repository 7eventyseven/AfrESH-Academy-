'use client';

import React, { useState, useEffect } from 'react';
import {
  Star,
  Clock,
  Layers,
  BarChart,
  CheckCircle2,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Tv,
  Download,
  Award,
  Users,
  Globe,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { getCourseById, enrollInCourse } from '@/lib/api/endpoints';
import axios from 'axios';
import PaystackButton from '../PaystackButton';

const Enroll: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [paystackConfig, setPaystackConfig] = useState<any>(null);

  // Fetch Paystack Key
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('/api/settings');
        if (data?.paystackPublicKey) {
          setPaystackConfig((prev: any) => ({ ...prev, publicKey: data.paystackPublicKey }));
        }
      } catch (error) {
        console.error('Failed to fetch settings', error);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      try {
        const { data } = await getCourseById(id);
        setCourse(data);
        if (data.modules && data.modules.length > 0) {
          setActiveModule(data.modules[0]._id || "0");
        }
      } catch (error) {
        console.error('Failed to fetch course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const toggleModule = (modId: string) => {
    setActiveModule(activeModule === modId ? null : modId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Course not found</h2>
        <Link href="/courses" className="text-violet-600 font-bold hover:underline">Browse Courses</Link>
      </div>
    );
  }

  // Helper to safely parse array fields if they come as strings
  const parseList = (list: any) => {
    if (Array.isArray(list)) return list;
    if (typeof list === 'string') return list.split(',').map(s => s.trim());
    return [];
  };

  const learningPoints = parseList(course.learningPoints);
  const requirements = parseList(course.requirements);
  const modules = course.modules || [];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-violet-100 selection:text-violet-900">
      {/* Back to Courses Link */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link
          href="/courses"
          className="text-gray-700 hover:text-[#483C5C] transition-colors flex items-center gap-2 inline-flex"
        >
          <ChevronRight className="rotate-180" size={20} />
          Back to Courses
        </Link>
      </div>

      {/* Hero Section */}
      <header className="bg-slate-900 text-white pt-12 pb-32 md:pb-48 px-4 md:px-8 relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-violet-600/20 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" /> Featured Course
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
              {course.title}
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-amber-400 text-slate-900 px-2.5 py-1 rounded-md font-bold">
                  {course.rating || '4.8'} <Star className="w-4 h-4 fill-slate-900" />
                </div>
                <span className="text-slate-400 font-medium underline decoration-slate-600 underline-offset-4 cursor-pointer hover:text-white transition-colors">
                  {course.reviewsCount || 120} ratings
                </span>
              </div>
              <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-slate-300">
                <Users className="w-5 h-5 text-violet-400" />
                <span className="font-medium">{course.students || 0} students enrolled</span>
              </div>
              <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-5 h-5 text-violet-400" />
                <span className="font-medium">English [Auto]</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                {course.instructor?.avatar ? (
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-14 h-14 rounded-full border-2 border-violet-500/30 object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full border-2 border-violet-500/30 bg-slate-800 flex items-center justify-center text-white font-bold text-xl">
                    {course.instructor?.name?.charAt(0) || 'I'}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-slate-900"></div>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Lead Instructor</p>
                <p className="text-lg font-bold text-white hover:text-violet-400 cursor-pointer transition-colors">
                  {course.instructor?.name || 'Instructor'}
                </p>
                <p className="text-slate-400 text-sm">{course.instructor?.title || 'Senior Instructor'}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 -mt-20 md:-mt-32 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Course Details */}
          <div className="lg:col-span-8 space-y-12">

            {/* Summary Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Clock, label: "Duration", value: course.duration || 'N/A' },
                { icon: Layers, label: "Modules", value: modules.length },
                { icon: BarChart, label: "Level", value: course.level },
                { icon: ShieldCheck, label: "Access", value: "Lifetime" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center">
                  <stat.icon className="w-5 h-5 text-violet-600 mb-2" />
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{stat.label}</span>
                  <span className="text-sm font-bold text-slate-900">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* What You'll Learn Section */}
            <section className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-violet-600" />
                What you'll learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                {learningPoints.map((point: string, idx: number) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-violet-50 flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5 text-violet-600" />
                    </div>
                    <span className="text-slate-600 text-[15px] leading-relaxed group-hover:text-slate-900 transition-colors">{point}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Content Accordion */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Course Content</h2>
                  <p className="text-slate-500 text-sm">
                    {modules.length} sections - {course.duration || 'N/A'} total length
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                {modules.map((module: any, idx: number) => {
                  const modId = module._id || idx.toString();
                  return (
                    <div key={modId} className="border-b border-slate-100 last:border-0">
                      <button
                        onClick={() => toggleModule(modId)}
                        className={`w-full flex items-center justify-between p-6 transition-all ${activeModule === modId ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeModule === modId ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <PlayCircle className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-left text-slate-800 tracking-tight">{module.title}</span>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className="hidden sm:block text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                            {module.lessons?.length || 0} LESSONS
                          </span>
                          {activeModule === modId ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                        </div>
                      </button>
                      {activeModule === modId && (
                        <div className="px-6 pb-6 bg-slate-50 space-y-4">
                          {module.lessons?.map((lesson: any, lIdx: number) => (
                            <div key={lIdx} className="flex items-center justify-between group cursor-pointer hover:bg-white p-3 rounded-xl transition-all border border-transparent hover:border-slate-200">
                              <div className="flex items-center gap-4">
                                <PlayCircle className="w-4 h-4 text-slate-300 group-hover:text-violet-600 transition-colors" />
                                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{lesson.title}</span>
                              </div>
                              <span className="text-xs text-slate-400 font-mono">{lesson.duration ? `${lesson.duration}m` : ''}</span>
                            </div>
                          ))}
                          {(!module.lessons || module.lessons.length === 0) && (
                            <p className="text-sm text-slate-400 italic text-center">No lessons in this module yet.</p>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Requirements Section */}
            <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Requirements</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                    <div className="mt-1 w-2 h-2 rounded-full bg-violet-600 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-slate-600">{req}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Floating Pricing Card */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-300/60 border border-slate-100 overflow-hidden flex flex-col">
                {/* Course Media Preview */}
                <div className="relative group cursor-pointer overflow-hidden aspect-video">
                  <img
                    src={course.image || "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800"}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                    <div className="bg-white p-5 rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-300">
                      <PlayCircle className="w-10 h-10 text-violet-600 fill-violet-600" />
                    </div>
                  </div>
                </div>

                <div className="p-10 space-y-8">
                  {/* Pricing */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-black text-slate-900 tracking-tight">${course.price}</span>
                        {course.originalPrice > course.price && (
                          <span className="text-lg text-slate-400 line-through font-medium">${course.originalPrice}</span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-red-500 flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> Offer ends soon!
                      </p>
                    </div>
                    {course.originalPrice > course.price && (
                      <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-200">
                        {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-4">
                    <PaystackButton
                      course={course}
                      publicKey={paystackConfig?.publicKey}
                      onSuccess={async () => {
                        try {
                          await enrollInCourse(course._id);
                          router.push('/dashboard/courses');
                        } catch (error) {
                          alert('Enrollment failed after payment. Please contact support.');
                        }
                      }}
                    />
                    <button className="w-full bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-100 font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" /> Download Syllabus
                    </button>
                  </div>

                  {/* Trust Factors */}
                  <div className="space-y-5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Lifetime Perks Included</p>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { icon: Award, label: "Official Certificate" },
                        { icon: FileCheck, label: "Practical Projects" },
                        { icon: Tv, label: "HD Video Streaming" },
                        { icon: Download, label: "Downloadable Assets" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                          <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-violet-50 group-hover:border-violet-100 transition-colors">
                            <item.icon className="w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
                          </div>
                          <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Guarantee Footer */}
                <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
                  <p className="text-xs font-medium text-slate-500">
                    30-Day Money-Back Guarantee - Secure Checkout
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Enroll;
