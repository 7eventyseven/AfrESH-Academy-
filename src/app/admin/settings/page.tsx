'use client';

import React, { useState, useEffect } from 'react';
import { Save, Lock } from 'lucide-react';
import axios from 'axios';

export default function AdminSettingsPage() {
    const [keys, setKeys] = useState<{ paystackPublicKey: string; paystackSecretKey: string }>({
        paystackPublicKey: '',
        paystackSecretKey: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await axios.get('/api/settings');
                if (data) {
                    setKeys({
                        paystackPublicKey: data.paystackPublicKey || '',
                        paystackSecretKey: data.paystackSecretKey || '',
                    });
                }
            } catch (error) {
                console.error('Failed to fetch settings', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.post('/api/settings', keys);
            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Failed to save settings', error);
            alert('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#483C5C]"></div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100 flex items-center gap-4 bg-gray-50">
                    <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                        <Lock size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Payment Settings</h2>
                        <p className="text-sm text-gray-500">Configure your payment gateway integration</p>
                    </div>
                </div>

                <form onSubmit={handleSave} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">Paystack Public Key</label>
                        <input
                            type="text"
                            value={keys.paystackPublicKey}
                            onChange={(e) => setKeys({ ...keys, paystackPublicKey: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C] font-mono text-sm"
                            placeholder="pk_test_..."
                        />
                        <p className="text-xs text-gray-500">This key is used for client-side integration.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">Paystack Secret Key</label>
                        <input
                            type="password"
                            value={keys.paystackSecretKey}
                            onChange={(e) => setKeys({ ...keys, paystackSecretKey: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C] font-mono text-sm"
                            placeholder="sk_test_..."
                        />
                        <p className="text-xs text-gray-500">This key is used for server-side verification. Keep it secret!</p>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-[#483C5C] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#3D2F4A] transition-all disabled:opacity-50 shadow-lg"
                        >
                            <Save size={20} />
                            {saving ? 'Saving...' : 'Save Configuration'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
