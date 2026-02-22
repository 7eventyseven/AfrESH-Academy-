'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Layout, BookOpen, BarChart2, FileText, CreditCard, User, LogOut, Menu, X
} from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(userInfo));
    }, [router]);

    const handleLogout = async () => {
        localStorage.removeItem('userInfo');
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch {
            // Ignore logout errors
        }
        router.push('/');
    };

    const menuItems = [
        { title: 'Dashboard', icon: <Layout size={20} />, href: '/dashboard' },
        { title: 'My Course', icon: <BookOpen size={20} />, href: '/dashboard/courses' },
        { title: 'Progress', icon: <BarChart2 size={20} />, href: '/dashboard/progress' },
        { title: 'Materials', icon: <FileText size={20} />, href: '/dashboard/materials' },
        { title: 'Payments', icon: <CreditCard size={20} />, href: '/dashboard/payments' },
        { title: 'Profile', icon: <User size={20} />, href: '/dashboard/profile' },
    ];

    if (!user) return null; // Or a loading spinner

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile Menu Button */}
            <button
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-[#483C5C] text-white rounded-lg shadow-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside className={`
                w-64 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 left-0 z-40 transition-transform duration-300 md:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-gray-50">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-gray-900">AfRESH Academy</h1>
                        <p className="text-xs text-blue-500 font-medium mt-1">Student Portal</p>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-none border-l-4 transition-all duration-200 group mb-1 ${isActive
                                        ? 'border-[#8B5CF6] bg-gray-50 text-[#8B5CF6]'
                                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <span className={`${isActive ? 'text-[#8B5CF6]' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                    {item.icon}
                                </span>
                                <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-50">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 min-h-screen transition-all duration-300">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
