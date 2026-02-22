'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Briefcase, GraduationCap, Plus } from 'lucide-react';
import { getCourses, getPortfolio, getTeachers } from '@/lib/api/endpoints';
import Link from 'next/link';

export default function AdminDashboardPage() {
    const [courses, setCourses] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesRes, portfolioRes, teachersRes] = await Promise.all([
                    getCourses(),
                    getPortfolio(),
                    getTeachers()
                ]);
                setCourses(coursesRes.data);
                setPortfolio(portfolioRes.data);
                setTeachers(teachersRes.data);
            } catch (error) {
                console.error('Failed to fetch admin data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#483C5C]"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Manage courses, instructors, and portfolio</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                    {/* Quick Add Buttons */}
                    <Link href="/admin/courses" className="bg-[#483C5C] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#3D2F4A] transition-colors shadow-lg text-sm">
                        <Plus size={16} /> Add Course
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Courses</p>
                        <h3 className="text-2xl font-bold text-gray-900">{courses.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
                        <GraduationCap size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Instructors</p>
                        <h3 className="text-2xl font-bold text-gray-900">{teachers.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                        <Briefcase size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Portfolio Items</p>
                        <h3 className="text-2xl font-bold text-gray-900">{portfolio.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-lg text-green-600">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Students</p>
                        <h3 className="text-2xl font-bold text-gray-900">-</h3>
                    </div>
                </div>
            </div>

            {/* Recent Activity or detailed lists could go here, but strictly separated in tabs for now */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Quick Navigation</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/admin/courses" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 text-center transition-colors">
                        <span className="font-bold text-[#483C5C]">Manage Courses</span>
                    </Link>
                    <Link href="/admin/teachers" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 text-center transition-colors">
                        <span className="font-bold text-[#483C5C]">Manage Instructors</span>
                    </Link>
                    <Link href="/admin/portfolio" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 text-center transition-colors">
                        <span className="font-bold text-[#483C5C]">Manage Portfolio</span>
                    </Link>
                    <Link href="/admin/settings" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 text-center transition-colors">
                        <span className="font-bold text-[#483C5C]">Settings</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
