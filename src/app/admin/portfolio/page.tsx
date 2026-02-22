'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Briefcase } from 'lucide-react';
import { getPortfolio, deletePortfolio } from '@/lib/api/endpoints';
import PortfolioManager from '@/components/pages/Admin/PortfolioManager';

export default function AdminPortfolioPage() {
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showManager, setShowManager] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchPortfolio = async () => {
        try {
            const { data } = await getPortfolio();
            setPortfolio(data);
        } catch (error) {
            console.error('Failed to fetch portfolio', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deletePortfolio(id);
                fetchPortfolio();
            } catch (error) {
                console.error('Failed to delete portfolio item', error);
            }
        }
    };

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setShowManager(true);
    };

    const handleCreate = () => {
        setSelectedItem(null);
        setShowManager(true);
    };

    if (showManager) {
        return (
            <PortfolioManager
                portfolio={selectedItem}
                onClose={() => {
                    setShowManager(false);
                    fetchPortfolio();
                }}
            />
        );
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Portfolio</h2>
                <button
                    onClick={handleCreate}
                    className="bg-[#483C5C] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#3D2F4A] transition-colors text-sm"
                >
                    <Plus size={16} /> Add New Item
                </button>
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
                                        <div className="h-10 w-10 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                                            {item.image ? (
                                                <img className="h-full w-full object-cover" src={item.image} alt="" />
                                            ) : (
                                                <Briefcase size={20} className="text-gray-400" />
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-bold text-gray-900">{item.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-700">
                                        {item.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(item)} className="text-[#483C5C] hover:text-[#3D2F4A] mr-4">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">
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
