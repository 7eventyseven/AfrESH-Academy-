'use client';

import React from 'react';
import { BarChart2 } from 'lucide-react';

export default function ProgressPage() {
    return (
        <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="text-gray-300" size={40} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Student Progress</h3>
            <p className="text-gray-500">Detailed progress analytics coming soon.</p>
        </div>
    );
}
