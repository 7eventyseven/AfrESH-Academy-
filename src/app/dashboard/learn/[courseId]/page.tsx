'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    PlayCircle, CheckCircle, ChevronLeft, ChevronRight,
    Settings, LogOut, CheckCircle2, Layout, FileText
} from 'lucide-react';
import Link from 'next/link';
import { getCourseById, updateLessonProgress, getMyEnrollments } from '@/lib/api/endpoints';

export default function LessonPlayerPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;

    const [course, setCourse] = useState<any>(null);
    const [enrollment, setEnrollment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeModuleIndex, setActiveModuleIndex] = useState(0);
    const [activeLessonIndex, setActiveLessonIndex] = useState(0);

    // Initial fetch
    useEffect(() => {
        const fetchData = async () => {
            if (!courseId) return;
            try {
                const [courseRes, enrollmentsRes] = await Promise.all([
                    getCourseById(courseId),
                    getMyEnrollments()
                ]);

                setCourse(courseRes.data);

                // Find specific enrollment for this course
                const myEnrollment = enrollmentsRes.data.find((e: any) =>
                    e.course?._id === courseId || e.course === courseId
                );

                if (myEnrollment) {
                    setEnrollment(myEnrollment);
                    // TODO: Restore last watched lesson from enrollment progress
                }
            } catch (error) {
                console.error('Failed to load course/enrollment', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId]);

    const activeModule = course?.modules?.[activeModuleIndex];
    const activeLesson = activeModule?.lessons?.[activeLessonIndex];

    const handleLessonChange = (mIndex: number, lIndex: number) => {
        setActiveModuleIndex(mIndex);
        setActiveLessonIndex(lIndex);
    };

    const handleMarkComplete = async () => {
        if (!activeLesson || !activeModule) return;

        // Optimistically update UI
        // In a real app, we'd update local state to show checkmark
        try {
            await updateLessonProgress(courseId, activeLesson._id || activeLesson.id, true, 100);
            // Refresh enrollment data or update local state
            alert('Lesson marked as complete!');
        } catch (error) {
            console.error('Failed to update progress', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
            </div>
        );
    }

    if (!course) {
        return <div className="text-white p-10">Course not found</div>;
    }

    const userInfo =
        typeof window !== 'undefined' ? localStorage.getItem('userInfo') : null;
    const userRole = userInfo ? JSON.parse(userInfo).role : null;

    if (!enrollment && userRole !== 'admin') {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
                <div className="max-w-lg text-center space-y-4">
                    <h2 className="text-2xl font-bold">Enrollment Required</h2>
                    <p className="text-gray-400">
                        You need to enroll in this course to access the lessons.
                    </p>
                    <Link
                        href={`/enroll?id=${courseId}`}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 font-bold"
                    >
                        Go to Enrollment
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden">
            {/* Top Bar */}
            <header className="h-16 border-b border-gray-800 bg-gray-900 flex items-center px-4 justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/courses" className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white">
                        <ChevronLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="font-bold text-sm md:text-base line-clamp-1">{course.title}</h1>
                        <p className="text-xs text-gray-400 hidden md:block">
                            {activeModule?.title || 'Course Intro'} - {activeLesson?.title || 'Welcome'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-300 bg-gray-800 px-3 py-1.5 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>{enrollment ? `${enrollment.progress}% Complete` : '0%'}</span>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Main Content (Player) */}
                <main className="flex-1 flex flex-col bg-black overflow-y-auto">
                    <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-black">
                        {activeLesson ? (
                            <div className="w-full max-w-4xl aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-2xl relative group">
                                {/* Placeholder for Video Player */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle size={64} className="text-white/20 group-hover:text-violet-500 transition-colors" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <p className="text-white font-medium">{activeLesson.title}</p>
                                </div>
                                {/* If we had a real video URL: <video src={activeLesson.videoUrl} controls className="w-full h-full" /> */}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500">Select a lesson to start watching</div>
                        )}
                    </div>

                    {/* Lesson Controls */}
                    <div className="border-t border-gray-800 bg-gray-900 p-4 flex justify-between items-center shrink-0">
                        <button
                            className="text-gray-400 hover:text-white flex items-center gap-2 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
                        // disabled={isFirstLesson}
                        >
                            <ChevronLeft size={20} /> Previous
                        </button>

                        <button
                            onClick={handleMarkComplete}
                            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
                        >
                            Mark Complete <CheckCircle size={18} />
                        </button>

                        <button
                            className="text-gray-400 hover:text-white flex items-center gap-2 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
                        // disabled={isLastLesson}
                        >
                            Next <ChevronRight size={20} />
                        </button>
                    </div>
                </main>

                {/* Sidebar (Curriculum) */}
                <aside className="w-80 md:w-96 border-l border-gray-800 bg-gray-900 flex flex-col shrink-0 hidden lg:flex">
                    <div className="p-4 border-b border-gray-800">
                        <h2 className="font-bold text-lg">Course Content</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {course.modules?.map((module: any, mIdx: number) => (
                            <div key={module._id || mIdx} className="border-b border-gray-800">
                                <div className="p-4 bg-gray-800/50 flex justify-between items-center">
                                    <h3 className="font-bold text-sm text-gray-300 line-clamp-1">{module.title}</h3>
                                    <span className="text-xs text-gray-500">{module.lessons?.length || 0} lessons</span>
                                </div>
                                <div>
                                    {module.lessons?.map((lesson: any, lIdx: number) => {
                                        const isActive = mIdx === activeModuleIndex && lIdx === activeLessonIndex;
                                        return (
                                            <button
                                                key={lesson._id || lIdx}
                                                onClick={() => handleLessonChange(mIdx, lIdx)}
                                                className={`w-full text-left p-4 flex items-start gap-3 hover:bg-gray-800 transition-colors ${isActive ? 'bg-gray-800 border-l-2 border-violet-500' : ''
                                                    }`}
                                            >
                                                <div className={`mt-0.5 ${isActive ? 'text-violet-500' : 'text-gray-500'}`}>
                                                    {isActive ? <PlayCircle size={16} /> : <div className="w-4 h-4 rounded-full border border-gray-600" />}
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                                        {lesson.title}
                                                    </p>
                                                    <p className="text-xs text-gray-600 mt-1">{lesson.duration} min</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}
