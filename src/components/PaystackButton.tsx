'use client';

import React, { useEffect, useMemo, useState } from 'react';

declare global {
    interface Window {
        PaystackPop?: {
            setup: (options: any) => { openIframe: () => void };
        };
    }
}

interface PaystackButtonProps {
    course: any;
    publicKey: string;
    onSuccess: () => void;
}

const PAYSTACK_SCRIPT_ID = 'paystack-inline-js';

function loadPaystackScript(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined') return reject(new Error('No window'));
        if (window.PaystackPop) return resolve();

        const existing = document.getElementById(PAYSTACK_SCRIPT_ID) as HTMLScriptElement | null;
        if (existing) {
            existing.addEventListener('load', () => resolve());
            existing.addEventListener('error', () => reject(new Error('Paystack failed to load')));
            return;
        }

        const script = document.createElement('script');
        script.id = PAYSTACK_SCRIPT_ID;
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Paystack failed to load'));
        document.body.appendChild(script);
    });
}

const PaystackButton: React.FC<PaystackButtonProps> = ({ course, publicKey, onSuccess }) => {
    const [scriptReady, setScriptReady] = useState(false);

    useEffect(() => {
        let mounted = true;
        loadPaystackScript()
            .then(() => {
                if (mounted) setScriptReady(true);
            })
            .catch(() => {
                if (mounted) setScriptReady(false);
            });
        return () => {
            mounted = false;
        };
    }, []);

    const userInfo =
        typeof window !== 'undefined' ? localStorage.getItem('userInfo') : null;
    const userEmail = userInfo ? JSON.parse(userInfo).email : '';
    const isFree = !course?.price || course.price <= 0;

    const reference = useMemo(() => new Date().getTime().toString(), []);

    const handleClick = () => {
        if (!userEmail) {
            alert('Please sign in to enroll');
            window.location.href = '/login';
            return;
        }
        if (isFree) {
            onSuccess();
            return;
        }
        if (!publicKey) {
            alert("Payment system not configured (Missing Public Key)");
            return;
        }
        if (!scriptReady || !window.PaystackPop) {
            alert("Payment system is loading...");
            return;
        }

        const handler = window.PaystackPop.setup({
            key: publicKey,
            email: userEmail,
            amount: Math.round(course.price * 100),
            ref: reference,
            metadata: {
                custom_fields: [
                    {
                        display_name: 'Course Title',
                        variable_name: 'course_title',
                        value: course.title,
                    },
                ],
            },
            callback: () => onSuccess(),
            onClose: () => alert('Payment cancelled'),
        });

        handler.openIframe();
    };

    return (
        <button
            onClick={handleClick}
            disabled={!isFree && !scriptReady}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-extrabold py-5 rounded-2xl transition-all shadow-[0_10px_30px_-10px_rgba(124,58,237,0.5)] active:scale-[0.98] text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isFree ? 'Enroll for Free' : (scriptReady ? 'Enroll in Course' : 'Loading...')}
        </button>
    );
};

export default PaystackButton;
