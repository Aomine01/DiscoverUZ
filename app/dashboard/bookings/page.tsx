'use client';

import { useState } from 'react';
import { Calendar, MapPin, Users, Shield, Clock, CreditCard, Download, ChevronRight, Filter } from 'lucide-react';
import Link from 'next/link';
import type { Booking, BookingStatus, EscrowStatus } from '@/types/dashboard';

// Mock bookings data
const mockBookings: Booking[] = [
    {
        id: '1',
        userId: 'user1',
        type: 'tour',
        status: 'FUNDS_HELD',
        title: 'Silk Road Heritage Tour',
        description: '7-day cultural immersion through Samarkand, Bukhara, and Khiva',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjMudJMgLSFp9ROhxYF7GHuFCY6qt3ChqxTvGKo3innDCe_eQthAgWrpFyywKoNeJYw9eGsmxVYv0AbAh2y7fs5emXQtjLbn11GiOJKlMVEwH8xcTj3gEaTp08rCCPe4fefcRifpxlJWJxCxtEpDcQ57-e9VcEDTxF3dC15eK79KmVZJI393uanfUwnjtXMpd7EY45juT3Sw1CveHcWJcs8zY0QZcgGl1EF0x39UHwlmU80mwHfduZK5q8IKfUd1V7YIzPrnZcVHo',
        category: 'Cultural',
        startDate: new Date('2026-02-15'),
        endDate: new Date('2026-02-22'),
        bookingDate: new Date('2026-01-10'),
        price: 1250,
        currency: 'USD',
        totalPaid: 1250,
        isEscrowProtected: true,
        escrowStatus: 'FUNDS_HELD',
        escrowReleaseDate: new Date('2026-02-23'),
        guestsCount: 2,
        provider: {
            id: 'p1',
            name: 'SilkRoad Adventures',
            rating: 4.9,
            isVerified: true,
        },
        isLocalEvent: false,
        requiresSubscription: false,
        location: {
            city: 'Samarkand',
            address: 'Registan Square',
        },
        confirmationNumber: 'SR-2026-001',
        cancellationPolicy: 'moderate',
    },
    {
        id: '2',
        userId: 'user1',
        type: 'event',
        status: 'CONFIRMED',
        title: 'Chimgan Mountains Weekend Hike',
        description: 'Local Insider exclusive: Group hiking trip with fellow members',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfY8XaTZrXB297ojDiw0QTPcCfiwtpeoGj5RMcWAIim7vRx0lZLWZzz63UbvXfbNs3Z85X4A6U6xMZvPGAnGLpSZJlfHNs_0A4EoyznIrRr-5N8g-URVvlCyYBFQY3QxrLeS7bQgh67oiVgnmYDaFTrGdU5w4IxuHj-XnHuKNDNwA2HEfTI3VflfbWV4XZB6FPuefRrcIubG1mxVfBfzm7yRNBxmDGGZoPB0yk98bsR4IgUm-OGybXyokNRREDEQKM9AkX_F2Hibo',
        category: 'Adventure',
        startDate: new Date('2026-01-25'),
        endDate: new Date('2026-01-26'),
        bookingDate: new Date('2026-01-12'),
        price: 0,
        currency: 'USD',
        totalPaid: 0,
        isEscrowProtected: false,
        escrowStatus: 'NOT_APPLICABLE',
        guestsCount: 1,
        provider: {
            id: 'local',
            name: 'DiscoverUz Local Events',
            rating: 5.0,
            isVerified: true,
        },
        isLocalEvent: true,
        requiresSubscription: true,
        location: {
            city: 'Chimgan',
            address: 'Meeting Point: Tashkent City Center',
        },
        cancellationPolicy: 'flexible',
    },
];

const tabs = [
    { id: 'all', label: 'All Bookings' },
    { id: 'tours', label: 'Tours' },
    { id: 'events', label: 'Events (Local)' },
];

