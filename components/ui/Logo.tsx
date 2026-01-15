import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
    href?: string;
}

export default function Logo({
    className = '',
    width = 48,
    height = 48,
    href = '/'
}: LogoProps) {
    const logo = (
        <Image
            src="/discoveruzlogonoback.svg"
            alt="DiscoverUz - Explore Uzbekistan"
            width={width}
            height={height}
            className={className}
            priority
        />
    );

    if (href) {
        return (
            <Link href={href} className="flex items-center gap-3 transition-opacity hover:opacity-80">
                {logo}
                <div className="flex flex-col">
                    <span className="text-xl font-extrabold tracking-tight text-secondary">
                        DiscoverUz
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                        Explore Uzbekistan
                    </span>
                </div>
            </Link>
        );
    }

    return logo;
}
