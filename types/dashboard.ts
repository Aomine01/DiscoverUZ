/**
 * Dashboard Type Definitions
 * Unified types for Tourist and Local personas
 */

// ============================================
// USER & SUBSCRIPTION TYPES
// ============================================

export type SubscriptionTier = 'free' | 'insider' | 'premium';

export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'pending';

export interface Subscription {
    id: string;
    tier: SubscriptionTier;
    status: SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    billingCycle: 'monthly' | 'annual';
    price: number;
    currency: string;
    autoRenew: boolean;
    benefits: string[];
}

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    phone?: string;

    // Persona flags
    isResident: boolean;
    isVerified: boolean;

    // Subscription data
    subscriptionTier: SubscriptionTier;
    subscription?: Subscription;

    // Trust & Verification
    verificationStatus: 'unverified' | 'pending' | 'verified';
    verifiedAt?: Date;
    trustScore: number; // 0-100

    // Metadata
    createdAt: Date;
    lastLogin: Date;
}

// ============================================
// BOOKING & ESCROW TYPES
// ============================================

export type BookingType = 'tour' | 'event' | 'experience' | 'accommodation';

export type BookingStatus =
    | 'PENDING_PAYMENT'
    | 'PAYMENT_PROCESSING'
    | 'FUNDS_HELD' // Escrow active
    | 'CONFIRMED'
    | 'IN_PROGRESS'
    | 'AWAITING_FULFILLMENT' // Tour not yet completed
    | 'COMPLETED'
    | 'FUNDS_RELEASED' // Escrow released to provider
    | 'CANCELLED'
    | 'REFUND_PENDING'
    | 'REFUNDED';

export type EscrowStatus =
    | 'NOT_APPLICABLE' // For free events
    | 'FUNDS_HELD'
    | 'FUNDS_RELEASED'
    | 'REFUND_INITIATED'
    | 'REFUNDED';

export interface Booking {
    id: string;
    userId: string;
    type: BookingType;
    status: BookingStatus;

    // Booking details
    title: string;
    description: string;
    image: string;
    category: string;

    // Timing
    startDate: Date;
    endDate: Date;
    bookingDate: Date;

    // Pricing
    price: number;
    currency: string;
    discountApplied?: number;
    totalPaid: number;

    // Escrow protection (for standard tours)
    isEscrowProtected: boolean;
    escrowStatus: EscrowStatus;
    escrowReleaseDate?: Date;

    // Participants
    guestsCount: number;
    participants?: Array<{
        name: string;
        email: string;
    }>;

    // Provider info
    provider: {
        id: string;
        name: string;
        avatar?: string;
        rating: number;
        isVerified: boolean;
    };

    // Special flags
    isLocalEvent: boolean; // True for subscriber-only events
    requiresSubscription: boolean;

    // Location
    location: {
        city: string;
        address?: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };

    // Documents
    confirmationNumber?: string;
    invoice?: {
        id: string;
        url: string;
    };

    // Cancellation
    cancellationPolicy: 'flexible' | 'moderate' | 'strict';
    refundableUntil?: Date;
}

// ============================================
// PAYMENT & WALLET TYPES
// ============================================

export type PaymentMethod = 'card' | 'balance' | 'bank_transfer';

export interface SavedCard {
    id: string;
    last4: string;
    brand: string; // 'visa', 'mastercard', 'uzcard'
    expiryMonth: number;
    expiryYear: number;
    isDefault: boolean;
    holderName: string;
}

export type TransactionType =
    | 'BOOKING_PAYMENT'
    | 'SUBSCRIPTION_PAYMENT'
    | 'REFUND'
    | 'WALLET_TOPUP'
    | 'ESCROW_HOLD'
    | 'ESCROW_RELEASE';

export type TransactionStatus =
    | 'PENDING'
    | 'PROCESSING'
    | 'COMPLETED'
    | 'FAILED'
    | 'CANCELLED';

export interface Transaction {
    id: string;
    userId: string;
    type: TransactionType;
    status: TransactionStatus;

    amount: number;
    currency: string;

    description: string;
    metadata?: {
        bookingId?: string;
        subscriptionId?: string;
    };

    paymentMethod: PaymentMethod;

    createdAt: Date;
    completedAt?: Date;

    // Receipt
    invoiceUrl?: string;
    receiptUrl?: string;
}

export interface Wallet {
    userId: string;
    balance: number;
    currency: string;
    pendingBalance: number; // Funds in escrow
    savedCards: SavedCard[];
    recentTransactions: Transaction[];
}

// ============================================
// WISHLIST & SAVED ITEMS
// ============================================

export interface WishlistItem {
    id: string;
    userId: string;
    itemId: string;
    itemType: 'tour' | 'event' | 'experience';

    title: string;
    image: string;
    price: number;
    currency: string;

    isAvailable: boolean;
    requiresSubscription: boolean;

    savedAt: Date;

    // Quick preview data
    location: string;
    rating: number;
    reviewCount: number;
}

// ============================================
// DASHBOARD WIDGETS
// ============================================

export interface UpcomingTrip {
    bookingId: string;
    title: string;
    image: string;
    startDate: Date;
    location: string;
    daysUntilStart: number;
    status: BookingStatus;
}

export interface Alert {
    id: string;
    type: 'info' | 'warning' | 'success' | 'error';
    title: string;
    message: string;
    actionLabel?: string;
    actionUrl?: string;
    createdAt: Date;
    isRead: boolean;
}

export interface DashboardStats {
    totalTrips: number;
    activeBookings: number;
    completedTrips: number;
    walletBalance: number;
    trustScore: number;
    localEventAttendance?: number; // Only for residents
}
