import Link from "next/link";

export default function ForLocalsPage() {
    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="py-16 bg-gradient-to-br from-primary/10 to-yellow-50">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <span className="inline-block mb-4 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-secondary">
                        For Local Entrepreneurs
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
                        Grow Your Business with Discover Uz
                    </h1>
                    <p className="text-xl text-gray-700">
                        Join our platform and connect with thousands of international travelers
                    </p>
                </div>
            </section>

            {/* Why Partner */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-secondary mb-12">
                        Why Partner With Us?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="flex h-16 w-16 mx-auto mb-4 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-3xl">groups</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Reach Global Audience</h3>
                            <p className="text-gray-600">
                                Get discovered by travelers from over 90 countries
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="flex h-16 w-16 mx-auto mb-4 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-3xl">verified</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Official Platform</h3>
                            <p className="text-gray-600">
                                Government-backed credibility and trust
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="flex h-16 w-16 mx-auto mb-4 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-3xl">
                                    trending_up
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Grow Your Revenue</h3>
                            <p className="text-gray-600">
                                No commission on direct bookings, just listing fees
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What You Can Offer */}
            <section className="py-16 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-secondary mb-12">
                        What You Can Offer
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4 block">
                                explore
                            </span>
                            <h3 className="text-xl font-bold mb-3">Tour Guide Services</h3>
                            <p className="text-gray-600 mb-4">
                                Licensed guides for city tours, historical site visits, and cultural
                                experiences
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>Day tours & multi-day packages</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>Specialized thematic tours</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4 block">
                                hotel
                            </span>
                            <h3 className="text-xl font-bold mb-3">Accommodation</h3>
                            <p className="text-gray-600 mb-4">
                                Hotels, guesthouses, B&Bs, and traditional stays
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>All accommodation types welcome</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>Flexible pricing & availability</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4 block">
                                restaurant
                            </span>
                            <h3 className="text-xl font-bold mb-3">Food & Dining Experiences</h3>
                            <p className="text-gray-600 mb-4">
                                Traditional restaurants, cooking classes, food tours
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>Authentic Uzbek cuisine</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>Culinary workshops</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4 block">
                                palette
                            </span>
                            <h3 className="text-xl font-bold mb-3">Workshops & Cultural Activities</h3>
                            <p className="text-gray-600 mb-4">
                                Crafts, music, dance, and traditional art experiences
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>Pottery, carpet weaving, silk painting</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>Music & dance performances</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-secondary mb-12">Success Stories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 border border-gray-200 rounded-xl">
                            <p className="text-gray-700 italic mb-4">
                                &quot;Since joining Discover Uz, my guest house bookings increased
                                by 300%!&quot;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
                                <div>
                                    <p className="font-bold">Aziza Karimova</p>
                                    <p className="text-sm text-gray-500">Guesthouse Owner, Bukhara</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border border-gray-200 rounded-xl">
                            <p className="text-gray-700 italic mb-4">
                                &quot;The platform helped me reach international clients I never
                                could before.&quot;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-green-600"></div>
                                <div>
                                    <p className="font-bold">Rustam Aliyev</p>
                                    <p className="text-sm text-gray-500">Tour Guide, Samarkand</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border border-gray-200 rounded-xl">
                            <p className="text-gray-700 italic mb-4">
                                &quot;Easy to use, great support team, and real results for my
                                restaurant.&quot;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600"></div>
                                <div>
                                    <p className="font-bold">Dilshod Rahimov</p>
                                    <p className="text-sm text-gray-500">Restaurant Owner, Tashkent</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Get Started */}
            <section className="py-16 bg-gray-50">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-secondary mb-12 text-center">
                        How to Get Started
                    </h2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-secondary font-bold">
                                1
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Submit Application</h3>
                                <p className="text-gray-600">
                                    Fill out our partner application form with your business details
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-secondary font-bold">
                                2
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Verification Process</h3>
                                <p className="text-gray-600">
                                    Our team reviews your credentials and conducts a quality check
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-secondary font-bold">
                                3
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Create Your Listing</h3>
                                <p className="text-gray-600">
                                    Set up your profile, add photos, descriptions, and pricing
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-secondary font-bold">
                                4
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Go Live & Start Earning</h3>
                                <p className="text-gray-600">
                                    Once approved, your listing goes live and bookings start coming in
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-secondary text-white">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Partner With Us?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Start your application today and grow your business
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex h-14 px-8 bg-primary text-secondary font-bold rounded-lg hover:bg-yellow-400 transition-colors items-center gap-2"
                    >
                        <span>Start Application</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </section>
        </div>
    );
}
