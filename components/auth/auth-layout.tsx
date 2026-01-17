import Image from 'next/image';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
            {/* Background Image */}
            <Image
                src="/images/samarkand.png"
                alt="Registan Square, Samarkand - Uzbekistan Architecture"
                fill
                priority
                quality={90}
                className="object-cover"
                sizes="100vw"
            />

            {/* Dark Overlay for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/80 via-[#1E3A8A]/70 to-black/60 z-[1]" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-md px-6">
                {/* Branding - Text Only */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        {title}
                    </h1>
                    <p className="mt-2 text-sm text-gray-300">
                        {subtitle}
                    </p>
                </div>

                {/* Glassmorphism Card */}
                <div className="relative overflow-hidden rounded-2xl bg-[#1E3A8A]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20 p-8">
                    {/* Decorative Gradient */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#f2cc0d]/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10">
                        {children}
                    </div>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-gray-400">
                    © 2024 DiscoverUz. Official National Tourism Platform of Uzbekistan
                </p>
            </div>
        </div>
    );
}
