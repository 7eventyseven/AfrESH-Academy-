'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Play, ChevronRight } from 'lucide-react';
import { getMyEnrollments } from '@/lib/api/endpoints';

export default function MyCoursesPage() {
    const [enrollments, setEnrollments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const { data } = await getMyEnrollments();
                setEnrollments(data);
            } catch (error) {
                console.error('Failed to fetch enrollments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#483C5C]"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
                    <p className="text-gray-500">Continue learning where you left off</p>
                </div>
                <Link href="/courses" className="text-[#483C5C] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    Browse More Courses <ChevronRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {enrollments.length === 0 ? (
                    <div className="col-span-full bg-white p-12 rounded-3xl text-center border-2 border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="text-gray-300" size={40} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No active enrollments</h3>
                        <p className="text-gray-500 mb-6">You haven't enrolled in any courses yet. Start your journey today!</p>
                        <Link href="/courses" className="bg-[#483C5C] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#3D2F4A] transition-all inline-block">
                            Explore Courses
                        </Link>
                    </div>
                ) : (
                    enrollments.map((enrollment) => (
                        <div key={enrollment._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                            <div className="h-48 relative overflow-hidden">
                                <img
                                    src={enrollment.course?.image}
                                    alt={enrollment.course?.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="bg-white text-[#483C5C] p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                                        <Play size={24} fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-widest font-bold">
                                    <span className="text-orange-500 bg-orange-50 px-2 py-1 rounded-md">{enrollment.course?.level}</span>
                                    <span className="text-gray-400">Progress: {enrollment.progress}%</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 h-14">{enrollment.course?.title}</h3>

                                <div className="w-full h-2 bg-gray-100 rounded-full mb-6 relative overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-[#483C5C] transition-all duration-1000"
                                        style={{ width: `${enrollment.progress}%` }}
                                    ></div>
                                </div>

                                <Link
                                    href={`/dashboard/learn/${enrollment.course?._id}`}
                                    className="block w-full py-3 rounded-xl border-2 border-[#483C5C] text-[#483C5C] font-bold text-sm hover:bg-[#483C5C] hover:text-white transition-all text-center"
                                >
                                    Resume Learning
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
