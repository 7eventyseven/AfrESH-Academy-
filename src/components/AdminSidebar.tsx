'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard, BookOpen, Users, Settings,
    LogOut, Briefcase
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        localStorage.removeItem('userInfo');
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch {
            // Ignore logout errors
        }
        router.push('/');
        // Force reload to clear state if needed, or rely on state update
        // window.location.href = '/'; // might be better for full clear
    };

    const menuItems = [
        { title: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
        { title: 'Manage Courses', icon: <BookOpen size={20} />, href: '/admin/courses' },
        { title: 'Portfolio', icon: <Briefcase size={20} />, href: '/admin/portfolio' },
        { title: 'Instructors', icon: <Users size={20} />, href: '/admin/teachers' },
        { title: 'Students', icon: <Users size={20} />, href: '/admin/students' },
        { title: 'Settings', icon: <Settings size={20} />, href: '/admin/settings' },
    ];

    return (
        <aside className="w-64 bg-white min-h-screen flex flex-col fixed left-0 top-0 z-40 border-r border-gray-100 font-sans">
            {/* Branding */}
            {/* Branding */}
            <div className="h-20 flex items-center gap-3 px-8 border-b border-gray-100">
                <div className="bg-[#483C5C] p-2 rounded-lg">
                    <span className="text-white text-xs font-black tracking-tighter">afr</span>
                </div>
                <span className="text-xl font-bold text-gray-800 tracking-tight">AfRESH <span className="text-[#483C5C]">Admin</span></span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 mt-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-none border-l-4 transition-all duration-200 group mb-1 ${isActive
                                    ? 'border-[#483C5C] bg-gray-50 text-[#483C5C]'
                                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <span className={`${isActive ? 'text-[#483C5C]' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                {item.icon}
                            </span>
                            <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all rounded-lg"
                >
                    <LogOut size={20} className="text-gray-400 group-hover:text-gray-600" />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
