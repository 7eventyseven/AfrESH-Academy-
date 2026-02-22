'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { getCourses, deleteCourse } from '@/lib/api/endpoints';
import CourseManager from '@/components/pages/Admin/CourseManager'; // Reusing existing component for Add/Edit form
// Note: We might need to refactor CourseManager to be just the form, or use it as a modal.
// For now, let's keep the listing here and use CourseManager for the "Add/Edit" action or 
// fully use CourseManager if it handles everything. 
// Checking CourseManager content... it seems to be a Modal.

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showManager, setShowManager] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const fetchCourses = async () => {
        try {
            const { data } = await getCourses();
            setCourses(data);
        } catch (error) {
            console.error('Failed to fetch courses', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
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

    const handleEditCourse = (course: any) => {
        setSelectedCourse(course);
        setShowManager(true);
    };

    const handleCreateCourse = () => {
        setSelectedCourse(null);
        setShowManager(true);
    };

    if (showManager) {
        return (
            <CourseManager
                course={selectedCourse}
                onClose={() => {
                    setShowManager(false);
                    fetchCourses();
                }}
            />
        );
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Courses</h2>
                <button
                    onClick={handleCreateCourse}
                    className="bg-[#483C5C] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#3D2F4A] transition-colors text-sm"
                >
                    <Plus size={16} /> Add New Course
                </button>
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
    );
}
