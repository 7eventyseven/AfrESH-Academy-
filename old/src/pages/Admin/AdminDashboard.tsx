import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCourses, deleteCourse, getPortfolio, deletePortfolio, getTeachers, deleteTeacher } from '../../api/endpoints';
import { Plus, Edit, Trash, BookOpen, Users, Briefcase, GraduationCap } from 'lucide-react';
import CourseManager from './CourseManager';
import PortfolioManager from './PortfolioManager';
import TeacherManager from './TeacherManager';

const AdminDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [showCourseManager, setShowCourseManager] = useState(false);
    const [showPortfolioManager, setShowPortfolioManager] = useState(false);
    const [showTeacherManager, setShowTeacherManager] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [activeTab, setActiveTab] = useState('courses');

    // Sync activeTab with URL path
    useEffect(() => {
        if (location.pathname === '/admin/teachers') {
            setActiveTab('teachers');
        } else if (location.pathname === '/admin/portfolio') {
            setActiveTab('portfolio');
        } else {
            setActiveTab('courses');
        }
    }, [location.pathname]);

    const fetchCourses = async () => {
        try {
            const { data } = await getCourses();
            setCourses(data);
        } catch (error) {
            console.error('Failed to fetch courses', error);
        }
    };

    const fetchPortfolio = async () => {
        try {
            const { data } = await getPortfolio();
            setPortfolio(data);
        } catch (error) {
            console.error('Failed to fetch portfolio', error);
        }
    };

    const fetchTeachers = async () => {
        try {
            const { data } = await getTeachers();
            setTeachers(data);
        } catch (error) {
            console.error('Failed to fetch teachers', error);
        }
    };

    useEffect(() => {
        fetchCourses();
        fetchPortfolio();
        fetchTeachers();
    }, []);

    const handleDeleteCourse = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await deleteCourse(id);
                fetchCourses();
            } catch (error) {
                console.error('Failed to delete course', error);
            }
        }
    };

    const handleDeletePortfolio = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this portfolio item?')) {
            try {
                await deletePortfolio(id);
                fetchPortfolio();
            } catch (error) {
                console.error('Failed to delete portfolio item', error);
            }
        }
    };

    const handleDeleteTeacher = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this instructor?')) {
            try {
                await deleteTeacher(id);
                fetchTeachers();
            } catch (error) {
                console.error('Failed to delete teacher', error);
            }
        }
    };

    const handleEditCourse = (course: any) => {
        setSelectedCourse(course);
        setShowCourseManager(true);
    };

    const handleEditPortfolio = (item: any) => {
        setSelectedPortfolio(item);
        setShowPortfolioManager(true);
    };

    const handleEditTeacher = (teacher: any) => {
        setSelectedTeacher(teacher);
        setShowTeacherManager(true);
    };

    const handleCreateCourse = () => {
        setSelectedCourse(null);
        setShowCourseManager(true);
    };

    const handleCreatePortfolio = () => {
        setSelectedPortfolio(null);
        setShowPortfolioManager(true);
    };

    const handleCreateTeacher = () => {
        setSelectedTeacher(null);
        setShowTeacherManager(true);
    };

    if (showCourseManager) {
        return (
            <CourseManager
                course={selectedCourse}
                onClose={() => {
                    setShowCourseManager(false);
                    fetchCourses();
                }}
            />
        );
    }

    if (showPortfolioManager) {
        return (
            <PortfolioManager
                portfolio={selectedPortfolio}
                onClose={() => {
                    setShowPortfolioManager(false);
                    fetchPortfolio();
                }}
            />
        );
    }

    if (showTeacherManager) {
        return (
            <TeacherManager
                teacher={selectedTeacher}
                onClose={() => {
                    setShowTeacherManager(false);
                    fetchTeachers();
                }}
            />
        );
    }

    const handleAddClick = () => {
        if (activeTab === 'courses') handleCreateCourse();
        else if (activeTab === 'portfolio') handleCreatePortfolio();
        else if (activeTab === 'teachers') handleCreateTeacher();
    };

    const getAddButtonText = () => {
        if (activeTab === 'courses') return 'Add New Course';
        if (activeTab === 'portfolio') return 'Add New Portfolio Item';
        if (activeTab === 'teachers') return 'Add New Instructor';
        return 'Add New';
    };

    return (
        <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-600 mt-2">Manage courses, instructors, and portfolio</p>
                    </div>
                    <button
                        onClick={handleAddClick}
                        className="bg-[#483C5C] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#3D2F4A] transition-colors shadow-lg"
                    >
                        <Plus size={20} />
                        {getAddButtonText()}
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
                    <button
                        onClick={() => navigate('/admin/courses')}
                        className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'courses'
                                ? 'bg-white text-[#483C5C] shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Courses
                    </button>
                    <button
                        onClick={() => navigate('/admin/teachers')}
                        className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'teachers'
                                ? 'bg-white text-[#483C5C] shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Instructors
                    </button>
                    <button
                        onClick={() => navigate('/admin/portfolio')}
                        className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'portfolio'
                                ? 'bg-white text-[#483C5C] shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Portfolio
                    </button>
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

                {/* Content based on active tab */}
                {activeTab === 'courses' ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Courses</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Course</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Level</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {courses.map((course: any) => (
                                        <tr key={course._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <img className="h-10 w-10 rounded-lg object-cover" src={course.image} alt="" />
                                                    <div className="ml-4">
                                                        <div className="text-sm font-bold text-gray-900">{course.title}</div>
                                                        <div className="text-sm text-gray-500">{course.modules?.length || 0} modules</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                                                        course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'}`}>
                                                    {course.level}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ${course.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => handleEditCourse(course)} className="text-[#483C5C] hover:text-[#3D2F4A] mr-4">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => handleDeleteCourse(course._id)} className="text-red-500 hover:text-red-700">
                                                    <Trash size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : activeTab === 'teachers' ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Instructors</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Instructor</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {teachers.map((teacher: any) => (
                                        <tr key={teacher._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <img className="h-10 w-10 rounded-full object-cover" src={teacher.avatar || 'https://via.placeholder.com/40'} alt="" />
                                                    <div className="ml-4">
                                                        <div className="text-sm font-bold text-gray-900">{teacher.name}</div>
                                                        <div className="text-sm text-gray-500">{teacher.specialization?.join(', ') || 'N/A'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {teacher.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {teacher.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => handleEditTeacher(teacher)} className="text-[#483C5C] hover:text-[#3D2F4A] mr-4">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => handleDeleteTeacher(teacher._id)} className="text-red-500 hover:text-red-700">
                                                    <Trash size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Portfolio Items</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Item</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {portfolio.map((item: any) => (
                                        <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <img className="h-10 w-10 rounded-lg object-cover" src={item.image} alt="" />
                                                    <div className="ml-4">
                                                        <div className="text-sm font-bold text-gray-900">{item.title}</div>
                                                        <div className="text-sm text-gray-500">{item.tags?.length || 0} tags</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => handleEditPortfolio(item)} className="text-[#483C5C] hover:text-[#3D2F4A] mr-4">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => handleDeletePortfolio(item._id)} className="text-red-500 hover:text-red-700">
                                                    <Trash size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
