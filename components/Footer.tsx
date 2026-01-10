import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-3xl text-secondary">
                                travel_explore
                            </span>
                            <span className="text-xl font-bold text-secondary">
                                Discover Uz
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-sm mb-6">
                            The official digital platform for tourism in Uzbekistan,
                            connecting travelers with authentic experiences.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-4">
                            Explore
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/for-tourists"
                                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                                >
                                    For Tourists
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/for-locals"
                                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                                >
                                    For Locals
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-400">
                        © 2024 Discover Uz. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-xs text-gray-400 hover:text-gray-900">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-xs text-gray-400 hover:text-gray-900">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
