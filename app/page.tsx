import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20">
        <div className="relative flex min-h-[640px] flex-col items-center justify-center px-6 text-center lg:px-8 overflow-hidden">
          <Image
            src="/images/hero.png"
            alt="Uzbekistan Silk Road landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
          <div className="relative z-10 max-w-4xl space-y-6 py-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
              <span className="text-xs font-medium text-white tracking-wide uppercase">
                Official National Platform
              </span>
            </div>
            <h2 className="font-sans text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
              Unlock the Heart of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">
                Central Asia
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-gray-100 sm:text-xl">
              The official platform for authentic tours, seamless travel, and
              unforgettable experiences in Uzbekistan.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/for-tourists"
                className="group flex h-14 min-w-[240px] items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-bold text-secondary shadow-lg hover:bg-yellow-400 transition-all"
              >
                <span>I&apos;m Visiting Uzbekistan</span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                  flight_takeoff
                </span>
              </Link>
              <Link
                href="/for-locals"
                className="group flex h-14 min-w-[240px] items-center justify-center gap-2 rounded-lg bg-white/10 px-8 text-base font-bold text-white backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                <span>I Live in Uzbekistan</span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                  home
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h3 className="text-secondary text-3xl font-bold tracking-tight sm:text-4xl">
                Top Destinations
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Discover the ancient cities of the Silk Road and modern marvels.
              </p>
            </div>
            <Link
              href="/for-tourists"
              className="group flex items-center gap-1 text-sm font-bold text-secondary hover:text-primary transition-colors"
            >
              View all destinations
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Samarkand */}
            <div className="group relative col-span-1 md:col-span-2 h-[400px] overflow-hidden rounded-xl bg-gray-200 cursor-pointer">
              <Image
                src="/images/samarkand.png"
                alt="Registan Square in Samarkand"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 p-8">
                <span className="mb-2 inline-block rounded bg-primary/90 px-2 py-1 text-xs font-bold text-secondary">
                  Most Popular
                </span>
                <h4 className="text-3xl font-bold text-white">Samarkand</h4>
                <p className="mt-2 text-gray-200">
                  Crossroad of cultures, famous for mosques and mausoleums on the
                  Silk Road.
                </p>
              </div>
            </div>

            {/* Bukhara */}
            <div className="group relative overflow-hidden rounded-xl bg-gray-200 h-[400px] cursor-pointer">
              <Image
                src="/images/bukhara.png"
                alt="Kalyan Minaret in Bukhara"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 p-6">
                <h4 className="text-xl font-bold text-white">Bukhara</h4>
                <p className="text-sm text-gray-200">The city museum.</p>
              </div>
            </div>

            {/* Khiva */}
            <div className="group relative overflow-hidden rounded-xl bg-gray-200 h-[400px] cursor-pointer">
              <Image
                src="/images/khiva.png"
                alt="Ancient fortress city of Khiva"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 p-6">
                <h4 className="text-xl font-bold text-white">Khiva</h4>
                <p className="text-sm text-gray-200">A living fortress city.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-secondary text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <div>
                <h4 className="text-xl font-bold">Officially Verified</h4>
                <p className="mt-2 text-blue-100">
                  Every tour operator is licensed by the National Tourism Committee.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                <span className="material-symbols-outlined">support_agent</span>
              </div>
              <div>
                <h4 className="text-xl font-bold">24/7 Support</h4>
                <p className="mt-2 text-blue-100">
                  Local support team available in English, Russian, and Uzbek.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <div>
                <h4 className="text-xl font-bold">Best Price Guarantee</h4>
                <p className="mt-2 text-blue-100">
                  Book directly with local providers for the best rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
