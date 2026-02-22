'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Award, Clock, GraduationCap, Bell } from 'lucide-react';
import { getMyEnrollments, getMyCertificates } from '@/lib/api/endpoints';

const DashboardOverview = () => {
    const [user, setUser] = useState<any>(null);
    const [enrollments, setEnrollments] = useState<any[]>([]);
    const [certificates, setCertificates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = localStorage.getItem('userInfo');
                if (userInfo) {
                    setUser(JSON.parse(userInfo));
                }

                const [enrollmentsRes, certificatesRes] = await Promise.all([
                    getMyEnrollments(),
                    getMyCertificates()
                ]);
                setEnrollments(enrollmentsRes.data);
                setCertificates(certificatesRes.data);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
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
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome back, {user?.name}! 👋</h1>
                    <p className="text-gray-500 text-sm sm:text-base">Track your progress and continue your learning journey.</p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                    <button className="p-2 bg-white rounded-lg shadow-sm text-gray-400 hover:text-[#483C5C]">
                        <Bell size={20} />
                    </button>
                    <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                            {user?.name?.charAt(0)}
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">{user?.role}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Enrolled Courses', value: enrollments.length, icon: <BookOpen />, color: 'bg-blue-500' },
                    { label: 'Certificates Earned', value: certificates.length, icon: <Award />, color: 'bg-green-500' },
                    { label: 'Hours Learned', value: '24h', icon: <Clock />, color: 'bg-orange-500' },
                    { label: 'Active Streak', value: '5 days', icon: <GraduationCap />, color: 'bg-purple-500' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className={`${stat.color} p-3 rounded-xl text-white`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <h3 className="text-xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity / Quick Actions could go here */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="/dashboard/courses" className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 flex items-center gap-3 transition-all">
                        <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><BookOpen size={20} /></div>
                        <div>
                            <h3 className="font-bold text-gray-900">Resume Learning</h3>
                            <p className="text-xs text-gray-500">Continue your last course</p>
                        </div>
                    </a>
                    {/* Add more quick actions if needed */}
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
