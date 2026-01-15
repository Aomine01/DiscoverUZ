'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Loading() {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-secondary via-blue-800 to-blue-950">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute -left-4 top-0 h-72 w-72 animate-blob rounded-full bg-primary mix-blend-multiply blur-xl filter"></div>
                <div className="absolute right-4 top-0 h-72 w-72 animate-blob animation-delay-2000 rounded-full bg-yellow-300 mix-blend-multiply blur-xl filter"></div>
                <div className="absolute -bottom-8 left-20 h-72 w-72 animate-blob animation-delay-4000 rounded-full bg-blue-300 mix-blend-multiply blur-xl filter"></div>
            </div>

            {/* Main Loading Content */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Logo with Pulse Animation */}
                <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-primary opacity-20"></div>
                    <div className="relative animate-pulse-slow">
                        <Image
                            src="/discoveruzlogonoback.svg"
                            alt="DiscoverUz"
                            width={120}
                            height={120}
                            className="drop-shadow-2xl"
                            priority
                        />
                    </div>
                </div>

                {/* Brand Name */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
                        DiscoverUz
                    </h1>
                    <p className="mt-2 text-sm font-medium uppercase tracking-wider text-blue-100">
                        Explore Uzbekistan
                    </p>
                </div>

                {/* Loading Spinner */}
                <div className="flex flex-col items-center gap-4">
                    {/* Circular Progress */}
                    <div className="relative h-16 w-16">
                        <svg className="h-16 w-16 animate-spin" viewBox="0 0 50 50">
                            <circle
                                className="stroke-blue-900/30"
                                cx="25"
                                cy="25"
                                r="20"
                                fill="none"
                                strokeWidth="4"
                            />
                            <circle
                                className="animate-dash stroke-primary"
                                cx="25"
                                cy="25"
                                r="20"
                                fill="none"
                                strokeWidth="4"
                                strokeDasharray="80, 200"
                                strokeDashoffset="0"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    {/* Loading Text with Animated Dots */}
                    <p className="text-base font-medium text-blue-100">
                        Loading<span className="inline-block w-8 text-left">{dots}</span>
                    </p>
                </div>

                {/* Progress Bar Alternative (Hidden by default, can be toggled) */}
                <div className="hidden w-64 overflow-hidden rounded-full bg-blue-900/50">
                    <div className="h-1.5 animate-progress-bar rounded-full bg-gradient-to-r from-primary via-yellow-400 to-primary"></div>
                </div>
            </div>

            {/* Bottom Decoration */}
            <div className="absolute bottom-8 text-center">
                <p className="text-xs text-blue-300/60">
                    Preparing your experience...
                </p>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%,
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }

                @keyframes dash {
                    0% {
                        stroke-dasharray: 1, 200;
                        stroke-dashoffset: 0;
                    }
                    50% {
                        stroke-dasharray: 100, 200;
                        stroke-dashoffset: -15;
                    }
                    100% {
                        stroke-dasharray: 100, 200;
                        stroke-dashoffset: -125;
                    }
                }

                @keyframes pulse-slow {
                    0%,
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.05);
                    }
                }

                @keyframes progress-bar {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }

                .animate-dash {
                    animation: dash 1.5s ease-in-out infinite;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }

                .animate-progress-bar {
                    animation: progress-bar 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
