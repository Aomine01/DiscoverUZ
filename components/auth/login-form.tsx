'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { login } from '@/actions/auth';
import { loginSchema, type LoginInput } from '@/lib/validations/inputs';

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginInput) => {
        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        if (data.remember) formData.append('remember', 'on');

        try {
            const result = await login(formData);

            if (result?.error) {
                setError(result.error);
                setIsLoading(false);
            }
            // Success case: login() redirects to /dashboard
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Error Alert */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-start gap-3 rounded-lg bg-red-500/10 border border-red-500/30 p-4"
                    >
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-300">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Email Field */}
            <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-wider text-white">
                    Email
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        {...register('email')}
                        type="email"
                        disabled={isLoading}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border-2 border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#f2cc0d] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="your@email.com"
                    />
                </div>
                {errors.email && (
                    <p className="text-sm text-[#f2cc0d]">{errors.email.message}</p>
                )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-wider text-white">
                    Password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        {...register('password')}
                        type="password"
                        disabled={isLoading}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border-2 border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#f2cc0d] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="••••••••"
                    />
                </div>
                {errors.password && (
                    <p className="text-sm text-[#f2cc0d]">{errors.password.message}</p>
                )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        {...register('remember')}
                        type="checkbox"
                        disabled={isLoading}
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#f2cc0d] focus:ring-[#f2cc0d] focus:ring-offset-0 cursor-pointer disabled:opacity-50"
                    />
                    <span className="text-sm text-gray-300">Remember me</span>
                </label>
                <Link
                    href="/forgot-password"
                    className="text-sm text-[#f2cc0d] hover:text-[#d4b20b] transition-colors"
                >
                    Forgot password?
                </Link>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#f2cc0d] to-[#d4b20b] text-[#1E3A8A] font-extrabold uppercase tracking-wider shadow-lg shadow-[#f2cc0d]/30 hover:shadow-xl hover:shadow-[#f2cc0d]/40 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Logging in...
                    </>
                ) : (
                    'Login'
                )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
                <p className="text-sm text-gray-300">
                    Don't have an account?{' '}
                    <Link
                        href="/signup"
                        className="text-[#f2cc0d] hover:text-[#d4b20b] font-bold transition-colors"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </form>
    );
}
