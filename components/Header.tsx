"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/ui/Logo";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <>
            {/* Header */}
            <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                    <Logo width={64} height={64} />

                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className={`text-sm font-medium transition-colors ${isActive("/")
                                ? "text-primary"
                                : "text-gray-600 hover:text-primary"
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/for-tourists"
                            className={`text-sm font-medium transition-colors ${isActive("/for-tourists")
                                ? "text-primary"
                                : "text-gray-600 hover:text-primary"
                                }`}
                        >
                            For Tourists
                        </Link>
                        <Link
                            href="/for-locals"
                            className={`text-sm font-medium transition-colors ${isActive("/for-locals")
                                ? "text-primary"
                                : "text-gray-600 hover:text-primary"
                                }`}
                        >
                            For Locals
                        </Link>
                        <Link
                            href="/about"
                            className={`text-sm font-medium transition-colors ${isActive("/about")
                                ? "text-primary"
                                : "text-gray-600 hover:text-primary"
                                }`}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className={`text-sm font-medium transition-colors ${isActive("/contact")
                                ? "text-primary"
                                : "text-gray-600 hover:text-primary"
                                }`}
                        >
                            Contact
                        </Link>
                    </nav>

                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/login" className="text-sm font-semibold text-secondary hover:text-primary transition-colors px-3">
                            Log in
                        </Link>
                        <Link href="/signup" className="h-10 rounded-lg bg-secondary px-5 text-sm font-bold text-white shadow-sm hover:bg-blue-900 transition-colors flex items-center">
                            Sign Up
                        </Link>
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-gray-600"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-white pt-20"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <nav className="flex flex-col p-6 gap-4">
                        <Link
                            href="/"
                            className={`text-lg font-medium py-2 ${isActive("/") ? "text-primary" : "text-gray-600"
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/for-tourists"
                            className={`text-lg font-medium py-2 ${isActive("/for-tourists") ? "text-primary" : "text-gray-600"
                                }`}
                        >
                            For Tourists
                        </Link>
                        <Link
                            href="/for-locals"
                            className={`text-lg font-medium py-2 ${isActive("/for-locals") ? "text-primary" : "text-gray-600"
                                }`}
                        >
                            For Locals
                        </Link>
                        <Link
                            href="/about"
                            className={`text-lg font-medium py-2 ${isActive("/about") ? "text-primary" : "text-gray-600"
                                }`}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className={`text-lg font-medium py-2 ${isActive("/contact") ? "text-primary" : "text-gray-600"
                                }`}
                        >
                            Contact
                        </Link>
                        <div className="flex flex-col gap-3 mt-4">
                            <Link href="/login" className="h-12 rounded-lg border border-secondary text-secondary font-bold flex items-center justify-center">
                                Log in
                            </Link>
                            <Link href="/signup" className="h-12 rounded-lg bg-secondary text-white font-bold flex items-center justify-center">
                                Sign Up
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}
