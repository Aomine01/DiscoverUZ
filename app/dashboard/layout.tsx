'use client';

import { Home, Calendar, Users, Wallet, Heart, Settings, Shield, Crown } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type NavItem = {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    requiresSubscription?: boolean;
};

const navigationSections = {
    main: [
        { label: 'Overview', href: '/dashboard', icon: Home },
        { label: 'My Trips', href: '/dashboard/bookings', icon: Calendar },
        { label: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
        { label: 'Saved', href: '/dashboard/saved', icon: Heart },
    ] as NavItem[],
    community: [
        {
            label: 'Discover Locals',
            href: '/dashboard/locals',
            icon: Users,
            badge: 'New',
            requiresSubscription: true
        },
    ] as NavItem[],
    account: [
        { label: 'Trust Center', href: '/dashboard/verification', icon: Shield },
        { label: 'Settings', href: '/dashboard/settings', icon: Settings },
    ] as NavItem[],
};

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // TODO: Get user from session/auth
    // const session = await getServerSession();
    // if (!session) redirect('/login');

    // Mock user data - replace with actual auth
    const user = {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        subscriptionTier: 'insider' as const,
        isVerified: true,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 overflow-y-auto">
                {/* Logo & User Section */}
                <div className="p-6 border-b border-gray-100">
                    <Link href="/" className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-secondary font-bold text-lg">D</span>
                        </div>
                        <span className="font-bold text-secondary">DiscoverUz</span>
                    </Link>

                    {/* User Profile Card */}
                    <div className="flex items-center gap-3">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full ring-2 ring-primary/20"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate flex items-center gap-1">
                                {user.name}
                                {user.isVerified && (
                                    <Shield className="w-3.5 h-3.5 text-blue-500" />
                                )}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>

                    {/* Subscription Badge */}
                    {user.subscriptionTier === 'insider' && (
                        <div className="mt-3 px-2.5 py-1.5 bg-gradient-to-r from-primary to-yellow-400 rounded-lg flex items-center gap-2">
                            <Crown className="w-4 h-4 text-secondary" />
                            <span className="text-xs font-bold text-secondary">Local Insider</span>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-6">
                    {/* Main Section */}
                    <div>
                        <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Travel
                        </p>
                        <ul className="space-y-1">
                            {navigationSections.main.map((item) => (
                                <NavLink key={item.href} item={item} />
                            ))}
                        </ul>
                    </div>

                    {/* Community Section */}
                    <div>
                        <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Community
                        </p>
                        <ul className="space-y-1">
                            {navigationSections.community.map((item) => (
                                <NavLink
                                    key={item.href}
                                    item={item}
                                    isLocked={item.requiresSubscription && user.subscriptionTier === 'free'}
                                />
                            ))}
                        </ul>
                    </div>

                    {/* Account Section */}
                    <div>
                        <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Account
                        </p>
                        <ul className="space-y-1">
                            {navigationSections.account.map((item) => (
                                <NavLink key={item.href} item={item} />
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* Bottom CTA */}
                {user.subscriptionTier === 'free' && (
                    <div className="p-4 m-4 bg-gradient-to-br from-secondary to-blue-800 rounded-xl text-white">
                        <Crown className="w-6 h-6 mb-2 text-primary" />
                        <h4 className="font-bold text-sm mb-1">Unlock Local Insider</h4>
                        <p className="text-xs text-blue-100 mb-3">
                            Exclusive events, weekend getaways, and community trips
                        </p>
                        <Link
                            href="/dashboard/subscription"
                            className="block w-full py-2 px-3 bg-primary text-secondary text-center text-sm font-bold rounded-lg hover:bg-yellow-400 transition-colors"
                        >
                            Upgrade Now
                        </Link>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="pl-64">
                <div className="min-h-screen">
                    {children}
                </div>
            </main>
        </div>
    );
}

// NavLink Component
function NavLink({ item, isLocked = false }: { item: NavItem; isLocked?: boolean }) {
    const Icon = item.icon;

    return (
        <li>
            <Link
                href={isLocked ? '#' : item.href}
                className={`
          group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
          ${isLocked
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-50 active:bg-gray-100'
                    }
        `}
                onClick={(e) => isLocked && e.preventDefault()}
            >
                <Icon className={`
          w-5 h-5 transition-colors
          ${isLocked ? 'text-gray-400' : 'text-gray-600 group-hover:text-secondary'}
        `} />
                <span className={`
          flex-1 text-sm font-medium transition-colors
          ${isLocked ? 'text-gray-400' : 'text-gray-700 group-hover:text-secondary'}
        `}>
                    {item.label}
                </span>
                {item.badge && !isLocked && (
                    <span className="px-2 py-0.5 bg-primary text-secondary text-[10px] font-bold rounded-full">
                        {item.badge}
                    </span>
                )}
                {isLocked && (
                    <span className="text-xs text-gray-400">🔒</span>
                )}
            </Link>
        </li>
    );
}
