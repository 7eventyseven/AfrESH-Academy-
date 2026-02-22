import React, { useState, useEffect } from 'react';
import {
    BookOpen, Users, Award, Star, Search, Filter,
    ChevronRight, Play, CheckCircle, Clock, Layout,
    Settings, LogOut, GraduationCap, Bell, User, Download, ExternalLink, Info
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyEnrollments, getUserProfile, getMyCertificates } from '../api/endpoints';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [enrollments, setEnrollments] = useState<any[]>([]);
    const [certificates, setCertificates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('courses');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = localStorage.getItem('userInfo');
                if (!userInfo) {
                    navigate('/login');
                    return;
                }
                setUser(JSON.parse(userInfo));

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
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
        window.location.reload();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#483C5C]"></div>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'courses':
                return (
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Continuing Learning</h2>
                            <Link to="/courses" className="text-[#483C5C] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                Browse More Courses <ChevronRight size={16} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {enrollments.length === 0 ? (
                                <div className="col-span-full bg-white p-12 rounded-3xl text-center border-2 border-dashed border-gray-200">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <BookOpen className="text-gray-300" size={40} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">No active enrollments</h3>
                                    <p className="text-gray-500 mb-6">You haven't enrolled in any courses yet. Start your journey today!</p>
                                    <Link to="/courses" className="bg-[#483C5C] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#3D2F4A] transition-all inline-block">
                                        Explore Courses
                                    </Link>
                                </div>
                            ) : (
                                enrollments.map((enrollment) => (
                                    <div key={enrollment._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                                        <div className="h-40 relative">
                                            <img
                                                src={enrollment.course?.image}
                                                alt={enrollment.course?.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="bg-white text-[#483C5C] p-3 rounded-full shadow-lg">
                                                    <Play size={24} fill="currentColor" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-widest font-bold">
                                                <span className="text-orange-500">{enrollment.course?.level}</span>
                                                <span className="text-gray-400">Progress: {enrollment.progress}%</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-1">{enrollment.course?.title}</h3>

                                            <div className="w-full h-2 bg-gray-100 rounded-full mb-6 relative overflow-hidden">
                                                <div
                                                    className="absolute top-0 left-0 h-full bg-[#483C5C] transition-all duration-1000"
                                                    style={{ width: `${enrollment.progress}%` }}
                                                ></div>
                                            </div>

                                            <button className="w-full py-3 rounded-xl border-2 border-[#483C5C] text-[#483C5C] font-bold text-sm hover:bg-[#483C5C] hover:text-white transition-all">
                                                Resume Learning
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                );
            case 'certificates':
                return (
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Your Certificates</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {certificates.length === 0 ? (
                                <div className="col-span-full bg-white p-12 rounded-3xl text-center border-2 border-dashed border-gray-200">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Award className="text-gray-300" size={40} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">No certificates earned yet</h3>
                                    <p className="text-gray-500 mb-6">Complete a course 100% to earn your professional certification.</p>
                                </div>
                            ) : (
                                certificates.map((cert) => (
                                    <div key={cert._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center group hover:shadow-md transition-all">
                                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
                                            <Award size={32} />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{cert.course?.title}</h3>
                                        <p className="text-sm text-gray-500 mb-4">Issued on {new Date(cert.issueDate).toLocaleDateString()}</p>
                                        <div className="text-xs font-mono text-gray-400 mb-6">ID: {cert.certificateNumber}</div>

                                        <div className="flex gap-3 w-full mt-auto">
                                            <button className="flex-1 py-3 rounded-xl bg-[#483C5C] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#3D2F4A] transition-all">
                                                <Download size={14} /> Download
                                            </button>
                                            <button className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all">
                                                <ExternalLink size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                );
            case 'discover':
            case 'settings':
                return (
                    <div className="bg-white p-12 rounded-3xl text-center border border-gray-100">
                        <Info className="mx-auto text-gray-300 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
                        <p className="text-gray-500">This section is currently being updated to bring you a better experience. Stay tuned!</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#483C5C] text-white flex flex-col fixed h-full z-40">
                <div className="p-6 flex items-center gap-3 border-b border-white/10">
                    <div className="bg-orange-500 p-1.5 rounded">
                        <span className="text-white text-xs font-black tracking-tighter">afr</span>
                    </div>
                    <span className="text-xl font-bold">Menu</span>
                </div>

                <nav className="flex-1 p-4 mt-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'courses' ? 'bg-orange-500 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                    >
                        <Layout size={20} />
                        <span className="font-medium">My Courses</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('discover')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'discover' ? 'bg-orange-500 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                    >
                        <Search size={20} />
                        <span className="font-medium">Discover</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('certificates')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'certificates' ? 'bg-orange-500 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                    >
                        <Award size={20} />
                        <span className="font-medium">Certificates</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'settings' ? 'bg-orange-500 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                    >
                        <Settings size={20} />
                        <span className="font-medium">Settings</span>
                    </button>
                </nav>

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

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}! 👋</h1>
                        <p className="text-gray-500">Track your progress and continue your learning journey.</p>
                    </div>
                    <div className="flex items-center gap-4">
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

                {renderContent()}
            </main>
        </div>
    );
};

export default Dashboard;
