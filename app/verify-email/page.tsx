'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { verifyEmail } from '@/actions/auth';

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setStatus('error');
            setMessage('No verification token provided');
            return;
        }

        // Call server action to verify email
        const verify = async () => {
            try {
                const result = await verifyEmail(token);

                if (result.success) {
                    setStatus('success');
                    setMessage(result.message || 'Email verified successfully!');

                    // Auto-redirect to login after 3 seconds
                    setTimeout(() => {
                        router.push('/login');
                    }, 3000);
                } else {
                    setStatus('error');
                    setMessage(result.error || 'Verification failed');
                }
            } catch (error) {
                setStatus('error');
                setMessage('An unexpected error occurred');
            }
        };

        verify();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-blue-900 mb-2">
                            Email Verification
                        </h1>
                        <p className="text-gray-600">
                            DiscoverUz Account Activation
                        </p>
                    </div>

                    {/* Status Display */}
                    <AnimatePresence mode="wait">
                        {status === 'loading' && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-12 space-y-4"
                            >
                                <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
                                <p className="text-gray-600 font-medium">
                                    Verifying your email...
                                </p>
                            </motion.div>
                        )}

                        {status === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6"
                            >
                                {/* Success Icon */}
                                <div className="flex justify-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-75"></div>
                                        <div className="relative bg-green-500 rounded-full p-4">
                                            <CheckCircle2 className="w-12 h-12 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Success Message */}
                                <div className="text-center space-y-3">
                                    <h2 className="text-2xl font-bold text-green-600">
                                        Email Verified!
                                    </h2>
                                    <p className="text-gray-600">
                                        {message}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Redirecting to login in 3 seconds...
                                    </p>
                                </div>

                                {/* Login Button */}
                                <Link
                                    href="/login"
                                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#f2cc0d] to-[#d4b20b] text-blue-900 font-bold rounded-xl hover:shadow-lg transition-all duration-200"
                                >
                                    Continue to Login
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6"
                            >
                                {/* Error Icon */}
                                <div className="flex justify-center">
                                    <div className="bg-red-100 rounded-full p-4">
                                        <AlertCircle className="w-12 h-12 text-red-600" />
                                    </div>
                                </div>

                                {/* Error Message */}
                                <div className="text-center space-y-3">
                                    <h2 className="text-2xl font-bold text-red-600">
                                        Verification Failed
                                    </h2>
                                    <p className="text-gray-600">
                                        {message}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <Link
                                        href="/signup"
                                        className="w-full block text-center py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                                    >
                                        Create New Account
                                    </Link>
                                    <Link
                                        href="/"
                                        className="w-full block text-center py-3 px-4 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        Back to Home
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Footer */}
                    <div className="pt-6 border-t border-gray-200">
                        <p className="text-center text-sm text-gray-500">
                            Official National Tourism Platform of Uzbekistan
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
