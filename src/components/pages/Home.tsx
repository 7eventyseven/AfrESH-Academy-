'use client';

import React, { useState, useEffect } from 'react';
import {
    Menu, X, Play, BookOpen, Users, Award, Briefcase,
    MapPin, Phone, Mail, Instagram, Twitter, Facebook,
    Linkedin, ChevronRight, Star, Quote, ArrowRight,
    Monitor, Lightbulb, PenTool, User, GraduationCap, Settings, Gem, Shield
} from "lucide-react";
import Link from 'next/link';
import Navbar from '../Navbar';
import { getCourses, getPortfolio } from '@/lib/api/endpoints';
import { TESTIMONIALS, TEAM } from "../constants";

const Home: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [portfolio, setPortfolio] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const latestVideoRef = React.useRef<HTMLVideoElement>(null);
    const latestVideoSectionRef = React.useRef<HTMLElement>(null);
    // Lightweight: external sample first; add /wildlife.mp4 on server for your video
    const latestVideoSources = [
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        '/wildlife.mp4',
        '/wildlife%281%29.mp4',
    ];
    const latestVideoSourceIndex = React.useRef(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesResponse, portfolioResponse] = await Promise.all([
                    getCourses(),
                    getPortfolio()
                ]);
                setCourses(Array.isArray(coursesResponse?.data) ? coursesResponse.data : []);
                setPortfolio(Array.isArray(portfolioResponse?.data) ? portfolioResponse.data : []);
            } catch {
                setCourses([]);
                setPortfolio([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Set initial video source from list
    useEffect(() => {
        const video = latestVideoRef.current;
        if (!video || latestVideoSources.length === 0) return;
        video.src = latestVideoSources[0];
        latestVideoSourceIndex.current = 0;
    }, []);

    // Play latest video when section is in view (muted for autoplay policy), pause when out of view; try next source on error
    useEffect(() => {
        const section = latestVideoSectionRef.current;
        const video = latestVideoRef.current;
        if (!section || !video) return;

        const tryPlay = () => {
            video.muted = true;
            video.playsInline = true;
            const p = video.play();
            if (p && typeof p.catch === 'function') p.catch(() => { });
        };

        function isElementInView(el: HTMLElement) {
            const rect = el.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        }

        const onCanPlay = () => {
            if (section && isElementInView(section)) tryPlay();
        };

        const onError = () => {
            const idx = latestVideoSourceIndex.current + 1;
            if (idx < latestVideoSources.length) {
                latestVideoSourceIndex.current = idx;
                video.src = latestVideoSources[idx];
                video.load();
            }
        };

        video.addEventListener('canplay', onCanPlay);
        video.addEventListener('loadeddata', onCanPlay);
        video.addEventListener('error', onError);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target !== section) return;
                    if (entry.isIntersecting) tryPlay();
                    else video.pause();
                });
            },
            { threshold: 0.2, rootMargin: '50px' }
        );
        observer.observe(section);

        if (video.readyState >= 2 && isElementInView(section)) tryPlay();

        return () => {
            observer.disconnect();
            video.removeEventListener('canplay', onCanPlay);
            video.removeEventListener('loadeddata', onCanPlay);
            video.removeEventListener('error', onError);
        };
    }, []);

    // About Us cards animation on scroll
    useEffect(() => {
        let scrollHandler: (() => void) | null = null;
        let observer: IntersectionObserver | null = null;

        const initAnimation = () => {
            const aboutSection = document.getElementById('about');
            if (!aboutSection) {
                setTimeout(initAnimation, 100);
                return;
            }

            const cards = [
                document.getElementById('about-card-1'),
                document.getElementById('about-card-2'),
                document.getElementById('about-card-3'),
                document.getElementById('about-card-4'),
            ];

            if (cards.some(card => !card)) {
                setTimeout(initAnimation, 100);
                return;
            }

            const handleScroll = () => {
                const rect = aboutSection.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

                if (isVisible) {
                    const scrollProgress = Math.min(
                        Math.max((window.innerHeight * 0.8 - rect.top) / (window.innerHeight * 0.5), 0),
                        1
                    );

                    cards.forEach((card, index) => {
                        if (card) {
                            let translateX = 0;
                            let translateY = 0;

                            switch (index) {
                                case 0:
                                    translateX = 0 * (1 - scrollProgress);
                                    translateY = -30 * (1 - scrollProgress);
                                    break;
                                case 1:
                                    translateX = 0 * (1 - scrollProgress);
                                    translateY = -30 * (1 - scrollProgress);
                                    break;
                                case 2:
                                    translateX = 0 * (1 - scrollProgress);
                                    translateY = 30 * (1 - scrollProgress);
                                    break;
                                case 3:
                                    translateX = 10 * (1 - scrollProgress);
                                    translateY = 30 * (1 - scrollProgress);
                                    break;
                            }

                            const scale = 0.85 + (0.15 * scrollProgress);
                            const opacity = 0.7 + (0.3 * scrollProgress);

                            card.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
                            card.style.opacity = opacity.toString();
                        }
                    });
                }
            };

            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            handleScroll();
                        }
                    });
                },
                { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
            );

            observer.observe(aboutSection);
            scrollHandler = handleScroll;
            window.addEventListener('scroll', handleScroll, { passive: true });
            setTimeout(handleScroll, 100);
        };

        initAnimation();

        return () => {
            if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
            if (observer) observer.disconnect();
        };
    }, []);

    // Work Process icons animation
    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        let hasAnimated = false;

        const initAnimation = () => {
            const workProcessSection = document.getElementById('work-process');
            if (!workProcessSection) {
                setTimeout(initAnimation, 100);
                return;
            }

            const icons = [
                document.getElementById('work-process-icon-0'),
                document.getElementById('work-process-icon-1'),
                document.getElementById('work-process-icon-2'),
                document.getElementById('work-process-icon-3'),
            ];

            if (icons.some(icon => !icon)) {
                setTimeout(initAnimation, 100);
                return;
            }

            const animateIcons = () => {
                if (hasAnimated) return;
                hasAnimated = true;
                icons.forEach((icon, index) => {
                    if (icon) {
                        setTimeout(() => {
                            icon.style.transform = 'translateY(0px)';
                            icon.style.opacity = '1';
                        }, index * 150);
                    }
                });
            };

            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) animateIcons();
                    });
                },
                { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
            );

            observer.observe(workProcessSection);
        };

        initAnimation();
        return () => {
            if (observer) observer.disconnect();
        };
    }, []);

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section id="home" className="relative min-h-[70vh] sm:min-h-[80vh] h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop" alt="Hero" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full pt-6 sm:pt-8">
                    <div className="max-w-2xl">
                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4 animate-slide-in-left">
                            Where <span className="text-orange-500">Knowledge</span> Meets Real-World Skills
                        </h1>
                        <p className="text-white text-base sm:text-lg md:text-xl mb-4 sm:mb-3 leading-relaxed animate-slide-in-left">
                            Afresh Academy is a multi-disciplinary academy providing hands-on training across technology, business, and creative disciplines.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-in-left">
                            <Link href="/signup" className="bg-white text-black px-6 sm:px-10 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-100 transition-all flex items-center justify-center shadow-lg min-h-[48px]">
                                Get Started
                            </Link>
                            <Link href="/application" className="bg-[#483C5C] text-white px-6 sm:px-9 py-3.5 rounded-xl font-bold text-base sm:text-lg hover:bg-[#3D2F4A] transition-all flex items-center justify-center shadow-lg min-h-[48px]">
                                Apply Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quality Section */}
            <section className="py-8 sm:py-12 -mt-16 sm:-mt-24 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="bg-[#483C5C] rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 flex flex-col md:flex-row text-white">
                        <div className="flex flex-col gap-3 sm:gap-4 text-center flex-1 pb-6 md:pb-0 md:border-r border-white/20">
                            <h3 className="text-2xl sm:text-4xl font-bold">Quality</h3>
                            <p className="text-sm">We deliver high-quality training with well-structured courses, practical learning, and up-to-date industry standards.</p>
                        </div>
                        <div className="flex flex-col gap-3 sm:gap-4 text-center flex-1 py-6 md:py-0 md:px-8 md:border-r border-white/20">
                            <h3 className="text-2xl sm:text-4xl font-bold">Leadership</h3>
                            <p className="text-sm">Our leadership team is driven by innovation, integrity, and a passion for developing future-ready professionals.</p>
                        </div>
                        <div className="flex flex-col gap-3 sm:gap-4 text-center flex-1 pt-6 md:pt-0 md:pl-8">
                            <h3 className="text-2xl sm:text-4xl font-bold">Experience</h3>
                            <p className="text-sm">With hands-on industry experience, our instructors bring real-world knowledge that prepares learners for success.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="pt-10 sm:pt-16 pb-16 sm:pb-24 bg-gray-100 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
                    <div className="relative flex justify-center">
                        <div className="relative w-full max-w-2xl aspect-square">
                            <div id="about-card-1" className="absolute top-0 left-0 w-[48%] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl transition-all duration-1000"><img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=800&fit=crop" alt="About" className="w-full h-full object-cover" /></div>
                            <div id="about-card-2" className="absolute top-0 right-0 w-[42%] aspect-square rounded-full shadow-xl transition-all duration-1000 p-2 bg-white border-4 border-dashed border-orange-500"><img src="https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=600&fit=crop" alt="Circular" className="w-full h-full object-cover rounded-full" /></div>
                            <div id="about-card-3" className="absolute bottom-0 left-0 w-[40%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl transition-all duration-1000"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop" alt="Presentation" className="w-full h-full object-cover" /></div>
                            <div id="about-card-4" className="absolute bottom-0 right-0 w-[42%] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl transition-all duration-1000"><img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop" alt="Laptop" className="w-full h-full object-cover" /></div>
                        </div>
                    </div>
                    <div>
                        <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">About Us</span>
                        <p className="text-gray-700 mt-4 mb-8 leading-relaxed">Afresh Academy is a forward-thinking learning institution committed to equipping individuals and businesses with practical skills for today's digital and business world. We provide hands-on training in technology and business disciplines, helping our students grow confidently and stay competitive in a fast-changing global market.</p>
                        <div className="space-y-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 bg-[#483C5C] rounded-full flex items-center justify-center shrink-0"><Monitor className="text-white w-7 h-7" /></div>
                                <div><p className="text-gray-700 text-sm">We offer a wide range of training programs across technology and digital skills.</p></div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 bg-[#483C5C] rounded-full flex items-center justify-center shrink-0"><Briefcase className="text-white w-7 h-7" /></div>
                                <div><p className="text-gray-700 text-sm">Our courses are tailored for beginners, professionals, and entrepreneurs seeking growth.</p></div>
                            </div>
                        </div>
                        <Link href="/about" className="bg-gradient-to-r from-[#483C5C] to-purple-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 inline-flex">
                            Learn More <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-16 sm:py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <img src="https://picsum.photos/seed/stats/1920/1080" alt="Stats" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#483C5C]/80"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-center text-white">
                    {[
                        { icon: <BookOpen />, value: '50+', label: 'Total Courses' },
                        { icon: <Users />, value: '200+', label: 'Total Students' },
                        { icon: <PenTool />, value: '30+', label: 'Total Teachers' },
                        { icon: <Award />, value: '100+', label: 'Total Awards' },
                    ].map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 sm:gap-4">
                            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">{stat.icon}</div>
                            <h4 className="text-3xl sm:text-5xl font-black">{stat.value}</h4>
                            <p className="text-white/80 font-medium uppercase tracking-wider text-xs sm:text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Courses Section */}
            <section id="services" className="py-12 sm:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold">Our Courses</h2>
                        <p className="text-gray-500 mt-3 sm:mt-4 text-sm sm:text-base">Discover our comprehensive range of courses designed to master new skills.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
                        {loading ? (
                            <div className="col-span-full text-center py-12">
                                <div className="text-gray-500">Loading courses...</div>
                            </div>
                        ) : courses.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <div className="text-gray-500">No courses available yet.</div>
                            </div>
                        ) : (
                            courses.slice(0, 3).map((course: any) => (
                                <div key={course._id} className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 transition-all hover:shadow-2xl group">
                                    <div className="h-56 relative overflow-hidden">
                                        <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute top-4 left-4 bg-[#483C5C] text-white text-xs font-bold px-3 py-1 rounded-full">{course.tag || course.level}</div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                                        <p className="text-gray-500 text-sm mb-6 line-clamp-2">{course.description}</p>
                                        <Link href={`/enroll?id=${course._id}`} className="w-full bg-[#483C5C] text-white py-3 rounded-xl font-bold hover:bg-[#3D2F4A] transition-all block text-center">Enroll Now</Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="flex justify-end">
                        <Link href="/courses" className="bg-[#483C5C] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2">View All Courses <ArrowRight size={18} /></Link>
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="py-12 sm:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold">Portfolio</h2>
                        <p className="text-gray-500 mt-4">Explore our featured projects showcasing creativity and excellence.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {loading ? (
                            <div className="col-span-full text-center py-12">
                                <div className="text-gray-500">Loading portfolio...</div>
                            </div>
                        ) : portfolio.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <div className="text-gray-500">No portfolio items available yet.</div>
                            </div>
                        ) : (
                            portfolio.map((item: any) => (
                                <div key={item._id} className="bg-white rounded-2xl overflow-hidden shadow-lg group">
                                    <div className="h-64 relative overflow-hidden bg-black">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-90 transition-all group-hover:scale-110" />
                                    </div>
                                    <div className="p-6">
                                        <span className="text-orange-500 font-bold text-[10px] tracking-widest">{item.category}</span>
                                        <h3 className="font-bold text-lg mb-2 truncate">{item.title}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {item.tags.map((tag: string) => (
                                                <span key={tag} className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px]">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Latest Videos Section */}
            <section ref={latestVideoSectionRef} className="py-12 sm:py-24 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div>
                            <span className="text-orange-500 font-bold text-sm">Latest Videos</span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3 sm:mb-4">
                                Let&apos;s check our <span className="text-orange-500">Latest Video</span>
                            </h2>
                            <p className="text-gray-600 mb-6">
                                See AfrESH Academy in Action Watch how our students learn, grow, and build real-world skills through hands-on training.
                            </p>
                            <Link
                                href="/courses"
                                className="inline-flex items-center gap-2 bg-[#483C5C] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#3D2F4A] transition-colors"
                            >
                                Learn More <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                        <div className="bg-white rounded-2xl shadow-md overflow-hidden aspect-video min-h-[280px] border border-gray-200">
                            <video
                                ref={latestVideoRef}
                                className="w-full h-full object-cover"
                                controls
                                playsInline
                                muted
                                loop
                                autoPlay
                                preload="auto"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us / Building Strong Minds Section */}
            <section className="pt-6 pb-12 sm:pb-24 bg-[#6B5B7A]" data-section="building-strong-minds">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="!mt-0 !mb-0 !pb-0">
                        <span className="text-white/90 text-sm font-medium block">Why choose Us</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-white uppercase mt-2 mb-1 tracking-tight leading-tight">
                            BUILDING STRONG MINDS FOR A<br />
                            <span className="text-orange-500">BRIGHTER FUTURE</span>
                        </h2>
                        <p className="text-white/90 max-w-2xl text-left !m-0 !p-0 !block">
                            At AfrESH Academy, we are committed to nurturing confident, knowledgeable, and well-rounded learners. Here&apos;s why parents and students choose us:
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-end" style={{ marginTop: '-5rem' }}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:col-span-2">
                            <div className="bg-white/95 rounded-xl p-5 shadow-lg min-h-[180px]">
                                <div className="w-11 h-11 bg-orange-500 rounded-lg flex items-center justify-center mb-3">
                                    <Star className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-base mb-1.5">Quality Education</h3>
                                <p className="text-gray-600 text-sm leading-snug">We deliver a comprehensive curriculum foundation through a well-structured curriculum that encourages critical thinking, creativity, and excellence.</p>
                            </div>
                            <div className="bg-white/95 rounded-xl p-5 shadow-lg min-h-[180px]">
                                <div className="w-11 h-11 bg-orange-500 rounded-lg flex items-center justify-center mb-3">
                                    <GraduationCap className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-base mb-1.5">Qualified Teachers</h3>
                                <p className="text-gray-600 text-sm leading-snug">Our experienced and passionate educators provide personalized attention, ensuring every learner is supported and inspired to succeed.</p>
                            </div>
                            <div className="bg-white/95 rounded-xl p-5 shadow-lg min-h-[180px]">
                                <div className="w-11 h-11 bg-orange-500 rounded-lg flex items-center justify-center mb-3">
                                    <Lightbulb className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-base mb-1.5">Modern Teaching Methods</h3>
                                <p className="text-gray-600 text-sm leading-snug">We use technology and innovative approaches to make learning engaging and effective for every student.</p>
                            </div>
                            <div className="bg-white/95 rounded-xl p-5 shadow-lg min-h-[180px]">
                                <div className="w-11 h-11 bg-orange-500 rounded-lg flex items-center justify-center mb-3">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-base mb-1.5">Value-Based Education</h3>
                                <p className="text-gray-600 text-sm leading-snug">We integrate character development and ethics into our curriculum to build responsible, confident individuals.</p>
                            </div>
                        </div>
                        <div className="relative rounded-2xl min-h-[380px] overflow-hidden">
                            <img
                                src="/building-minds.jpeg"
                                alt="AfrESH Academy"
                                className="w-full h-full min-h-[380px] object-cover rounded-2xl block"
                            />
                            <div
                                className="absolute inset-0 rounded-2xl border-4 sm:border-[5px] border-orange-500 pointer-events-none animate-float-border"
                                aria-hidden
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section id="work-process" className="py-12 sm:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold">Our Proven Work Process</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                        {[
                            { title: 'Consultation', icon: <Monitor /> },
                            { title: 'Training', icon: <Lightbulb /> },
                            { title: 'Implementation', icon: <PenTool /> },
                            { title: 'Final Result', icon: <Award /> },
                        ].map((step, idx) => (
                            <div key={idx} id={`work-process-icon-${idx}`} className="flex flex-col items-center opacity-0 transition-all duration-700 transform translate-y-12">
                                <div
                                    className="flex flex-col items-center animate-work-process-dance"
                                    style={{ animationDelay: `${idx * 0.25}s` }}
                                >
                                    <div className="w-20 h-20 bg-[#483C5C] rounded-full flex items-center justify-center text-white shadow-xl mb-6 relative">
                                        {step.icon}
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border-4 border-[#483C5C] rounded-full flex items-center justify-center text-[#483C5C] font-bold text-xs">{idx + 1}</div>
                                    </div>
                                </div>
                                <h4 className="font-bold text-xl mb-3">{step.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-12 sm:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16"><h2 className="text-3xl font-bold">What Our Students Say</h2></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((t) => (
                            <div key={t.id} className="bg-white p-8 rounded-[40px] shadow-lg border-b-8 border-[#483C5C] hover:-translate-y-2 transition-transform h-full flex flex-col">
                                <div className="flex gap-1 mb-6 text-orange-400">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
                                <div className="relative mb-8 flex-grow">
                                    <Quote className="absolute -top-4 -left-2 text-[#483C5C]/10 w-12 h-12" />
                                    <p className="text-gray-600 italic relative z-10">{t.content}</p>
                                </div>
                                <div className="flex items-center gap-4 border-t pt-6">
                                    <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full object-cover" />
                                    <div><h4 className="font-bold text-gray-900">{t.name}</h4><p className="text-[#483C5C] text-xs font-medium">{t.role}</p></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-12 sm:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10 sm:mb-16"><h2 className="text-2xl sm:text-3xl font-bold">Meet Our Team</h2></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-16 justify-items-center">
                        {TEAM.slice(0, 3).map((member) => (
                            <div key={member.id} className="text-center w-full max-w-sm md:max-w-none">
                                <div className="w-full max-w-[18rem] sm:w-80 h-72 sm:h-96 mx-auto mb-6 sm:mb-8 overflow-hidden rounded-2xl shadow-xl transition-transform hover:scale-105">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <h4 className="text-2xl font-bold">{member.name}</h4>
                                <p className="text-[#483C5C] font-medium mb-4">{member.role}</p>
                                <p className="text-gray-500 text-sm">{member.description}</p>
                            </div>
                        ))}
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

export default Home;
