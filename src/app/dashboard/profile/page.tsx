'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Save } from 'lucide-react';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) setUser(JSON.parse(userInfo));
            setLoading(false);
        };
        fetchProfile();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Settings</h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={user?.name || ''}
                            readOnly
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="email"
                            value={user?.email || ''}
                            readOnly
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button className="bg-[#483C5C] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#3D2F4A] transition-all opacity-50 cursor-not-allowed">
                        <Save size={20} />
                        Save Changes
                    </button>
                    <p className="text-xs text-gray-400 mt-2">Profile editing is currently disabled.</p>
                </div>
            </div>
        </div>
    );
}
