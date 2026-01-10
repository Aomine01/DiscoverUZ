import Link from "next/link";

export default function ForTouristsPage() {
    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <span className="inline-block mb-4 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-bold text-secondary">
                        For International Travelers
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
                        Explore Uzbekistan with Confidence
                    </h1>
                    <p className="text-xl text-gray-600">
                        Everything you need to plan your perfect journey through the Silk Road
                    </p>
                </div>
            </section>

            {/* Quick Planning Guide */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-secondary mb-12">
                        Plan Your Trip
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4 block">
                                assignment
                            </span>
                            <h3 className="text-xl font-bold mb-3">Visa & Documents</h3>
                            <p className="text-gray-600 mb-4">
                                90+ countries enjoy visa-free travel for up to 30 days. E-visa
                                available for others.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4 block">
                                hotel
                            </span>
                            <h3 className="text-xl font-bold mb-3">Accommodation</h3>
                            <p className="text-gray-600 mb-4">
                                From luxury hotels to family guesthouses. Book verified stays
                                through our platform.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4 block">
                                directions_car
                            </span>
                            <h3 className="text-xl font-bold mb-3">Transportation</h3>
                            <p className="text-gray-600 mb-4">
                                High-speed trains, domestic flights, and comfortable transfers
                                available.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Tour Packages */}
            <section className="py-16 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-secondary mb-12">
                        Popular Tour Packages
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Classic Silk Road */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                            <div className="p-6">
                                <span className="inline-block mb-2 text-xs font-bold text-primary">
                                    7 DAYS
                                </span>
                                <h3 className="text-xl font-bold mb-2">Classic Silk Road</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Tashkent, Samarkand, Bukhara, Khiva
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-secondary">$890</span>
                                    <button className="px-4 py-2 bg-secondary text-white rounded-lg font-bold text-sm hover:bg-blue-900">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Samarkand Express */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
                            <div className="p-6">
                                <span className="inline-block mb-2 text-xs font-bold text-primary">
                                    3 DAYS
                                </span>
                                <h3 className="text-xl font-bold mb-2">Samarkand Express</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Quick getaway to the jewel of the Silk Road
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-secondary">$320</span>
                                    <button className="px-4 py-2 bg-secondary text-white rounded-lg font-bold text-sm hover:bg-blue-900">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mountain Adventure */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600"></div>
                            <div className="p-6">
                                <span className="inline-block mb-2 text-xs font-bold text-primary">
                                    5 DAYS
                                </span>
                                <h3 className="text-xl font-bold mb-2">Mountain Adventure</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Hiking, camping, and nature in the Tian Shan
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-secondary">$540</span>
                                    <button className="px-4 py-2 bg-secondary text-white rounded-lg font-bold text-sm hover:bg-blue-900">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Essential Travel Tips */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-secondary mb-12">
                        Essential Travel Tips
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 border border-gray-200 rounded-xl">
                            <h4 className="font-bold mb-2 text-lg">💰 Currency</h4>
                            <p className="text-sm text-gray-600">
                                Uzbekistani Som (UZS). Cards accepted in cities, carry cash for
                                rural areas.
                            </p>
                        </div>
                        <div className="p-6 border border-gray-200 rounded-xl">
                            <h4 className="font-bold mb-2 text-lg">📱 Internet</h4>
                            <p className="text-sm text-gray-600">
                                4G available. Get a local SIM card at the airport for $5-10.
                            </p>
                        </div>
                        <div className="p-6 border border-gray-200 rounded-xl">
                            <h4 className="font-bold mb-2 text-lg">🗣️ Language</h4>
                            <p className="text-sm text-gray-600">
                                Uzbek and Russian. English spoken in tourist areas.
                            </p>
                        </div>
                        <div className="p-6 border border-gray-200 rounded-xl">
                            <h4 className="font-bold mb-2 text-lg">🌤️ Best Time</h4>
                            <p className="text-sm text-gray-600">
                                April-June & September-November for pleasant weather.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-secondary text-white">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Browse our full catalog of tours and experiences
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex h-14 px-8 bg-primary text-secondary font-bold rounded-lg hover:bg-yellow-400 transition-colors items-center gap-2"
                    >
                        <span>Contact Us To Book</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </section>
        </div>
    );
}
