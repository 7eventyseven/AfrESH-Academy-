import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, getAllEnrollments, issueCertificate } from '../../api/endpoints';
import { Trash, User, Mail, Shield, Calendar, BookOpen, Award, CheckCircle } from 'lucide-react';

const StudentsManagement: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [enrollments, setEnrollments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeView, setActiveView] = useState<'users' | 'enrollments'>('users');

    const fetchData = async () => {
        try {
            setLoading(true);
            const [usersRes, enrollmentsRes] = await Promise.all([
                getUsers(),
                getAllEnrollments()
            ]);
            setUsers(usersRes.data);
            setEnrollments(enrollmentsRes.data);
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteUser = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await deleteUser(id);
                fetchData();
            } catch (error) {
                console.error('Failed to delete user', error);
                alert('Failed to delete user');
            }
        }
    };

    const handleIssueCertificate = async (enrollmentId: string) => {
        try {
            await issueCertificate(enrollmentId);
            alert('Certificate issued successfully!');
            fetchData();
        } catch (error: any) {
            console.error('Failed to issue certificate', error);
            alert(error.response?.data?.message || 'Failed to issue certificate');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#483C5C]"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
                        <p className="text-gray-600 mt-2">View and manage students, progress, and certifications</p>
                    </div>

                    <div className="flex bg-gray-100 p-1 rounded-lg self-start">
                        <button
                            onClick={() => setActiveView('users')}
                            className={`px-4 py-2 rounded-md font-medium transition-all ${activeView === 'users' ? 'bg-white text-[#483C5C] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Registered Users
                        </button>
                        <button
                            onClick={() => setActiveView('enrollments')}
                            className={`px-4 py-2 rounded-md font-medium transition-all ${activeView === 'enrollments' ? 'bg-white text-[#483C5C] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Enrollments & Progress
                        </button>
                    </div>
                </div>

                {activeView === 'users' ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Registered Users ({users.length})</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined At</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users.map((user: any) => (
                                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-bold text-gray-900">{user.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {user.role !== 'admin' && (
                                                    <button onClick={() => handleDeleteUser(user._id)} className="text-red-500 hover:text-red-700">
                                                        <Trash size={18} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                                                No users found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Enrollment List ({enrollments.length})</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Course</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Enrolled</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {enrollments.map((enrollment: any) => (
                                        <tr key={enrollment._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-gray-900">{enrollment.student?.name}</div>
                                                <div className="text-xs text-gray-500">{enrollment.student?.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 font-medium">{enrollment.course?.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-orange-500" style={{ width: `${enrollment.progress}%` }}></div>
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-700">{enrollment.progress}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleIssueCertificate(enrollment._id)}
                                                    disabled={enrollment.progress < 100}
                                                    className={`flex items-center gap-1 ml-auto px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${enrollment.progress >= 100
                                                        ? 'bg-[#483C5C] text-white hover:bg-[#3D2F4A]'
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                                                    title={enrollment.progress < 100 ? "Course must be 100% complete" : "Issue Certificate"}
                                                >
                                                    <Award size={14} />
                                                    Issue Certificate
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {enrollments.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                                                No enrollments found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentsManagement;
