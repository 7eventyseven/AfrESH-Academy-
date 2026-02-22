'use client';

import React, { useState } from 'react';
import { Save, Globe, Mail, Info, Shield } from 'lucide-react';

const Settings: React.FC = () => {
    const [formData, setFormData] = useState({
        academyName: 'AfRESH Academy',
        contactEmail: 'contact@afresh.com',
        aboutText: 'Empowering the next generation of digital creators and technical experts through high-quality, accessible education.',
        enableRegistration: true,
        maintenanceMode: false
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for settings persistence
        alert('Settings saved successfully! (Note: Persistence will be implemented in the next phase)');
    };

    return (
        <div className="bg-gray-50 pb-12">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 overflow-hidden">
                    <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-600 mt-2">Configure your academy settings and preferences</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* General Settings */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                            <Globe size={20} className="text-[#483C5C]" />
                            <h2 className="text-xl font-bold text-gray-900">General Information</h2>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Academy Name</label>
                                <input
                                    type="text"
                                    value={formData.academyName}
                                    onChange={(e) => setFormData({ ...formData, academyName: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        value={formData.contactEmail}
                                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">About AfRESH Academy</label>
                                <textarea
                                    value={formData.aboutText}
                                    onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>

                    {/* System Settings */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                            <Shield size={20} className="text-[#483C5C]" />
                            <h2 className="text-xl font-bold text-gray-900">System Preferences</h2>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <p className="font-bold text-gray-900">Enable User Registration</p>
                                    <p className="text-sm text-gray-500">Allow new students to sign up</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.enableRegistration}
                                        onChange={(e) => setFormData({ ...formData, enableRegistration: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#483C5C]"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <p className="font-bold text-gray-900">Maintenance Mode</p>
                                    <p className="text-sm text-gray-500">Temporarily disable access to the platform</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.maintenanceMode}
                                        onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#483C5C]"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="bg-[#483C5C] text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#3D2F4A] transition-all shadow-lg text-lg"
                        >
                            <Save size={20} />
                            Save Academy Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
