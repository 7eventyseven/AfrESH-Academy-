import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, BookOpen, Users, Settings,
    LogOut, GraduationCap, ChevronLeft, Briefcase
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
        window.location.reload();
    };

    const menuItems = [
        { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
        { title: 'Manage Courses', icon: <BookOpen size={20} />, path: '/admin/courses' },
        { title: 'Portfolio', icon: <Briefcase size={20} />, path: '/admin/portfolio' },
        { title: 'Instructors', icon: <Users size={20} />, path: '/admin/teachers' },
        { title: 'Students', icon: <Users size={20} />, path: '/admin/students' },
        { title: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
    ];

    return (
        <aside className="w-64 bg-[#483C5C] min-h-screen flex flex-col text-white fixed left-0 top-0 z-40">
            {/* Branding */}
            <div className="p-6 flex items-center gap-3 border-b border-white/10">
                <div className="bg-orange-500 p-1.5 rounded">
                    <span className="text-white text-xs font-black tracking-tighter">afr</span>
                </div>
                <span className="text-xl font-bold">AfRESH Admin</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 mt-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.title}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-orange-500 text-white'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <span className={`${isActive ? 'text-white' : 'text-orange-500 group-hover:text-orange-400'}`}>
                                {item.icon}
                            </span>
                            <span className="font-medium">{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white transition-colors"
                >
                    <LogOut size={20} className="text-orange-500" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
