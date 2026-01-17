import { getSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
    const session = await getSession();

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-background-light">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-secondary">Dashboard</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Welcome back, <span className="font-bold text-primary">{session.email}</span>
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Dashboard Cards */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-secondary">Profile</h2>
                        <p className="mt-2 text-gray-600">Manage your account settings</p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-secondary">Bookings</h2>
                        <p className="mt-2 text-gray-600">View your travel bookings</p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-secondary">Favorites</h2>
                        <p className="mt-2 text-gray-600">Your saved destinations</p>
                    </div>
                </div>

                <div className="mt-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
