"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { newsletterSchema } from "@/lib/validations/inputs";
import { sanitizeFormData } from "@/lib/utils/sanitize";

export default function ForTouristsPage() {
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [newsletterError, setNewsletterError] = useState("");
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setNewsletterError("");
        setIsSubscribing(true);

        try {
            // 1. Sanitize
            const sanitized = await sanitizeFormData({ email: newsletterEmail });

            // 2. Validate
            newsletterSchema.parse(sanitized);

            // 3. TODO: Send to API when ready
            alert("Thank you for subscribing! Check your email for confirmation.");
            setNewsletterEmail("");
        } catch (error: any) {
            if (error.name === "ZodError") {
                setNewsletterError(error.issues[0]?.message || "Invalid email address");
            } else {
                setNewsletterError("Something went wrong. Please try again.");
            }
        } finally {
            setIsSubscribing(false);
        }
    };

    return (
        <div className="pt-20">
            {/* Hero Section with Integrated Search */}
            <section className="flex justify-center px-4 py-6 md:px-0">
                <div className="max-w-[1280px] w-full px-4 md:px-10">
                    <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-xl">
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-10"></div>
                            <div
                                className="h-full w-full bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBtzE6cE2Q4H-1U4lwIOjRLg0V7cfMERPII3An15bnB6OEdsdF7-kpG59LS0FHa37UAwIOULxoYu196hVyYhyn3IHdR0jgs_lEbJzHxc2zA9VuZ4pUqgjhR2NFXdlbiJaZ9_C4Ba9mHAj5tQpY8WHdf8C43BSEXb0rTzEw2IlCD5McBMr6Mnq8ueEMy9g_NqM0IHmJ5KMc2mz8toHKY7_ivqjmNGuWDRMXXcp0zfWFALau6-0IcH9eSBpIh8As7E0RBrSIDQPULqCY")',
                                }}
                            ></div>
                        </div>
                        <div className="relative z-20 flex min-h-[560px] flex-col items-center justify-center gap-8 p-6 text-center">
                            <div className="max-w-3xl flex flex-col gap-4">
                                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl drop-shadow-lg">
                                    Discover the Heart of the Silk Road
                                </h1>
                                <h2 className="text-white/90 text-lg font-medium md:text-xl drop-shadow-md">
                                    Curated experiences in Uzbekistan for the modern explorer.
                                    Uncover ancient cities, rich culture, and breathtaking
                                    landscapes.
                                </h2>
                            </div>

                            {/* Floating Search Bar */}
                            <div className="mt-8 w-full max-w-4xl p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                                <div className="flex flex-col md:flex-row bg-white rounded-xl p-2 gap-2 shadow-2xl">
                                    <div className="flex-1 relative group">
                                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary">
                                                location_on
                                            </span>
                                        </div>
                                        <input
                                            className="block w-full pl-10 pr-3 py-3 rounded-lg border-0 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 font-medium"
                                            placeholder="Where do you want to go? (e.g., Bukhara)"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex-1 relative group">
                                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary">
                                                calendar_month
                                            </span>
                                        </div>
                                        <input
                                            className="block w-full pl-10 pr-3 py-3 rounded-lg border-0 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 font-medium"
                                            placeholder="Add dates"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex-1 relative group">
                                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary">
                                                group
                                            </span>
                                        </div>
                                        <select className="block w-full pl-10 pr-3 py-3 rounded-lg border-0 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 font-medium appearance-none">
                                            <option>2 Travelers</option>
                                            <option>1 Traveler</option>
                                            <option>3 Travelers</option>
                                            <option>4+ Travelers</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-gray-400 text-sm">
                                                expand_more
                                            </span>
                                        </div>
                                    </div>
                                    <button className="bg-secondary hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">search</span>
                                        <span>Search</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Container */}
            <div className="flex flex-1 justify-center py-10">
                <div className="layout-content-container flex flex-col max-w-[1280px] w-full px-4 md:px-10 gap-16">
                    {/* Top Rated Tours */}
                    <section>
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <h2 className="text-secondary text-[28px] font-bold leading-tight tracking-[-0.015em]">
                                    Top Rated Tours
                                </h2>
                                <p className="text-gray-500 mt-2 text-base">
                                    Handpicked adventures for an unforgettable journey.
                                </p>
                            </div>
                            <a
                                href="#"
                                className="hidden sm:flex items-center text-secondary hover:text-primary font-bold gap-1"
                            >
                                View all tours{" "}
                                <span className="material-symbols-outlined text-sm">
                                    arrow_forward
                                </span>
                            </a>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Card 1 */}
                            <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
                                <div className="relative h-60 overflow-hidden">
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-secondary z-10 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm text-yellow-500">
                                            star
                                        </span>{" "}
                                        4.9
                                    </div>
                                    <div className="absolute top-3 right-3 bg-secondary text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                                        7 Days
                                    </div>
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAOD9cg35UhIWzoVcKj5-9_Rm2aWiTMb-ni_CBi6P7j64Km1L81KsBd0_UArH5NV3YG85Eu-1qZGJjZXO0iXiN6fp2p5J04X5jGjbdsfK6-_mgCLHGyDGGbUFHQFKe3OP4AnvW2i7XixnpjDBfG6xmzsW8NPZT7tXqFXAdL6es-AnfKwB46RjcG_6efM8RHmgO1H5HVMj8gWv7gNKqUIqUTbRavQgeEhyKVVojEbSgEMwCLJeQDhhEArixeB4tAnhj0KaQJ4aqmPaM")',
                                        }}
                                    ></div>
                                </div>
                                <div className="p-5 flex flex-col gap-3">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-wide">
                                        <span className="material-symbols-outlined text-sm">
                                            location_on
                                        </span>{" "}
                                        Samarkand &amp; Bukhara
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary leading-tight">
                                        Golden Road to Samarkand
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        Explore the architectural masterpieces of the Timurid empire
                                        and ancient bazaars.
                                    </p>
                                    <div className="mt-2 pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-gray-500">From</span>
                                            <div className="text-lg font-bold text-secondary">
                                                $850
                                            </div>
                                        </div>
                                        <button className="bg-secondary/10 hover:bg-secondary text-secondary hover:text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
                                <div className="relative h-60 overflow-hidden">
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-secondary z-10 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm text-yellow-500">
                                            star
                                        </span>{" "}
                                        4.8
                                    </div>
                                    <div className="absolute top-3 right-3 bg-secondary text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                                        3 Days
                                    </div>
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBSLBtJtwHmYqwkAzETbJuyZqxlxJupF1_zH7KT-30uUyJxHI9NZXyuZmsUKAzsio_sqhpsSWzjwi-kumX_b9dPcGVsDu6ROftL4WigIN5rTDDehZ005-oAcS8X_NfUGdJNURkbtLKiF0qs8OR9ywQKsQ6JzzgIKMJ71fdS6RSj673fi6uZinvm01Gic4Q2mSMsyvk-lHEBohSeyOKWHWY6Jhph4wRydTPw_Uwkie4wKlOc5vaAmNVc0s5vePxRTjGlJ3IT-TR8D6E")',
                                        }}
                                    ></div>
                                </div>
                                <div className="p-5 flex flex-col gap-3">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-wide">
                                        <span className="material-symbols-outlined text-sm">
                                            location_on
                                        </span>{" "}
                                        Tashkent
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary leading-tight">
                                        Tashkent City Break
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        Experience the perfect blend of Soviet modernism and Islamic
                                        heritage in the capital.
                                    </p>
                                    <div className="mt-2 pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-gray-500">From</span>
                                            <div className="text-lg font-bold text-secondary">
                                                $320
                                            </div>
                                        </div>
                                        <button className="bg-secondary/10 hover:bg-secondary text-secondary hover:text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
                                <div className="relative h-60 overflow-hidden">
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-secondary z-10 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm text-yellow-500">
                                            star
                                        </span>{" "}
                                        5.0
                                    </div>
                                    <div className="absolute top-3 right-3 bg-secondary text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                                        10 Days
                                    </div>
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_0FSCaXs1xsTGswoDEeiUts078rX8JSUpTqWmuABJlJUxSppD0e73ILwYY_Wg3Y07Q-8sQ4pk6Kdi-jrkYvDowhD4qJJCU03EqBy2B86fDyijOshlzYzqq8mThywaH0FxkLrhG5Z4-tGIeJlAWOvxD2wBv-FC2wr6lKXuDLRJzIK1VYQMJ2LfOoZ__jQcyHSTIqotXBnWDoU3QbPWYOpW9bgo0n2uvfrid_CsBrfSxYnerccfMYW3yZxMNi4HFBZQk0vj09nMQKc")',
                                        }}
                                    ></div>
                                </div>
                                <div className="p-5 flex flex-col gap-3">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-wide">
                                        <span className="material-symbols-outlined text-sm">
                                            location_on
                                        </span>{" "}
                                        Desert &amp; Mountains
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary leading-tight">
                                        Nomadic Trails &amp; Yurt Camps
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        Sleep under the stars and ride camels across the Kyzylkum
                                        Desert.
                                    </p>
                                    <div className="mt-2 pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-gray-500">From</span>
                                            <div className="text-lg font-bold text-secondary">
                                                $1,200
                                            </div>
                                        </div>
                                        <button className="bg-secondary/10 hover:bg-secondary text-secondary hover:text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Cultural Immersion Section (Pills) */}
                    <section>
                        <h2 className="text-secondary text-[24px] font-bold leading-tight tracking-[-0.015em] mb-6">
                            Immerse Yourself in Culture
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#"
                                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-primary hover:shadow-md transition-all group"
                            >
                                <div className="p-2 rounded-full bg-orange-100 text-orange-600">
                                    <span className="material-symbols-outlined">
                                        restaurant_menu
                                    </span>
                                </div>
                                <span className="font-bold text-base text-secondary group-hover:text-primary">
                                    Gastronomy
                                </span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-primary hover:shadow-md transition-all group"
                            >
                                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                                    <span className="material-symbols-outlined">
                                        history_edu
                                    </span>
                                </div>
                                <span className="font-bold text-base text-secondary group-hover:text-primary">
                                    History &amp; Heritage
                                </span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-primary hover:shadow-md transition-all group"
                            >
                                <div className="p-2 rounded-full bg-green-100 text-green-600">
                                    <span className="material-symbols-outlined">
                                        nature_people
                                    </span>
                                </div>
                                <span className="font-bold text-base text-secondary group-hover:text-primary">
                                    Eco-Tourism
                                </span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-primary hover:shadow-md transition-all group"
                            >
                                <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                                    <span className="material-symbols-outlined">palette</span>
                                </div>
                                <span className="font-bold text-base text-secondary group-hover:text-primary">
                                    Arts &amp; Crafts
                                </span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-primary hover:shadow-md transition-all group"
                            >
                                <div className="p-2 rounded-full bg-red-100 text-red-600">
                                    <span className="material-symbols-outlined">mosque</span>
                                </div>
                                <span className="font-bold text-base text-secondary group-hover:text-primary">
                                    Architecture
                                </span>
                            </a>
                        </div>
                    </section>

                    {/* Must-See Destinations (Bento Style) */}
                    <section>
                        <h2 className="text-secondary text-[28px] font-bold leading-tight tracking-[-0.015em] mb-6">
                            Must-See Destinations
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[500px]">
                            {/* Large Featured Item - Bukhara */}
                            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl bg-gray-200 cursor-pointer">
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10"></div>
                                <div className="absolute bottom-0 left-0 p-6 z-20">
                                    <h3 className="text-white text-3xl font-bold">Bukhara</h3>
                                    <p className="text-white/90 mt-2 text-sm max-w-xs">
                                        An open-air museum with over 140 architectural monuments.
                                    </p>
                                </div>
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDOTwZKAwTvRNkVLpVdimIC85y3nEBpYK2Y8PwKeGce75b-lOzELQICDFWOuguk7cKm5-Aan3r1JBvK-kvkzPz7tG79HJJHlu87Ygl5wcvJXbohZScH_SrTtqJbn4IwfPMTePmFgkHH4ePwFCbXkLyhgbm6ucYZ5DmBX3YQhPivo8wsDXyJE_IlD0S95weV7Cr4PMMHho-PNijIXpUzYZZzw9QnN2-ukdOjEwEUbUZqZPyQyRPF8P9cTmjloyqAShQkdd2xTt9jKGQ")',
                                    }}
                                ></div>
                            </div>

                            {/* Top Right Item - Samarkand */}
                            <div className="md:col-span-2 relative group overflow-hidden rounded-xl bg-gray-200 cursor-pointer h-64 md:h-auto">
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10"></div>
                                <div className="absolute bottom-0 left-0 p-6 z-20">
                                    <h3 className="text-white text-2xl font-bold">Samarkand</h3>
                                    <p className="text-white/90 mt-1 text-sm">
                                        Crossroad of cultures.
                                    </p>
                                </div>
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAIjxNu8VY3PVKHhTJO6zma8MkUH9Wpu_n530263UFfH4BLix2DeldbFOzUEerw9c5xzyU9p-bMk2GmcNKFhBT4o4cOkTgbBrkWY65-_HP0LErOuOZaw3fVS1H4_DEUL1GbRlSI1HcJeqgy57PeFNmpnQRylUq7Mlji4iUO36RuHEkpDIFir4SXTCPnJqaVZJeqHC077W2MzTQGrjl5DYrbxItEBUSaDT0vZBSv7_ZE2w_xBJtB1MW8EuW06_TIPU9KG9ChJrT6FoU")',
                                    }}
                                ></div>
                            </div>

                            {/* Bottom Right Items - Khiva */}
                            <div className="relative group overflow-hidden rounded-xl bg-gray-200 cursor-pointer h-64 md:h-auto">
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10"></div>
                                <div className="absolute bottom-0 left-0 p-4 z-20">
                                    <h3 className="text-white text-xl font-bold">Khiva</h3>
                                </div>
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB5HGI0CqHmyVR7rCN9S5FCxX5XdsuK55r4a073GrLHvclLTPA71a_2bHK4r1u_GtJf-8hVhYFq6sMr1Ls_EVY7fcVg-gr4BYzBGAQEQbdoH2U1hL1OlQFJdZEAtfAXRKcbgkHRdcx_OsyxsGFFUc2PaCrG7U_R3brok2s0HgZkfszUgSLZnN0g4DoLAoEg1o-awct2zvvf4n9_yFIrJ_bXP86xx-2eQBRime1k7wdng1i7iodADsb2rvIa1WVlag4DNBMdTgn2XaI")',
                                    }}
                                ></div>
                            </div>

                            {/* Bottom Right Items - Fergana */}
                            <div className="relative group overflow-hidden rounded-xl bg-gray-200 cursor-pointer h-64 md:h-auto">
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10"></div>
                                <div className="absolute bottom-0 left-0 p-4 z-20">
                                    <h3 className="text-white text-xl font-bold">Fergana</h3>
                                </div>
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC1BGlYU7wDxgfHloWaJvZyIm1fpwc6fTL_Iewzu-pfZpEiQoEjZtuKDRb3muhTiwhM3d05t_YpntCFX7_AsZ2nBuXBIkFT8uMgySRDJl6yFnxg1Yi6Sfdc2GUHlHA57px6v--pXsk2NWCJGhoKs_8EnleZ5uOCNTp6TpgWAPdWlCnrAYCf5tRN7MoM51A9G-3pbccrrkoYyhWsvk4atMhaTl-EwrsJcG46f6Dr-Nz9YvqUXoG-MZH8ZyLnsIKoPbt-fIo09LNqiYM")',
                                    }}
                                ></div>
                            </div>
                        </div>
                    </section>

                    {/* Practical Info Grid */}
                    <section className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-secondary text-[28px] font-bold leading-tight tracking-[-0.015em]">
                                    Essential Travel Info
                                </h2>
                                <p className="text-gray-500 mt-2 text-base">
                                    Prepare for your trip with these practical guides.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Info 1 */}
                            <div className="flex flex-col gap-3">
                                <div className="size-12 rounded-full bg-white shadow-sm flex items-center justify-center text-secondary">
                                    <span className="material-symbols-outlined text-2xl">
                                        card_travel
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg text-secondary">
                                    Visa Requirements
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Uzbekistan is visa-free for citizens of 90+ countries. Check
                                    your eligibility.
                                </p>
                                <a
                                    href="#"
                                    className="text-secondary text-sm font-bold hover:underline mt-auto inline-block"
                                >
                                    Learn More
                                </a>
                            </div>

                            {/* Info 2 */}
                            <div className="flex flex-col gap-3">
                                <div className="size-12 rounded-full bg-white shadow-sm flex items-center justify-center text-secondary">
                                    <span className="material-symbols-outlined text-2xl">
                                        flight_takeoff
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg text-secondary">
                                    Best Time to Visit
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Spring (Apr-Jun) and Autumn (Sep-Nov) offer the most pleasant
                                    weather.
                                </p>
                                <a
                                    href="#"
                                    className="text-secondary text-sm font-bold hover:underline mt-auto inline-block"
                                >
                                    Read Guide
                                </a>
                            </div>

                            {/* Info 3 */}
                            <div className="flex flex-col gap-3">
                                <div className="size-12 rounded-full bg-white shadow-sm flex items-center justify-center text-secondary">
                                    <span className="material-symbols-outlined text-2xl">
                                        train
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg text-secondary">
                                    Getting Around
                                </h3>
                                <p className="text-sm text-gray-600">
                                    High-speed trains (Afrosiyob) connect major tourist cities
                                    efficiently.
                                </p>
                                <a
                                    href="#"
                                    className="text-secondary text-sm font-bold hover:underline mt-auto inline-block"
                                >
                                    View Transport
                                </a>
                            </div>

                            {/* Info 4 */}
                            <div className="flex flex-col gap-3">
                                <div className="size-12 rounded-full bg-white shadow-sm flex items-center justify-center text-secondary">
                                    <span className="material-symbols-outlined text-2xl">
                                        shield
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg text-secondary">
                                    Safety &amp; Etiquette
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Uzbekistan is one of the safest countries. Learn about local
                                    customs.
                                </p>
                                <a
                                    href="#"
                                    className="text-secondary text-sm font-bold hover:underline mt-auto inline-block"
                                >
                                    Safety Tips
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Newsletter */}
                    <section className="relative overflow-hidden rounded-2xl bg-secondary text-white p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10 max-w-lg">
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                Get Inspired for Your Trip
                            </h2>
                            <p className="text-blue-100">
                                Subscribe to our newsletter for curated travel guides, hidden
                                gems, and exclusive tour offers.
                            </p>
                        </div>
                        <div className="relative z-10 w-full max-w-md">
                            <form onSubmit={handleNewsletterSubmit} noValidate className="flex flex-col gap-2">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        className={`flex-1 rounded-lg border-0 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-white/50 ${newsletterError ? 'ring-2 ring-red-500' : ''
                                            }`}
                                        placeholder="Enter your email"
                                        type="email"
                                        value={newsletterEmail}
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                        required
                                    />
                                    <button
                                        className={`font-bold py-3 px-6 rounded-lg transition-colors ${isSubscribing
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-primary hover:bg-yellow-400 text-secondary'
                                            }`}
                                        type="submit"
                                        disabled={isSubscribing}
                                    >
                                        {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                                    </button>
                                </div>
                                {newsletterError && (
                                    <p className="text-red-100 text-sm bg-red-500/20 px-3 py-2 rounded">
                                        {newsletterError}
                                    </p>
                                )}
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
