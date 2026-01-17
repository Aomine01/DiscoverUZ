'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { signup } from '@/actions/auth';
import { signupSchema, type SignupInput } from '@/lib/validations/inputs';

export function SignupForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
    });


    const onSubmit = async (data: SignupInput) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('confirmPassword', data.confirmPassword);
        formData.append('terms', data.terms ? 'on' : 'off');

        try {
            const result = await signup(formData);

            if (result?.error) {
                setError(result.error);
                setIsLoading(false);
            } else if (result?.success) {
                setSuccess(true);
                setIsLoading(false);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

            {/* Success Alert */}
            <AnimatePresence>
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-start gap-3 rounded-lg bg-green-500/10 border border-green-500/30 p-4"
                    >
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-green-300">Account created successfully!</p>
                            <p className="text-sm text-green-400 mt-1">Check your email to verify your account.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Name Field */}
            <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-wider text-white">
                    Full Name
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        {...register('name')}
                        type="text"
                        disabled={isLoading || success}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border-2 border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#f2cc0d] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="John Doe"
                    />
                </div>
                {errors.name && (
                    <p className="text-sm text-[#f2cc0d]">{errors.name.message}</p>
                )}
            </div>

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
                        disabled={isLoading || success}
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
                        disabled={isLoading || success}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border-2 border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#f2cc0d] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="••••••••"
                    />
                </div>
                {errors.password && (
                    <p className="text-sm text-[#f2cc0d]">{errors.password.message}</p>
                )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-wider text-white">
                    Confirm Password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        {...register('confirmPassword')}
                        type="password"
                        disabled={isLoading || success}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border-2 border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#f2cc0d] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="••••••••"
                    />
                </div>
                {errors.confirmPassword && (
                    <p className="text-sm text-[#f2cc0d]">{errors.confirmPassword.message}</p>
                )}
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        {...register('terms')}
                        type="checkbox"
                        disabled={isLoading || success}
                        className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 text-[#f2cc0d] focus:ring-[#f2cc0d] focus:ring-offset-0 cursor-pointer disabled:opacity-50"
                    />
                    <span className="text-sm text-gray-300">
                        I agree to the{' '}
                        <Link href="/terms" className="text-[#f2cc0d] hover:text-[#d4b20b] underline">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-[#f2cc0d] hover:text-[#d4b20b] underline">
                            Privacy Policy
                        </Link>
                    </span>
                </label>
                {errors.terms && (
                    <p className="text-sm text-[#f2cc0d]">{errors.terms.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading || success}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#f2cc0d] to-[#d4b20b] text-[#1E3A8A] font-extrabold uppercase tracking-wider shadow-lg shadow-[#f2cc0d]/30 hover:shadow-xl hover:shadow-[#f2cc0d]/40 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating Account...
                    </>
                ) : success ? (
                    <>
                        <CheckCircle2 className="w-5 h-5" />
                        Account Created
                    </>
                ) : (
                    'Create Account'
                )}
            </button>

            {/* Login Link */}
            <div className="text-center">
                <p className="text-sm text-gray-300">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="text-[#f2cc0d] hover:text-[#d4b20b] font-bold transition-colors"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </form>
    );
}
