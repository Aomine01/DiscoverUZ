export default function AboutPage() {
    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
                        Our Mission: Connecting the World to Uzbekistan
                    </h1>
                    <p className="text-xl text-gray-600">
                        We&apos;re the official platform making Uzbekistan&apos;s treasures accessible to travelers worldwide.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-secondary mb-6">Our Story</h2>
                    <div className="prose prose-lg text-gray-600 space-y-4">
                        <p>
                            Founded in partnership with the Ministry of Tourism of Uzbekistan,
                            Discover Uz was created to showcase the rich cultural heritage and
                            stunning landscapes of our beautiful country.
                        </p>
                        <p>
                            Uzbekistan, located at the heart of the ancient Silk Road, has been a
                            crossroads of civilizations for millennia. Our cities - Samarkand,
                            Bukhara, Khiva, and Tashkent - hold some of the world&apos;s most
                            magnificent Islamic architecture and cultural treasures.
                        </p>
                        <p>
                            We believe that every traveler deserves an authentic, safe, and
                            memorable experience. That&apos;s why we work only with licensed, verified
                            tour operators and hospitality providers who share our commitment to
                            excellence.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-secondary mb-12 text-center">
                        Our Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4 block">
                                verified_user
                            </span>
                            <h3 className="text-xl font-bold mb-3">Authenticity</h3>
                            <p className="text-gray-600">
                                We ensure every experience is genuine and reflects the true spirit
                                of Uzbek culture and hospitality.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4 block">
                                shield
                            </span>
                            <h3 className="text-xl font-bold mb-3">Safety First</h3>
                            <p className="text-gray-600">
                                All partners are vetted and licensed. We maintain the highest
                                standards of safety and quality.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4 block">
                                diversity_3
                            </span>
                            <h3 className="text-xl font-bold mb-3">Community</h3>
                            <p className="text-gray-600">
                                We support local businesses and help preserve cultural heritage
                                through sustainable tourism.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-secondary text-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                            <div className="text-blue-100">Happy Travelers</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">500+</div>
                            <div className="text-blue-100">Verified Partners</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                            <div className="text-blue-100">Unique Experiences</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">4.8/5</div>
                            <div className="text-blue-100">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-secondary mb-12 text-center">
                        Leadership Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mx-auto mb-4"></div>
                            <h3 className="font-bold text-lg">Jasur Abdullayev</h3>
                            <p className="text-sm text-gray-500 mb-2">CEO & Founder</p>
                            <p className="text-sm text-gray-600">15 years in tourism industry</p>
                        </div>
                        <div className="text-center">
                            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 mx-auto mb-4"></div>
                            <h3 className="font-bold text-lg">Nodira Karimova</h3>
                            <p className="text-sm text-gray-500 mb-2">Head of Operations</p>
                            <p className="text-sm text-gray-600">Tourism & hospitality expert</p>
                        </div>
                        <div className="text-center">
                            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 mx-auto mb-4"></div>
                            <h3 className="font-bold text-lg">Timur Saidov</h3>
                            <p className="text-sm text-gray-500 mb-2">Tech Director</p>
                            <p className="text-sm text-gray-600">Building world-class platform</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
