import { getSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { Calendar, TrendingUp, Shield, Crown, AlertCircle, ChevronRight, MapPin } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual API calls
const getMockDashboardData = () => ({
    user: {
        name: 'Alex',
        subscriptionTier: 'insider' as const,
        trustScore: 87,
        isVerified: true,
    },
    upcomingTrip: {
        bookingId: '1',
        title: 'Silk Road Heritage Tour',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjMudJMgLSFp9ROhxYF7GHuFCY6qt3ChqxTvGKo3innDCe_eQthAgWrpFyywKoNeJYw9eGsmxVYv0AbAh2y7fs5emXQtjLbn11GiOJKlMVEwH8xcTj3gEaTp08rCCPe4fefcRifpxlJWJxCxtEpDcQ57-e9VcEDTxF3dC15eK79KmVZJI393uanfUwnjtXMpd7EY45juT3Sw1CveHcWJcs8zY0QZcgGl1EF0x39UHwlmU80mwHfduZK5q8IKfUd1V7YIzPrnZcVHo',
        startDate: new Date('2026-02-15'),
        location: 'Samarkand, Uzbekistan',
        daysUntilStart: 28,
        status: 'FUNDS_HELD' as const,
    },
    stats: {
        totalTrips: 3,
        activeBookings: 1,
        completedTrips: 2,
        walletBalance: 240.50,
        localEventAttendance: 5,
    },
    alerts: [
        {
            id: '1',
            type: 'info' as const,
            title: 'Upcoming Community Hike',
            message: 'Join fellow Local Insiders for a weekend trek in Chimgan Mountains',
            actionLabel: 'View Event',
            actionUrl: '/dashboard/locals',
            createdAt: new Date(),
            isRead: false,
        },
        {
            id: '2',
            type: 'success' as const,
            title: 'Identity Verified',
            message: 'Your trust score increased to 87%',
            createdAt: new Date(Date.now() - 86400000),
            isRead: false,
        },
    ],
});

export default async function DashboardOverview() {
    const session = await getSession();
    if (!session) redirect('/login');

    const { user, upcomingTrip, stats, alerts } = getMockDashboardData();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="px-8 py-6">
                    <h1 className="text-2xl font-bold text-secondary">
                        Welcome back, {user.name} 👋
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Here's what's happening with your adventures
                    </p>
                </div>
            </header>

            <div className="p-8">
                {/* Top Row - Main Widgets */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Widget 1: Upcoming Adventure */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="flex items-center justify-between p-6 pb-4">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    Upcoming Adventure
                                </h2>
                                <Link
                                    href="/dashboard/bookings"
                                    className="text-sm font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1"
                                >
                                    View All
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {upcomingTrip ? (
                                <div className="p-6 pt-0">
                                    <div className="flex gap-4">
                                        <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={upcomingTrip.image}
                                                alt={upcomingTrip.title}
                                                className="w-full h-full object-cover"
                                            />
                                            {upcomingTrip.status === 'FUNDS_HELD' && (
                                                <div className="absolute top-2 left-2 px-2 py-1 bg-green-500/90 backdrop-blur-sm rounded text-[10px] font-bold text-white">
                                                    Protected
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 mb-1">{upcomingTrip.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                                <MapPin className="w-4 h-4" />
                                                {upcomingTrip.location}
                                            </div>

                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="px-3 py-1.5 bg-primary/10 rounded-lg">
                                                    <p className="text-xs text-gray-600">Starts in</p>
                                                    <p className="text-lg font-bold text-secondary">{upcomingTrip.daysUntilStart} days</p>
                                                </div>
                                                <div className="px-3 py-1.5 bg-green-50 rounded-lg border border-green-200">
                                                    <p className="text-xs text-green-700 font-medium flex items-center gap-1">
                                                        <Shield className="w-3 h-3" />
                                                        Escrow Protected
                                                    </p>
                                                </div>
                                            </div>

                                            <Link
                                                href={`/dashboard/bookings/${upcomingTrip.bookingId}`}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white text-sm font-semibold rounded-lg hover:bg-blue-900 transition-colors"
                                            >
                                                View Details
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 pt-0 text-center">
                                    <p className="text-gray-500 mb-4">No upcoming trips planned</p>
                                    <Link
                                        href="/"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-secondary text-sm font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
                                    >
                                        Explore Tours
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Widget 2: Local Insider Status */}
                    <div className="bg-gradient-to-br from-secondary to-blue-800 rounded-xl shadow-sm overflow-hidden text-white relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full -ml-12 -mb-12" />

                        <div className="relative p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Crown className="w-6 h-6 text-primary" />
                                <h2 className="text-lg font-bold">Local Insider</h2>
                            </div>

                            {user.subscriptionTier === 'insider' ? (
                                <>
                                    <p className="text-blue-100 text-sm mb-4">
                                        Your membership is active
                                    </p>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            <span className="text-blue-100">{stats.localEventAttendance} events attended</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            <span className="text-blue-100">Exclusive weekend getaways</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            <span className="text-blue-100">Community network access</span>
                                        </div>
                                    </div>

                                    <Link
                                        href="/dashboard/subscription"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-yellow-400 transition-colors"
                                    >
                                        Manage Subscription
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <p className="text-blue-100 text-sm mb-4">
                                        Unlock exclusive local experiences
                                    </p>
                                    <Link
                                        href="/dashboard/subscription"
                                        className="block w-full py-3 px-4 bg-primary text-secondary text-center text-sm font-bold rounded-lg hover:bg-yellow-400 transition-colors"
                                    >
                                        Subscribe Now
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Widget 3: Trust Center */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-blue-500" />
                                Trust Center
                            </h2>
                            <Link
                                href="/dashboard/verification"
                                className="text-sm font-semibold text-secondary hover:text-primary transition-colors"
                            >
                                View
                            </Link>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Trust Score</span>
                                    <span className="text-sm font-bold text-gray-900">{user.trustScore}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all"
                                        style={{ width: `${user.trustScore}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                        <Shield className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-green-900">Verified</p>
                                        <p className="text-xs text-green-700">Identity confirmed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard
                            label="Total Trips"
                            value={stats.totalTrips.toString()}
                            icon={<Calendar className="w-5 h-5" />}
                        />
                        <StatCard
                            label="Active"
                            value={stats.activeBookings.toString()}
                            icon={<TrendingUp className="w-5 h-5" />}
                            color="blue"
                        />
                        <StatCard
                            label="Completed"
                            value={stats.completedTrips.toString()}
                            icon={<Calendar className="w-5 h-5" />}
                            color="green"
                        />
                        <StatCard
                            label="Wallet"
                            value={`$${stats.walletBalance}`}
                            icon={<TrendingUp className="w-5 h-5" />}
                            color="primary"
                        />
                    </div>
                </div>

                {/* Recent Alerts */}
                {alerts.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
                        <div className="space-y-3">
                            {alerts.map((alert) => (
                                <AlertCard key={alert.id} alert={alert} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Stat Card Component
function StatCard({
    label,
    value,
    icon,
    color = 'gray'
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
    color?: 'gray' | 'blue' | 'green' | 'primary';
}) {
    const colors = {
        gray: 'bg-gray-50 text-gray-600',
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        primary: 'bg-primary/10 text-secondary',
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className={`inline-flex p-2 rounded-lg ${colors[color]} mb-2`}>
                {icon}
            </div>
            <p className="text-xs text-gray-600 mb-1">{label}</p>
            <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
    );
}

// Alert Card Component
function AlertCard({ alert }: { alert: { type: 'info' | 'success' | 'warning' | 'error'; title: string; message: string; actionLabel?: string; actionUrl?: string } }) {
    const typeStyles: Record<'info' | 'success' | 'warning' | 'error', string> = {
        info: 'bg-blue-50 border-blue-200 text-blue-900',
        success: 'bg-green-50 border-green-200 text-green-900',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
        error: 'bg-red-50 border-red-200 text-red-900',
    };

    return (
        <div className={`p-4 rounded-lg border ${typeStyles[alert.type]}`}>
            <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{alert.title}</h4>
                    <p className="text-sm opacity-90">{alert.message}</p>
                    {alert.actionLabel && (
                        <Link
                            href={alert.actionUrl || '#'}
                            className="inline-flex items-center gap-1 text-sm font-semibold mt-2 hover:underline"
                        >
                            {alert.actionLabel}
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
