'use client';

import React, { useState, useEffect } from 'react';
import { getTeachers, createTeacher, updateTeacher, uploadImage } from '@/lib/api/endpoints';
import { X, Plus, Trash, Upload, User, Mail, Briefcase, FileText } from 'lucide-react';

interface TeacherManagerProps {
    teacher?: any;
    onClose: () => void;
}

const TeacherManager: React.FC<TeacherManagerProps> = ({ teacher, onClose }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatar: '',
        title: '',
        bio: '',
        specialization: ''
    });

    useEffect(() => {
        if (teacher) {
            setFormData({
                ...teacher,
                specialization: Array.isArray(teacher.specialization) ? teacher.specialization.join(', ') : ''
            });
        }
    }, [teacher]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            let avatarUrl = formData.avatar;

            if (imageFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('image', imageFile);
                const { data } = await uploadImage(uploadFormData);
                avatarUrl = data.url;
            }

            const dataToSubmit = {
                ...formData,
                avatar: avatarUrl,
                specialization: formData.specialization.split(',').map(s => s.trim()).filter(s => s !== '')
            };

            if (teacher) {
                await updateTeacher(teacher._id, dataToSubmit);
            } else {
                await createTeacher(dataToSubmit);
            }
            onClose();
        } catch (error) {
            console.error('Error saving teacher:', error);
            alert('Failed to save teacher');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 overflow-y-auto pt-20 px-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl mx-auto mb-20 shadow-2xl relative overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {teacher ? 'Edit Instructor' : 'Add New Instructor'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="flex justify-center mb-6">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 bg-gray-50 flex items-center justify-center text-gray-300">
                                {imageFile || formData.avatar ? (
                                    <img
                                        src={imageFile ? URL.createObjectURL(imageFile) : formData.avatar}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User size={64} />
                                )}
                            </div>
                            <label className="absolute bottom-0 right-0 p-2 bg-[#483C5C] text-white rounded-full cursor-pointer hover:bg-[#3D2F4A] transition-colors shadow-lg">
                                <Upload size={18} />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) setImageFile(file);
                                    }}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                <User size={16} className="text-gray-400" /> Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Mail size={16} className="text-gray-400" /> Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Briefcase size={16} className="text-gray-400" /> Professional Title
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. Senior Web Developer"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                required
                            />
                        </div>
                        <div className="space-y-2 text-gray-700">
                            <label className="block text-sm font-medium flex items-center gap-2">
                                <FileText size={16} className="text-gray-400" /> Specializations (comma separated)
                            </label>
                            <input
                                type="text"
                                value={formData.specialization}
                                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                placeholder="e.g. React, UI Design, Python"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                required
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Biography</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                rows={4}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-gray-700 font-bold hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="bg-[#483C5C] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#3D2F4A] transition-colors shadow-lg disabled:opacity-50 min-w-[160px]"
                        >
                            {uploading ? 'Saving...' : (teacher ? 'Update Instructor' : 'Add Instructor')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeacherManager;
