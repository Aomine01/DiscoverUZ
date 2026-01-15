import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20">
        <div className="relative flex min-h-[640px] flex-col items-center justify-center overflow-hidden px-6 text-center lg:px-8">
          {/* Background Image */}
          <Image
            src="/images/optimized/background2k.webp"
            alt="Beautiful Uzbekistan architectural heritage"
            fill
            priority
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-gray-900/60 z-[1]"></div>
          <div className="relative z-10 max-w-4xl space-y-6">
            {/* Official Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
              <span className="text-xs font-medium text-white tracking-wide uppercase">
                Official National Platform
              </span>
            </div>

            {/* Hero Title */}
            <h2 className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-sm">
              Unlock the Heart of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">
                Central Asia
              </span>
            </h2>

            {/* Hero Description */}
            <p className="mx-auto max-w-2xl text-lg font-medium text-gray-100 sm:text-xl/8">
              The official platform for authentic tours, seamless travel, and
              unforgettable experiences in Uzbekistan.
            </p>

            {/* Hero Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/for-tourists"
                className="group flex h-14 min-w-[240px] items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-bold text-secondary shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:bg-[#ffe033]"
              >
                <span>I&apos;m Visiting Uzbekistan</span>
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                  flight_takeoff
                </span>
              </Link>
              <Link
                href="/for-locals"
                className="group flex h-14 min-w-[240px] items-center justify-center gap-2 rounded-lg bg-white/10 px-8 text-base font-bold text-white backdrop-blur-sm border-2 border-white/30 transition-all hover:bg-white/20 hover:border-white/50"
              >
                <span>I Live in Uzbekistan</span>
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                  home
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="relative z-20 mx-auto -mt-8 w-full max-w-5xl px-6">
          <div className="flex flex-col gap-2 rounded-xl bg-white p-3 shadow-2xl shadow-black/10 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-3 border-b border-gray-100 px-4 py-3 sm:border-b-0 sm:border-r">
              <span className="material-symbols-outlined text-primary">search</span>
              <div className="flex w-full flex-col">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Search
                </label>
                <input
                  className="w-full border-none p-0 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:ring-0"
                  placeholder="Destinations, tours, or hotels..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-1 items-center gap-3 border-b border-gray-100 px-4 py-3 sm:border-b-0 sm:border-r">
              <span className="material-symbols-outlined text-primary">
                calendar_month
              </span>
              <div className="flex w-full flex-col">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Dates
                </label>
                <input
                  className="w-full border-none p-0 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:ring-0"
                  placeholder="Add dates"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-1 items-center gap-3 px-4 py-3">
              <span className="material-symbols-outlined text-primary">group</span>
              <div className="flex w-full flex-col">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Guests
                </label>
                <input
                  className="w-full border-none p-0 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:ring-0"
                  placeholder="Add guests"
                  type="number"
                  min="1"
                  max="20"
                  step="1"
                />
              </div>
            </div>
            <button className="h-12 rounded-lg bg-secondary px-8 font-bold text-white shadow-md hover:bg-blue-900 transition-colors sm:h-14">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="border-b border-gray-100 bg-white py-10">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-gray-400">
            Trusted by leading organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:gap-16">
            <div className="flex items-center gap-2 text-xl font-bold text-gray-400">
              <span className="material-symbols-outlined">airplane_ticket</span>{" "}
              UzAirways
            </div>
            <div className="flex items-center gap-2 text-xl font-bold text-gray-400">
              <span className="material-symbols-outlined">train</span> Afrosiyob
            </div>
            <div className="flex items-center gap-2 text-xl font-bold text-gray-400">
              <span className="material-symbols-outlined">hotel</span> SilkRoad
              Hotels
            </div>
            <div className="flex items-center gap-2 text-xl font-bold text-gray-400">
              <span className="material-symbols-outlined">public</span> Ministry of
              Tourism
            </div>
          </div>
        </div>
      </section>

      {/* Top Destinations Section */}
      <section className="bg-background-subtle py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h3 className="font-display text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                Top Destinations
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Discover the ancient cities of the Silk Road and modern marvels.
              </p>
            </div>
            <Link
              href="/for-tourists"
              className="group flex items-center gap-1 text-sm font-bold text-secondary transition-colors hover:text-primary"
            >
              View all destinations
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid auto-rows-[300px] grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {/* Samarkand - Large 2x2 */}
            <div className="group relative overflow-hidden rounded-xl bg-gray-200 md:col-span-2 md:row-span-2">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjMudJMgLSFp9ROhxYF7GHuFCY6qt3ChqxTvGKo3innDCe_eQthAgWrpFyywKoNeJYw9eGsmxVYv0AbAh2y7fs5emXQtjLbn11GiOJKlMVEwH8xcTj3gEaTp08rCCPe4fefcRifpxlJWJxCxtEpDcQ57-e9VcEDTxF3dC15eK79KmVZJI393uanfUwnjtXMpd7EY45juT3Sw1CveHcWJcs8zY0QZcgGl1EF0x39UHwlmU80mwHfduZK5q8IKfUd1V7YIzPrnZcVHo')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 p-8">
                <span className="mb-2 inline-block rounded bg-primary/90 px-2 py-1 text-xs font-bold text-secondary backdrop-blur-md">
                  Most Popular
                </span>
                <h4 className="text-3xl font-bold text-white">Samarkand</h4>
                <p className="mt-2 line-clamp-2 text-gray-200">
                  Crossroad of cultures, famous for its mosques and mausoleums on
                  the Silk Road.
                </p>
              </div>
            </div>

            {/* Bukhara */}
            <div className="group relative overflow-hidden rounded-xl bg-gray-200">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDPaAYZ6paR1u6Z_QYXNs_6NqIbtUEQbjOFPVI9uHR5xJdMSiz_Q8qd6iCoy5bR3SsH5d-a-zjohhxtizBlXS0zNefh69AM58Wq1gvhl_QfCVuezLL5XNFm5XHy35YHeaCjse55ggkB57QRCpaxxa6C0d0cUMnzUSzARvQSJfRuUImgXXA3githNZ0dBJT82BrLMP4gb1udHmDxwJFE-bPwKXMXtjSZ2H8GF7-3z5Xbp5Dac1Gt_-UKn_XefDh4NpeEvm5a6O8OcaQ')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 p-6">
                <h4 className="text-xl font-bold text-white">Bukhara</h4>
                <p className="text-sm text-gray-200">The city museum.</p>
              </div>
            </div>

            {/* Khiva */}
            <div className="group relative overflow-hidden rounded-xl bg-gray-200">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDN28Fh4fJKdHVC6e3PrVXjNwXzREmVh8pfZKoeidofZpTOFwSKmZm6gZiDq5iOgK9GnWN1-dL7F6qLWdYJFPPfv-UEforOPDSWwB2kWyCxe5JTzqusxoThbiHXv2ClyIUWRfeLqU0iReEkAw9yB_v-tk5nGIGRa2bqDwkcFzGeus_GmmWXBpSk0czsc6oZ-s-Smwpgyo6_4doNlIV5hdB2_BrAngFwqxCWKTzNQUyPXG7pF8dwH65H7gqOAr9_6ZbNocYKddWU-Uo')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 p-6">
                <h4 className="text-xl font-bold text-white">Khiva</h4>
                <p className="text-sm text-gray-200">A living fortress city.</p>
              </div>
            </div>

            {/* Tashkent - Wide 2 columns */}
            <div className="group relative overflow-hidden rounded-xl bg-gray-200 md:col-span-2">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrYZ4yiOzIZQlERO4-ycmG8GNAcp0J4iBTXiwmRup1iLGP-m2KyWcjsgOdHLTPL05ZznNq9fcPkMOeadu02t_AXv9-C6rBKkHCF-fc1YHqAmLb740XXnwk0Zqu_ySbIlPenpB8Cng3akmxVtZlEGuNSVm9xvR-SgPfAMzUI-gjZtFzzqwFamWSMPmxDWpvB_v3BkDockiyzBpAMI56_9SfYOjgTIPxDTaFBpar-F0w3pHhnwNMmi5Lubr_-PoBQ56wOEZkFqRKjlQ')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 p-6">
                <h4 className="text-xl font-bold text-white">Tashkent</h4>
                <p className="text-sm text-gray-200">
                  The modern capital with Soviet and Islamic architecture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unforgettable Experiences Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h3 className="font-display text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
              Unforgettable Experiences
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              From culinary masterclasses to mountain adventures, find what moves
              you.
            </p>
          </div>

          {/* Experience Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Master Plov Cooking Class */}
            <Link
              href="#"
              className="group flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJIT_XirChRtetlmyGJokCnzHvqJo5RzwPeFrTh3Oa8g-XRrulwVaGFS8GHQCssvD5NqY4QMqkU7g-PMfwt1i71eaqRmjjbk4x7pASDXG-ekq0l_fJnxOWJEvL13ef8tJbqAqZKWnONAejtsy9goQkh4mHpW1-nF-w_awEygRcnh0KQoMRwjsPmoo0e8SG3MUJfrQ7vRFxZySUxe9Q56c5P3hYlvj-104gSfK-pVJ6QJ8XSaFvfsUMlLvY1wJHWeodU8Cts202l20"
                  alt="Traditional Uzbek Plov being cooked"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={90}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute top-2 right-2 rounded bg-white px-2 py-1 text-xs font-bold text-secondary shadow-sm">
                  $45/pp
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  <span className="material-symbols-outlined text-[16px]">
                    restaurant
                  </span>{" "}
                  Gastronomy
                </div>
                <h4 className="mt-2 text-lg font-bold text-secondary transition-colors group-hover:text-primary">
                  Master Plov Cooking Class
                </h4>
                <p className="mt-1 text-sm text-gray-500">Tashkent • 3 Hours</p>
                <div className="mt-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-yellow-500">
                    star
                  </span>
                  <span className="text-sm font-bold text-gray-900">4.9</span>
                  <span className="text-sm text-gray-400">(128 reviews)</span>
                </div>
              </div>
            </Link>

            {/* Rishtan Pottery Workshop */}
            <Link
              href="#"
              className="group flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBjnw3W3RFH6NOgVUP_V9GLE4Ktnm4smvxlWgamPTeld3me3zbDa-ltyvjPdljJXWBhk_wCGf4bAnO1kmt88jIw29aWnl8HKx4M76SGoz9SJa_0tHQDj6CybaoyUu5iFwqDOyGxk3bQqvAezkuIzkK5gRUH-Sk5vaIW-13JcaAyse9r56KPrhB2Zdao9-HCKbfikTIUmbbFoae0y_AufnyroMAs_Zeb_QlAMx8-pmxX7nAy-DclEglrRc6zj5NKr3HNndsAXYjD9A"
                  alt="Traditional ceramic pottery"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={90}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute top-2 right-2 rounded bg-white px-2 py-1 text-xs font-bold text-secondary shadow-sm">
                  $30/pp
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  <span className="material-symbols-outlined text-[16px]">
                    brush
                  </span>{" "}
                  Art & Culture
                </div>
                <h4 className="mt-2 text-lg font-bold text-secondary transition-colors group-hover:text-primary">
                  Rishtan Pottery Workshop
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  Fergana Valley • 2 Hours
                </p>
                <div className="mt-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-yellow-500">
                    star
                  </span>
                  <span className="text-sm font-bold text-gray-900">4.8</span>
                  <span className="text-sm text-gray-400">(85 reviews)</span>
                </div>
              </div>
            </Link>

            {/* Chimgan Mountains Hiking */}
            <Link
              href="#"
              className="group flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfY8XaTZrXB297ojDiw0QTPcCfiwtpeoGj5RMcWAIim7vRx0lZLWZzz63UbvXfbNs3Z85X4A6U6xMZvPGAnGLpSZJlfHNs_0A4EoyznIrRr-5N8g-URVvlCyYBFQY3QxrLeS7bQgh67oiVgnmYDaFTrGdU5w4IxuHj-XnHuKNDNwA2HEfTI3VflfbWV4XZB6FPuefRrcIubG1mxVfBfzm7yRNBxmDGGZoPB0yk98bsR4IgUm-OGybXyokNRREDEQKM9AkX_F2Hibo"
                  alt="Beautiful mountain landscape of Chimgan"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={90}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute top-2 right-2 rounded bg-white px-2 py-1 text-xs font-bold text-secondary shadow-sm">
                  $120/group
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  <span className="material-symbols-outlined text-[16px]">
                    hiking
                  </span>{" "}
                  Adventure
                </div>
                <h4 className="mt-2 text-lg font-bold text-secondary transition-colors group-hover:text-primary">
                  Chimgan Mountains Hiking
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  Tashkent Region • 1 Day
                </p>
                <div className="mt-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-yellow-500">
                    star
                  </span>
                  <span className="text-sm font-bold text-gray-900">5.0</span>
                  <span className="text-sm text-gray-400">(42 reviews)</span>
                </div>
              </div>
            </Link>

            {/* Aydarkul Yurt Camp Stay */}
            <Link
              href="#"
              className="group flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoWa1GFMSeoxJqi0i5j0kbti7YnQBqpDlHIq2leveqJn1r5PflHWmSNz8JQ0Bjxmgg1xv7KOXJ8B5ES0SLqY16Rh4CU04zAxU_SNV11ekCHilobSDJuQNtwm-23K4uinjYOFy0EiPnb_48li6KiubG_aiehgU8d5ci-JeDpGP1jBolHTyn8L3Gvhw0kbI5A6YwFVVqkKjjOJ7jKlnl9Q5BneS-IhGmyk7Z6nuszQkw_Y2DfA6FuF5KmBKHINQUPC2Rp8G_KT3hJk8"
                  alt="Yurt camp in the desert under starry sky"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={90}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute top-2 right-2 rounded bg-white px-2 py-1 text-xs font-bold text-secondary shadow-sm">
                  $150/night
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  <span className="material-symbols-outlined text-[16px]">
                    night_shelter
                  </span>{" "}
                  Glamping
                </div>
                <h4 className="mt-2 text-lg font-bold text-secondary transition-colors group-hover:text-primary">
                  Aydarkul Yurt Camp Stay
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  Navoi Region • Overnight
                </p>
                <div className="mt-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-yellow-500">
                    star
                  </span>
                  <span className="text-sm font-bold text-gray-900">4.7</span>
                  <span className="text-sm text-gray-400">(56 reviews)</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Explore All Button */}
          <div className="mt-12 text-center">
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-8 text-sm font-bold text-secondary shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50">
              Explore all Experiences
            </button>
          </div>
        </div>
      </section>

      {/* Why Book with Discover Uz Section */}
      <section className="relative overflow-hidden bg-secondary py-20 text-white">
        <div className="absolute top-0 right-0 h-full w-1/3 translate-x-1/2 skew-x-12 bg-white/5"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left: Features */}
            <div>
              <h2 className="font-display mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Why book with Discover Uz?
              </h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <span className="material-symbols-outlined">verified</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Officially Verified</h4>
                    <p className="mt-2 text-blue-100">
                      Every tour operator and guide is licensed and verified by the
                      National Tourism Committee.
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
                      Our local support team is available around the clock to assist
                      you in English, Russian, and Uzbek.
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
                      Book directly with local providers for the best rates without
                      hidden fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Image with Overlay Card */}
            <div className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border-4 border-white/10 bg-gray-800 shadow-2xl">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPYavb1mw-Cyi5V5O_WWPJbtRiAvUr7HVyd6DLlbaZpx2sQdoLtKJDCUGLofBShve0BRCbXXnJzL0ivyy57eNI255YwHU_AxppfORVxFuQCJpyj-nTD8uDMc65BQ5TI_o3HIa_6REpXKMs4q6Sj8pXJesBaDOyFWD-Z3elbCFmDrTFUyXjuTxIoXdQ7MmtlzRWArx7PnBNjbCavZtLZGL73JrVA7Vq3oq4b0RDQyWTS0YnmUVN7KAES0-afty5MZ8B2qotQAg8hdw"
                  alt="Happy tourists walking through Khiva"
                  fill
                  className="object-cover opacity-90"
                  quality={85}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden max-w-xs rounded-xl bg-white p-6 text-secondary shadow-xl md:block">
                <div className="flex items-center gap-4">
                  <div className="-space-x-3 flex overflow-hidden">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAynPIILGUnThpiH-6yBxacWgjQEr_tiNdn04lSE4K-i6uxCu_nuX136NeaWsEPnRyAwlj-uYstX01NO8P32NRPE9xm5GhYstDX5uqRlmkwpvayMGoroeMlTdbDnF0RKknGuKjsancEQlC-yWdCGFs0AOvcm9yaSRz0q-sEVeTATTnezCl5abdnQ3Dq2vuvfQ5elzWLgqWcwZxTDcxixKaRTCdQR0AG7smx7gNamksqepHzJtwCS_YIniJ29siJSTwcnXxR0EdQ2zQ"
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                      quality={75}
                      loading="lazy"
                    />
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMnGlsxMZ2dB4885DLJlhd6e3_yCq3IgfqVrHZjcRrEWDYFsJqPQFN4iiy8qUl7CqDI4wpItwrb2t1Zkp1QTyiQbaN_L4Gbppqysuoo2Y6Vk2HIop9pTPVLY4OOHVMNRorxbMtkumixcLOLENXoBxOMQ3L-8SThmiP3CA2EUxgdw5ieEfpaKiF2Oq5BLL6j6KLUTE3_WuGxYTGVl-PPyv6eXvC_6lFjpyC5kEcsOr6YIITjyhXfFCAZmXy9CF6cd-jofqcJvQmm18"
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                      quality={75}
                      loading="lazy"
                    />
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4B5xXBK37n8d7_F5UlyOQni1PC4C8Brat9RXnnmbTnlEKEK-SxLObQR4iAoIgaw2Na_oD_rp9pXDL0S1ZK6Vq0HCkLSul5j9i8viVEu9kPd0LYHIHx6v6d6AXZjTRiDD5dioS97P5KU6mPF-X5ktXWcmipU2pR34RBtp704KVGWmyK9Fs3AHefsiJ0_cjBHRfnMLfpmHPhTP6Okl5UsTRuse0Lt0E8zrzPe6yhD_--7MPz9e_40EmEOJY5aWKC3d7iM1QSHOG64g"
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                      quality={75}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-bold">10k+ Travelers</p>
                    <p className="text-xs text-gray-500">visited this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
