'use client';

import React from 'react';
import { CreditCard } from 'lucide-react';

export default function PaymentsPage() {
    return (
        <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-gray-300" size={40} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Payment History</h3>
            <p className="text-gray-500">View your receipts and payment status.</p>
        </div>
    );
}
