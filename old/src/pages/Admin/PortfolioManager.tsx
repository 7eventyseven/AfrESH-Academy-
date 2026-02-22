import React, { useState, useEffect } from 'react';
import { createPortfolio, updatePortfolio, deletePortfolio, getPortfolio, uploadImage } from '../../api/endpoints';
import { X, Plus, Trash, GripVertical, Upload, ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PortfolioManagerProps {
    portfolio?: any;
    onClose?: () => void;
}

const PortfolioManager: React.FC<PortfolioManagerProps> = ({ portfolio, onClose }) => {
    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        category: '',
        date: '',
        tags: ''
    });

    useEffect(() => {
        if (portfolio) {
            setFormData({
                ...portfolio,
                tags: Array.isArray(portfolio.tags) ? portfolio.tags.join(', ') : '',
            });
        }
    }, [portfolio]);

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            navigate('/admin');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = formData.image;

            // If there's a new file selected, upload it first
            if (imageFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('image', imageFile);
                const { data } = await uploadImage(uploadFormData);
                // Construct full URL if data.url is relative
                imageUrl = data.url.startsWith('http')
                    ? data.url
                    : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${data.url}`;
            }

            const dataToSubmit = {
                ...formData,
                image: imageUrl,
                tags: formData.tags.split(',').map((t: string) => t.trim()),
            };

            if (portfolio) {
                await updatePortfolio(portfolio._id, dataToSubmit);
            } else {
                await createPortfolio(dataToSubmit);
            }
            handleClose();
        } catch (error) {
            console.error('Error saving portfolio item:', error);
            alert('Failed to save portfolio item');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 overflow-y-auto pt-20 px-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl mx-auto mb-20 shadow-2xl relative overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {portfolio ? 'Edit Portfolio Item' : 'Create New Portfolio Item'}
                    </h2>
                    <button onClick={handleClose} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                placeholder="e.g., WEB DESIGN, PHOTOGRAPHY"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="text"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                placeholder="e.g., 15 Nov 2023"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Image</label>
                            <div className="flex items-center gap-4">
                                <div className="w-24 h-24 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden text-[#483C5C]">
                                    {imageFile || formData.image ? (
                                        <img
                                            src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <ImageIcon size={32} className="opacity-20" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <label className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                        <Upload size={18} className="text-[#483C5C]" />
                                        <span className="text-sm font-medium text-gray-700 font-bold">Upload Image</span>
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
                                    <p className="text-xs text-gray-500 mt-2 font-medium italic">Recommended: 800x600px. PNG, JPG or WebP.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#483C5C]"
                                rows={4}
                                required
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

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-3 text-gray-700 font-bold hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="bg-[#483C5C] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#3D2F4A] transition-colors shadow-lg disabled:opacity-50 min-w-[160px]"
                        >
                            {uploading ? 'Saving...' : (portfolio ? 'Update Item' : 'Create Item')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PortfolioManager;
