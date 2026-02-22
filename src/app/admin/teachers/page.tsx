'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, User } from 'lucide-react';
import { getTeachers, deleteTeacher } from '@/lib/api/endpoints';
import TeacherManager from '@/components/pages/Admin/TeacherManager';

export default function AdminTeachersPage() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showManager, setShowManager] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const fetchTeachers = async () => {
        try {
            const { data } = await getTeachers();
            setTeachers(data);
        } catch (error) {
            console.error('Failed to fetch teachers', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

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

    const handleEditTeacher = (teacher: any) => {
        setSelectedTeacher(teacher);
        setShowManager(true);
    };

    const handleCreateTeacher = () => {
        setSelectedTeacher(null);
        setShowManager(true);
    };

    if (showManager) {
        return (
            <TeacherManager
                teacher={selectedTeacher}
                onClose={() => {
                    setShowManager(false);
                    fetchTeachers();
                }}
            />
        );
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Instructors</h2>
                <button
                    onClick={handleCreateTeacher}
                    className="bg-[#483C5C] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#3D2F4A] transition-colors text-sm"
                >
                    <Plus size={16} /> Add New Instructor
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Instructor</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Specialization</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {teachers.map((teacher: any) => (
                            <tr key={teacher._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                                            {teacher.avatar ? (
                                                <img className="h-full w-full object-cover" src={teacher.avatar} alt="" />
                                            ) : (
                                                <User size={20} className="text-gray-400" />
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-bold text-gray-900">{teacher.name}</div>
                                            <div className="text-xs text-gray-500">{teacher.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {teacher.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {Array.isArray(teacher.specialization) ? teacher.specialization.join(', ') : teacher.specialization}
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
    );
}