const statusConfig: Record<BookingStatus, { label: string; color: string; bg: string }> = {
    'PENDING_PAYMENT': { label: 'Pending Payment', color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200' },
    'PAYMENT_PROCESSING': { label: 'Processing', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
    'FUNDS_HELD': { label: 'Escrow Active', color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
    'CONFIRMED': { label: 'Confirmed', color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
    'IN_PROGRESS': { label: 'In Progress', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
    'AWAITING_FULFILLMENT': { label: 'Awaiting Start', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' },
    'COMPLETED': { label: 'Completed', color: 'text-gray-700', bg: 'bg-gray-50 border-gray-200' },
    'FUNDS_RELEASED': { label: 'Payment Released', color: 'text-gray-700', bg: 'bg-gray-50 border-gray-200' },
    'CANCELLED': { label: 'Cancelled', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
    'REFUND_PENDING': { label: 'Refund Pending', color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200' },
    'REFUNDED': { label: 'Refunded', color: 'text-gray-700', bg: 'bg-gray-50 border-gray-200' },
};

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState('all');

    const filteredBookings = mockBookings.filter((booking) => {
        if (activeTab === 'all') return true;
        if (activeTab === 'tours') return booking.type === 'tour';
        if (activeTab === 'events') return booking.isLocalEvent;
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="px-8 py-6">
                    <h1 className="text-2xl font-bold text-secondary">My Trips & Bookings</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Manage your upcoming adventures and past experiences
                    </p>
                </div>
            </header>

            <div className="p-8">
                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                    <nav className="flex gap-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                  pb-4 px-1 border-b-2 font-semibold text-sm transition-colors
                  ${activeTab === tab.id
                                        ? 'border-secondary text-secondary'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Bookings Grid */}
                {filteredBookings.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredBookings.map((booking) => (
                            <BookingCard key={booking.id} booking={booking} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
                        <p className="text-gray-600 mb-6">Start planning your next adventure!</p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors"
                        >
                            Explore Tours
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

// Booking Card Component
function BookingCard({ booking }: { booking: Booking }) {
    const status = statusConfig[booking.status];
    const daysUntilStart = Math.ceil((booking.startDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex gap-6 p-6">
                {/* Image */}
                <div className="relative w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                        src={booking.image}
                        alt={booking.title}
                        className="w-full h-full object-cover"
                    />
                    {booking.isLocalEvent && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-secondary/90 backdrop-blur-sm rounded flex items-center gap-1">
                            <span className="text-[10px] font-bold text-white">LOCAL INSIDER</span>
                        </div>
                    )}
                    {booking.isEscrowProtected && (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-green-500/90 backdrop-blur-sm rounded flex items-center gap-1">
                            <Shield className="w-3 h-3 text-white" />
                            <span className="text-[10px] font-bold text-white">ESCROW</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{booking.title}</h3>
                            <p className="text-sm text-gray-600">{booking.description}</p>
                        </div>
                        <div className={`px-3 py-1.5 rounded-lg border ${status.bg}`}>
                            <p className={`text-xs font-semibold ${status.color}`}>{status.label}</p>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <DetailItem
                            icon={<Calendar className="w-4 h-4" />}
                            label="Start Date"
                            value={booking.startDate.toLocaleDateString()}
                        />
                        <DetailItem
                            icon={<MapPin className="w-4 h-4" />}
                            label="Location"
                            value={booking.location.city}
                        />
                        <DetailItem
                            icon={<Users className="w-4 h-4" />}
                            label="Guests"
                            value={`${booking.guestsCount} ${booking.guestsCount === 1 ? 'person' : 'people'}`}
                        />
                        <DetailItem
                            icon={<CreditCard className="w-4 h-4" />}
                            label="Total"
                            value={booking.totalPaid > 0 ? `$${booking.totalPaid}` : 'Free'}
                        />
                    </div>

                    {/* Escrow Info (for protected bookings) */}
                    {booking.isEscrowProtected && booking.escrowStatus === 'FUNDS_HELD' && (
                        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200 flex items-start gap-3">
                            <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-green-900">
                                    Your payment is protected by Escrow
                                </p>
                                <p className="text-xs text-green-700 mt-1">
                                    Funds will be released to the provider after tour completion on{' '}
                                    {booking.escrowReleaseDate?.toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Days Until Start */}
                    {booking.status === 'FUNDS_HELD' || booking.status === 'CONFIRMED' && daysUntilStart > 0 && (
                        <div className="mb-4 p-3 bg-primary/10 rounded-lg flex items-center gap-2">
                            <Clock className="w-5 h-5 text-secondary" />
                            <p className="text-sm font-medium text-secondary">
                                Starts in <span className="font-bold">{daysUntilStart}</span> days
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Link
                            href={`/dashboard/bookings/${booking.id}`}
                            className="px-4 py-2 bg-secondary text-white text-sm font-semibold rounded-lg hover:bg-blue-900 transition-colors flex items-center gap-2"
                        >
                            View Details
                            <ChevronRight className="w-4 h-4" />
                        </Link>

                        {booking.confirmationNumber && (
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Invoice
                            </button>
                        )}

                        {booking.provider.isVerified && (
                            <div className="ml-auto flex items-center gap-2 text-sm text-gray-600">
                                <Shield className="w-4 h-4 text-blue-500" />
                                <span>Verified Provider</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Detail Item Component
function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-start gap-2">
            <div className="text-gray-400 mt-0.5">{icon}</div>
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-sm font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    );
}
