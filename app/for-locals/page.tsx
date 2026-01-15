import Image from "next/image";
import Link from "next/link";

export default function ForLocalsPage() {
    return (
        <div className="pt-20">
            {/* Hero Section with Background Image */}
            <section className="relative bg-white">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                    <div
                        className="relative overflow-hidden rounded-2xl bg-cover bg-center shadow-xl h-[520px]"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAi8BNuLX83JYd5to1gYDa6MLmCZIen6DHAM8TVMegilqdWpvoT1b6CwIdmclfAKiVbvXLwsxVTsbTDYGYtOcPZ0eZ7XBOBIAP0Tnu5MyZjq2CxYvz7bQPJ1FvzvzE4jfPFLVltW5r4i-tSv7Sy1kC4QcmMcKD4lRGuEtM97LhQ4_CtVjRtJeB86WbdbuMBsM2m086OcP0Qz7rbEGU_QlO82V3joHrIhFwm89jLGt8DBcRR86MvUUQYJTEYyJOWQlKqeh2h2mhfnWU")',
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                            <span className="mb-4 inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/30">
                                Exclusive for Residents
                            </span>
                            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl mb-4">
                                Rediscover Uzbekistan: <br className="hidden sm:block" />
                                Experiences Crafted for You
                            </h1>
                            <p className="max-w-2xl text-lg text-gray-200 mb-10 font-medium">
                                From weekend mountain retreats to artisan masterclasses. Enjoy
                                exclusive rates and activities designed specifically for
                                locals.
                            </p>

                            {/* Search Bar */}
                            <div className="w-full max-w-2xl">
                                <div className="flex w-full items-stretch rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5 transition-all focus-within:ring-2 focus-within:ring-primary">
                                    <div className="flex items-center pl-3 text-gray-400">
                                        <span className="material-symbols-outlined">search</span>
                                    </div>
                                    <input
                                        className="flex-1 border-none bg-transparent px-4 py-3 text-text-main placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                        placeholder="Find weekend plans (e.g., Charvak, Pottery class, Plov)..."
                                        type="text"
                                    />
                                    <button className="flex items-center justify-center rounded-lg bg-secondary px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-900 transition-colors">
                                        Search
                                    </button>
                                </div>
                                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-white/80">
                                    <span>Popular:</span>
                                    <a
                                        href="#"
                                        className="hover:text-white underline decoration-white/30 hover:decoration-white"
                                    >
                                        Zaamin
                                    </a>
                                    <span className="opacity-50">•</span>
                                    <a
                                        href="#"
                                        className="hover:text-white underline decoration-white/30 hover:decoration-white"
                                    >
                                        Ceramics
                                    </a>
                                    <span className="opacity-50">•</span>
                                    <a
                                        href="#"
                                        className="hover:text-white underline decoration-white/30 hover:decoration-white"
                                    >
                                        Family Picnic
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-12 bg-background-subtle">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-secondary">
                            Explore by Interest
                        </h2>
                        <a
                            href="#"
                            className="text-sm font-medium text-secondary hover:text-primary flex items-center gap-1"
                        >
                            View all categories{" "}
                            <span className="material-symbols-outlined text-sm">
                                arrow_forward
                            </span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {/* Category 1 */}
                        <a
                            href="#"
                            className="group relative overflow-hidden rounded-xl aspect-[4/5] shadow-sm hover:shadow-md transition-all"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBEdv1z-EYhZgcEA_oodTYJpVB067UuUl5wNXxvueUJ0xezOxUg-SEv_UfcjKMjGHLBpueHV9IXfH0dpJOwv8-3NkTmOkF1UFZuXSQ6gUpi2rxqfNYw64QplLVWCiXrfT5CGdIJ1QB19SBUifsUOTya46vfdR0TsDT99Y5WJRjyDet6vVPJG18XwtxCMq8m3Zv90F67soDHdOGjcy-J5u34U5BvH16es1mDV9RnEbl2lAFe6d4PUVSM2Jr8KU0RWK2OKNuInSvSmjA")',
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-5">
                                <span className="material-symbols-outlined text-white mb-2 text-3xl">
                                    landscape
                                </span>
                                <h3 className="text-lg font-bold text-white">
                                    Weekend Getaways
                                </h3>
                                <p className="text-sm text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                    Escape the city hustle
                                </p>
                            </div>
                        </a>

                        {/* Category 2 */}
                        <a
                            href="#"
                            className="group relative overflow-hidden rounded-xl aspect-[4/5] shadow-sm hover:shadow-md transition-all"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC_ATSaUCufbGmHLH9LUDl59y96RJEjzqQqhWvUT2CK13yK5SvwXN7qy18cMyoM6vG_T9LZ_H1S0IkvluQrGhep6n7XoLjE5Jk8zYyFigTgIPp8Bx7j4ipQ1cS15x4d6xG6T__DAoddiCUrXgDuqUwf1MjZlGReYObrZp6xrN567YTaBBdWeKL_sghiqj48b5dXgQGOWabqQxJ8FD-b_4V27sVqQ3CIqW_t87QBA0sLPuZN1l0hSvtGftsmxnj0SxSTBZDt7g69E-4")',
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-5">
                                <span className="material-symbols-outlined text-white mb-2 text-3xl">
                                    brush
                                </span>
                                <h3 className="text-lg font-bold text-white">Masterclasses</h3>
                                <p className="text-sm text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                    Learn ancient crafts
                                </p>
                            </div>
                        </a>

                        {/* Category 3 */}
                        <a
                            href="#"
                            className="group relative overflow-hidden rounded-xl aspect-[4/5] shadow-sm hover:shadow-md transition-all"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAs3NkatHI66hqah7imroVPFHh2OeEURUgcfsLotNWjsMDLtDSVCbr3r9QLMwNm1_dpbjXBBbx1FqMe5mT0LkSDZZ5yV_ttUQvkuVLF5lKg_0Mwzs73-i4dEuegVal7hDa8cVdXxZq6ixbzPrbD3vPDqFUlMZQQSC86IAuTQNoInrLhDu995POgJTZRHwjWSQmzHyZmn_OzZ2mIDyVQuJlsU-I2Ea3pv_o3mo2WhcIKOxd3nXBn7p3Hba8EZC2kkJgV5Z7WR6cZDBg")',
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-5">
                                <span className="material-symbols-outlined text-white mb-2 text-3xl">
                                    family_restroom
                                </span>
                                <h3 className="text-lg font-bold text-white">
                                    Family Activities
                                </h3>
                                <p className="text-sm text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                    Fun for all ages
                                </p>
                            </div>
                        </a>

                        {/* Category 4 */}
                        <a
                            href="#"
                            className="group relative overflow-hidden rounded-xl aspect-[4/5] shadow-sm hover:shadow-md transition-all"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAHCLPpQQ5OW5dmM95GZK8BthRJqikxs7MaYAuvOObkN57mTJwIbiwBhzheFPq8ausjGvipB_7xoT5rzBsb_lBDDS7IlAl0gjW8QCyDzQOWT1U0kG86kwbWxirxIvHuNzhbfHrId0fbkRrGGMlzpesXmI6detigPBLekEh4Ns1TtlCkFElRIlmJOrU2c3xeWvywQPXUzgvYWaZq2od8Q66VkRjaHOQ8FgCQuwC6WK4Ce_LGHbT0nSUu6a0FpQ6L6-mJcUQ_UY_ucSs")',
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-5">
                                <span className="material-symbols-outlined text-white mb-2 text-3xl">
                                    local_offer
                                </span>
                                <h3 className="text-lg font-bold text-white">
                                    Local Discounts
                                </h3>
                                <p className="text-sm text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                    Exclusive resident deals
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Featured Experiences */}
            <section className="py-12 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-secondary">
                            Top Picks for Locals
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Curated experiences with exclusive pricing for residents.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group flex flex-col rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute top-3 left-3 z-10 rounded-md bg-white/90 px-2 py-1 text-xs font-bold uppercase tracking-wider text-primary shadow-sm backdrop-blur-sm">
                                    Local Favorite
                                </div>
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAnVR8_iw8UK2IGiBlXe_9DbEkGJ5-iICRTX02v2odbm28F_ZcxJmci1LRYTePoPixOQ_LxtgZGuGqgGHDtsZf8LzaP-nNrKLqhPCMC5VbxvNQr8RQHmGHDd76pJD9t4CH2o3QczsGE1bvcAWuIJVNQWsziI94PpXML4FPquQJQN34Rq7Kdw-GD4VTJk4g53eMcwZYEJwvBpDQWzwSC6aCqW-BBwQRAj_L9WO0L9-86Ac47Wf8FaMQDuXy-k0JRaMBBG3bOCorU8Jc")',
                                    }}
                                ></div>
                            </div>
                            <div className="flex flex-1 flex-col p-5">
                                <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                                    <span className="material-symbols-outlined text-[16px]">
                                        location_on
                                    </span>
                                    <span>Rishtan</span>
                                    <span className="mx-1">•</span>
                                    <span>3 Hours</span>
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-secondary group-hover:text-primary transition-colors">
                                    Private Pottery Workshop
                                </h3>
                                <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                                    Learn the art of traditional blue ceramics from a master
                                    craftsman in Rishtan.
                                </p>
                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">From</span>
                                        <span className="text-lg font-bold text-primary">
                                            150,000 UZS
                                        </span>
                                    </div>
                                    <button className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-secondary hover:bg-primary hover:text-white transition-colors">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group flex flex-col rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute top-3 left-3 z-10 rounded-md bg-red-500/90 px-2 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-sm">
                                    -20% Discount
                                </div>
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8eeYeo2LY5ai7G8-bWUhvZTclP0vi9ZwpDLFX0e3ZE3_acRRw6LrV9lO2_m_bRMyEQGtqlV9xJ1ZaMDj1BOxn88rtNf4rAnUuboXKFs2PMb7O64WpCHDkojomwZgCs7HFYrfBZ04ha5wp9ewAhVsQ1HkYC21DM8oMs2vmH0dA-1ThygAN4_c5N1_yvEob2BZ5kWzaXGC6G1jIdgAngITMMvSAi0pVgkF6iCBXZ0F-Gq2fc_1mkWDadGISOIdJdKnYAkcA14oKheg")',
                                    }}
                                ></div>
                            </div>
                            <div className="flex flex-1 flex-col p-5">
                                <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                                    <span className="material-symbols-outlined text-[16px]">
                                        location_on
                                    </span>
                                    <span>Charvak</span>
                                    <span className="mx-1">•</span>
                                    <span>1 Day</span>
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-secondary group-hover:text-primary transition-colors">
                                    Day Trip: Charvak Relaxation
                                </h3>
                                <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                                    Transport, lunch, and access to a private resort pool
                                    included. Perfect for families.
                                </p>
                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 line-through">
                                            450,000 UZS
                                        </span>
                                        <span className="text-lg font-bold text-primary">
                                            360,000 UZS
                                        </span>
                                    </div>
                                    <button className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-secondary hover:bg-primary hover:text-white transition-colors">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group flex flex-col rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBwKBcPxQwg_PQYUjEZgHpszBIkvcYgVtmRwaASblX2Y406NJYqs2VBpN5ZU3Li8X2_oOYGk_CFf0F9F9L5niZIMZOh1B6lqPdt4lN5Qj66fwtew6co9yMnVKNtEIU05jA-LAvBG-OD_di-hhOxilroV2ejlwFnY_VQRH03QLxuRQ1BfdcVWkqJGIUsgLeq7M5PCw5Yp-iwkR1CVHEVO0x-HCp8zmZ7rIVQwFoeB-uRo9mvH8rSkZXxou7bOn6PuqIwrmVe9fa7whg")',
                                    }}
                                ></div>
                            </div>
                            <div className="flex flex-1 flex-col p-5">
                                <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                                    <span className="material-symbols-outlined text-[16px]">
                                        location_on
                                    </span>
                                    <span>Tashkent</span>
                                    <span className="mx-1">•</span>
                                    <span>4 Hours</span>
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-secondary group-hover:text-primary transition-colors">
                                    Plov Center &amp; Tasting Tour
                                </h3>
                                <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                                    Discover the secrets of the perfect wedding plov and taste
                                    varieties from different regions.
                                </p>
                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">From</span>
                                        <span className="text-lg font-bold text-primary">
                                            120,000 UZS
                                        </span>
                                    </div>
                                    <button className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-secondary hover:bg-primary hover:text-white transition-colors">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Locals Choose Us */}
            <section className="py-16 bg-background-subtle border-t border-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-3xl">
                                    currency_exchange
                                </span>
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-secondary">
                                Resident Rates
                            </h3>
                            <p className="text-sm text-gray-600">
                                Special pricing tailored for Uzbek citizens and residents.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-3xl">
                                    payments
                                </span>
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-secondary">
                                Local Payments
                            </h3>
                            <p className="text-sm text-gray-600">
                                Easy payment via Click, Payme, or Apelsin/Uzum.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-3xl">
                                    support_agent
                                </span>
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-secondary">
                                24/7 Local Support
                            </h3>
                            <p className="text-sm text-gray-600">
                                Support in Uzbek and Russian, anytime you need help.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-3xl">
                                    verified
                                </span>
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-secondary">
                                Verified Quality
                            </h3>
                            <p className="text-sm text-gray-600">
                                We personally vet every experience for safety and quality.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter / Community */}
            <section className="py-12 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl bg-secondary px-6 py-12 md:p-12 text-center md:text-left relative overflow-hidden">
                        {/* Decorative pattern overlay */}
                        <div className="absolute top-0 right-0 h-full w-1/2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-xl">
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Don&apos;t miss the next local drop!
                                </h2>
                                <p className="text-blue-100 text-lg">
                                    Join our community newsletter to get weekly updates on new
                                    workshops, flash sales, and hidden gem locations across
                                    Uzbekistan.
                                </p>
                            </div>
                            <div className="w-full max-w-md">
                                <form className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        className="flex-1 rounded-lg border-none px-4 py-3 text-gray-900 focus:ring-2 focus:ring-white/50"
                                        placeholder="Your email address"
                                        type="email"
                                    />
                                    <button
                                        className="rounded-lg bg-primary text-secondary px-6 py-3 font-bold hover:bg-yellow-400 transition-colors whitespace-nowrap"
                                        type="button"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                                <p className="mt-3 text-xs text-blue-200">
                                    No spam, just good plans. Unsubscribe anytime.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
