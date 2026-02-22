'use client';

import React, { useState, useEffect } from 'react';
import { createCourse, updateCourse, uploadImage, uploadVideo, getTeachers } from '@/lib/api/endpoints';
import { X, Plus, Trash, GripVertical, Upload, ImageIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CourseManagerProps {
    course?: any;
    onClose?: () => void;
}

const CourseManager: React.FC<CourseManagerProps> = ({ course, onClose }) => {
    const router = useRouter();

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [expandedModule, setExpandedModule] = useState<number | null>(0);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        tag: '',
        duration: '',
        level: 'Beginner',
        price: 0,
        originalPrice: 0,
        tags: '',
        learningPoints: '',
        requirements: '',
        instructor: '',
        modules: [] as any[]
    });

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const { data } = await getTeachers();
                setTeachers(data);
                if (!course && data.length > 0) {
                    setFormData(prev => ({ ...prev, instructor: data[0]._id }));
                }
            } catch (err) {
                console.error('Failed to fetch teachers', err);
            }
        };
        fetchTeachers();

        if (course) {
            setFormData({
                ...course,
                tags: Array.isArray(course.tags) ? course.tags.join(', ') : '',
                learningPoints: Array.isArray(course.learningPoints) ? course.learningPoints.join(', ') : '',
                requirements: Array.isArray(course.requirements) ? course.requirements.join(', ') : '',
                instructor: course.instructor?._id || course.instructor || '',
                modules: course.modules || []
            });
        }
    }, [course]);

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            router.push('/admin');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = formData.image;

            if (imageFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('image', imageFile);
                const { data } = await uploadImage(uploadFormData);
                imageUrl = data.url;
            }

            const dataToSubmit = {
                ...formData,
                image: imageUrl,
                tags: formData.tags.split(',').map((t: string) => t.trim()).filter(t => t !== ''),
                learningPoints: formData.learningPoints.split(',').map((t: string) => t.trim()).filter(t => t !== ''),
                requirements: formData.requirements.split(',').map((t: string) => t.trim()).filter(t => t !== ''),
            };

            if (course) {
                await updateCourse(course._id, dataToSubmit);
            } else {
                await createCourse(dataToSubmit);
            }
            handleClose();
        } catch (error) {
            console.error('Error saving course:', error);
            alert('Failed to save course');
        } finally {
            setUploading(false);
        }
    };

    const addModule = () => {
        setFormData(prev => ({
            ...prev,
            modules: [...prev.modules, { title: 'New Module', lessons: [] }]
        }));
        setExpandedModule(formData.modules.length);
    };

    const updateModuleTitle = (mIndex: number, title: string) => {
        const newModules = [...formData.modules];
        newModules[mIndex].title = title;
        setFormData(prev => ({ ...prev, modules: newModules }));
    };

    const removeModule = (mIndex: number) => {
        setFormData(prev => ({
            ...prev,
            modules: prev.modules.filter((_: any, i: number) => i !== mIndex)
        }));
    };

    const addLesson = (mIndex: number) => {
        const newModules = [...formData.modules];
        newModules[mIndex].lessons.push({
            title: '', type: 'video', videoUrl: '', textContent: '', duration: 0, freePreview: false
        });
        setFormData(prev => ({ ...prev, modules: newModules }));
    };

    const updateLesson = (mIndex: number, lIndex: number, field: string, value: any) => {
        const newModules = [...formData.modules];
        newModules[mIndex].lessons[lIndex] = { ...newModules[mIndex].lessons[lIndex], [field]: value };
        setFormData(prev => ({ ...prev, modules: newModules }));
    };

    const removeLesson = (mIndex: number, lIndex: number) => {
        const newModules = [...formData.modules];
        newModules[mIndex].lessons = newModules[mIndex].lessons.filter((_: any, i: number) => i !== lIndex);
        setFormData(prev => ({ ...prev, modules: newModules }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 overflow-y-auto pt-20 px-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl mx-auto mb-20 shadow-2xl relative overflow-hidden">
                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Course Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Course Image</label>
                            <div className="flex items-center gap-4">
                                <div className="w-full h-48 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden text-[#483C5C]">
                                    {imageFile || formData.image ? (
                                        <img
                                            src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <ImageIcon size={48} className="opacity-20" />
                                    )}
                                </div>
                            </div>
                            <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors w-full">
                                <Upload size={18} className="text-[#483C5C]" />
                                <span className="text-sm font-bold text-gray-700">Change Cover Image</span>
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

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Instructor</label>
                                <select
                                    value={formData.instructor}
                                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                >
                                    {teachers.map((t: any) => (
                                        <option key={t._id} value={t._id}>{t.name}</option>
                                    ))}
                                    {teachers.length === 0 && <option value="">No instructors found</option>}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Course Tag</label>
                                <input
                                    type="text"
                                    value={formData.tag}
                                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                    placeholder="Featured, New, Bestseller"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Level</label>
                                <select
                                    value={formData.level}
                                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Beginner to Advanced">Beginner to Advanced</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Duration</label>
                                <input
                                    type="text"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                    placeholder="12 Weeks, 6h 20m"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Original Price ($)</label>
                                    <input
                                        type="number"
                                        value={formData.originalPrice}
                                        onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                rows={3}
                                required
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Learning Points (comma separated)</label>
                            <textarea
                                value={formData.learningPoints}
                                onChange={(e) => setFormData({ ...formData, learningPoints: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                rows={2}
                                placeholder="Master HTML5, Learn CSS Grid, Build React Apps..."
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Requirements (comma separated)</label>
                            <textarea
                                value={formData.requirements}
                                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                rows={2}
                                placeholder="Basic computer skills, Internet connection..."
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                placeholder="Design, Coding, Marketing"
                            />
                        </div>
                    </div>

                    {/* Modules Section */}
                    <div className="border-t border-gray-100 pt-8">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Course Curriculum</h3>
                                <p className="text-sm text-gray-500">Group your lessons into modules/sections</p>
                            </div>
                            <button
                                type="button"
                                onClick={addModule}
                                className="bg-[#483C5C] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#3D2F4A] transition-colors flex items-center gap-2 shadow-lg"
                            >
                                <Plus size={18} />
                                Add Section
                            </button>
                        </div>

                        <div className="space-y-6">
                            {formData.modules.map((module, mIndex) => (
                                <div key={mIndex} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                    <div className="bg-gray-50 px-6 py-4 flex justify-between items-center cursor-pointer border-b border-gray-200"
                                        onClick={() => setExpandedModule(expandedModule === mIndex ? null : mIndex)}
                                    >
                                        <div className="flex items-center gap-4 flex-1 mr-4">
                                            <GripVertical size={18} className="text-gray-400" />
                                            <input
                                                type="text"
                                                value={module.title}
                                                onChange={(e) => updateModuleTitle(mIndex, e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="bg-transparent font-bold text-gray-800 focus:outline-none border-b border-transparent focus:border-[#483C5C] px-1"
                                            />
                                            <span className="text-xs font-bold text-gray-400 bg-gray-200 px-2 py-0.5 rounded">
                                                {module.lessons.length} LESSONS
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); removeModule(mIndex); }}
                                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash size={18} />
                                            </button>
                                            {expandedModule === mIndex ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </div>
                                    </div>

                                    {expandedModule === mIndex && (
                                        <div className="p-6 space-y-4 bg-white">
                                            {module.lessons.map((lesson: any, lIndex: number) => (
                                                <div key={lIndex} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] uppercase font-bold text-gray-400">Lesson Title</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Lesson Title"
                                                                value={lesson.title}
                                                                onChange={(e) => updateLesson(mIndex, lIndex, 'title', e.target.value)}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#483C5C] text-sm"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] uppercase font-bold text-gray-400">Type</label>
                                                            <select
                                                                value={lesson.type}
                                                                onChange={(e) => updateLesson(mIndex, lIndex, 'type', e.target.value)}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#483C5C] text-sm"
                                                            >
                                                                <option value="video">Video</option>
                                                                <option value="text">Text/Article</option>
                                                                <option value="quiz">Quiz</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {lesson.type === 'video' ? (
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] uppercase font-bold text-gray-400">Video Content</label>
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Video URL"
                                                                    value={lesson.videoUrl || ''}
                                                                    onChange={(e) => updateLesson(mIndex, lIndex, 'videoUrl', e.target.value)}
                                                                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#483C5C] text-sm"
                                                                />
                                                                <label className="flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors">
                                                                    <Upload size={14} />
                                                                    <span className="text-xs font-bold">Upload</span>
                                                                    <input
                                                                        type="file"
                                                                        className="hidden"
                                                                        accept="video/*"
                                                                        onChange={async (e) => {
                                                                            const file = e.target.files?.[0];
                                                                            if (file) {
                                                                                try {
                                                                                    const uploadFormData = new FormData();
                                                                                    uploadFormData.append('video', file);
                                                                                    const { data } = await uploadVideo(uploadFormData);
                                                                                    const videoUrl = data.url;
                                                                                    updateLesson(mIndex, lIndex, 'videoUrl', videoUrl);
                                                                                } catch (err) {
                                                                                    alert('Video upload failed');
                                                                                }
                                                                            }
                                                                        }}
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    ) : lesson.type === 'text' ? (
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] uppercase font-bold text-gray-400">Article Content</label>
                                                            <textarea
                                                                placeholder="Lesson text content..."
                                                                value={lesson.textContent || ''}
                                                                onChange={(e) => updateLesson(mIndex, lIndex, 'textContent', e.target.value)}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#483C5C] text-sm"
                                                                rows={3}
                                                            />
                                                        </div>
                                                    ) : null}

                                                    <div className="flex justify-between items-center">
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={lesson.freePreview}
                                                                onChange={(e) => updateLesson(mIndex, lIndex, 'freePreview', e.target.checked)}
                                                                className="w-4 h-4 text-[#483C5C] rounded focus:ring-[#483C5C]"
                                                            />
                                                            <span className="text-xs font-medium text-gray-600">Free Preview</span>
                                                        </label>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeLesson(mIndex, lIndex)}
                                                            className="text-red-400 hover:text-red-600 text-xs font-bold flex items-center gap-1"
                                                        >
                                                            <Trash size={12} /> Remove Lesson
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => addLesson(mIndex)}
                                                className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-[#483C5C] hover:border-[#483C5C] transition-all flex items-center justify-center gap-2 font-bold text-sm"
                                            >
                                                <Plus size={16} /> Add Lesson to Section
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {formData.modules.length === 0 && (
                                <p className="text-center text-gray-500 py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 font-medium italic">
                                    Your course has no sections yet. Click "Add Section" to start building your curriculum.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6 mt-8 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-8 py-4 text-gray-700 font-bold hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="bg-[#483C5C] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#3D2F4A] transition-colors shadow-lg disabled:opacity-50 min-w-[200px] text-lg"
                        >
                            {uploading ? 'Saving Progress...' : (course ? 'Update Course' : 'Launch Course')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseManager;
