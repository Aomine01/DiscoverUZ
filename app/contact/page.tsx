"use client";

import { useState } from "react";
import { ZodError } from "zod";
import YandexMap from "@/components/YandexMap";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/inputs";
import { sanitizeFormData } from "@/lib/utils/sanitize";
import { csrfFetch } from "@/lib/csrf-client";

// Toast notification types
type ToastType = "success" | "error" | "info";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

export default function ContactPage() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        subject: "" as any,
        message: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toasts, setToasts] = useState<Toast[]>([]);

    // Toast management
    const showToast = (message: string, type: ToastType = "info") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    // Helper to clear field-specific errors
    const clearError = (field: string) => {
        setErrors((prev) => {
            if (!prev || !prev[field]) return prev;
            const copy = { ...prev };
            delete copy[field];
            return copy;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        try {
            // 1. Sanitize input first (browser-safe DOMPurify)
            const sanitized = await sanitizeFormData(formData);

            // 2. Client-side validation with Zod
            const validated = contactFormSchema.parse(sanitized);

            // 3. Call API with CSRF protection
            const response = await csrfFetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(validated)
            });

            // Parse response
            const result = await response.json();

            if (!response.ok) {
                // Handle API errors
                if (response.status === 403) {
                    // CSRF or security error
                    showToast("Security token invalid. Please reload the page.", "error");
                    setErrors({
                        general: "Security verification failed. Please refresh the page and try again."
                    });
                } else if (response.status === 429) {
                    // Rate limiting
                    const errorMsg = result?.error || "You're sending messages too quickly. Please wait and try again.";
                    showToast(errorMsg, "error");
                    setErrors({ general: errorMsg });
                } else if (response.status === 400) {
                    // Validation errors
                    if (result?.fields) {
                        setErrors(result.fields);
                        showToast("Please check your inputs and try again.", "error");
                    } else {
                        const errorMsg = result?.error || "Invalid form data.";
                        setErrors({ general: errorMsg });
                        showToast(errorMsg, "error");
                    }
                } else {
                    // Generic server error
                    const errorMsg = result?.error || "Something went wrong. Please try again.";
                    setErrors({ general: errorMsg });
                    showToast(errorMsg, "error");
                }
                setIsSubmitting(false);
                return;
            }

            // SUCCESS!
            showToast(
                result.message || "Thank you for your message! We'll get back to you within 24 hours.",
                "success"
            );

            // Reset form on success
            setFormData({ name: "", email: "", subject: "" as any, message: "" });
            setIsSubmitting(false);

        } catch (error: any) {
            // Handle client-side errors
            if (error instanceof ZodError) {
                // Zod validation errors
                const fieldErrors: Record<string, string> = {};
                error.issues.forEach((issue) => {
                    const fieldName = issue.path[0] as string;
                    if (fieldName && !fieldErrors[fieldName]) {
                        fieldErrors[fieldName] = issue.message;
                    }
                });
                setErrors(fieldErrors);
                showToast("Please fix the errors in the form.", "error");
            } else if (error.message?.includes('CSRF token not found')) {
                // CSRF token missing
                showToast("Security verification failed. Please reload the page.", "error");
                setErrors({
                    general: "Security token missing. Please refresh the page and try again."
                });
            } else {
                // Network or unknown error
                showToast("Network error. Please check your connection and try again.", "error");
                setErrors({ general: "Network error. Please try again." });
            }
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-20">
            {/* Toast Container */}
            <div className="fixed top-20 right-4 z-50 space-y-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`min-w-[300px] max-w-md px-4 py-3 rounded-lg shadow-lg flex items-center justify-between animate-in slide-in-from-right ${toast.type === "success"
                                ? "bg-green-500 text-white"
                                : toast.type === "error"
                                    ? "bg-red-500 text-white"
                                    : "bg-blue-500 text-white"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-xl">
                                {toast.type === "success" ? "check_circle" : toast.type === "error" ? "error" : "info"}
                            </span>
                            <span className="font-medium">{toast.message}</span>
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-4 hover:opacity-80 transition-opacity"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                    </div>
                ))}
            </div>

            {/* Hero */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
                        Get In Touch
                    </h1>
                    <p className="text-xl text-gray-600">
                        We&apos;re here to help. Reach out to us anytime!
                    </p>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-bold text-secondary mb-6">
                                Send Us a Message
                            </h2>

                            {/* General error */}
                            {errors.general && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2">
                                    <span className="material-symbols-outlined text-red-500">error</span>
                                    <span>{errors.general}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            clearError('name');
                                        }}
                                        disabled={isSubmitting}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                            } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">error</span>
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            clearError('email');
                                        }}
                                        disabled={isSubmitting}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                            } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">error</span>
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <select
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => {
                                            setFormData({ ...formData, subject: e.target.value as any });
                                            clearError('subject');
                                        }}
                                        disabled={isSubmitting}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                            } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="booking">Booking Question</option>
                                        <option value="partnership">Partnership Opportunity</option>
                                        <option value="support">Technical Support</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.subject && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">error</span>
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => {
                                            setFormData({ ...formData, message: e.target.value });
                                            clearError('message');
                                        }}
                                        disabled={isSubmitting}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                            } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                                        placeholder="Tell us how we can help..."
                                    ></textarea>
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">error</span>
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full h-12 font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-secondary text-white hover:bg-blue-900 hover:shadow-lg'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <span className="material-symbols-outlined">send</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-secondary mb-6">
                                    Contact Information
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <span className="material-symbols-outlined">location_on</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-1">Main Office</h3>
                                            <p className="text-gray-600">
                                                123 Amir Temur Avenue
                                                <br />
                                                Tashkent, 100000
                                                <br />
                                                Uzbekistan
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <span className="material-symbols-outlined">phone</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-1">Phone</h3>
                                            <p className="text-gray-600">
                                                +998 71 123 45 67
                                                <br />
                                                +998 90 123 45 67
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <span className="material-symbols-outlined">email</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-1">Email</h3>
                                            <p className="text-gray-600">
                                                info@discoveruz.com
                                                <br />
                                                support@discoveruz.com
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <span className="material-symbols-outlined">schedule</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-1">Business Hours</h3>
                                            <p className="text-gray-600">
                                                Monday - Friday: 9:00 AM - 6:00 PM
                                                <br />
                                                Saturday: 10:00 AM - 4:00 PM
                                                <br />
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-secondary text-white p-6 rounded-xl">
                                <h3 className="text-xl font-bold mb-3">24/7 Emergency Support</h3>
                                <p className="text-blue-100 mb-4">
                                    Need urgent assistance while traveling?
                                </p>
                                <a
                                    href="tel:+998901234567"
                                    className="inline-flex items-center gap-2 h-10 px-4 bg-primary text-secondary font-bold rounded-lg hover:bg-yellow-400 transition-colors"
                                >
                                    <span className="material-symbols-outlined">phone_in_talk</span>
                                    <span>Call Now</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Map Section */}
            <section className="py-16 bg-gradient-to-br from-secondary to-blue-900">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Map Container */}
                        <div className="order-2 lg:order-1">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                Find Us on the Map
                            </h2>
                            <div className="relative overflow-hidden rounded-xl shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/20 pointer-events-none z-10"></div>
                                <div className="relative h-[450px] w-full">
                                    <YandexMap
                                        center={[41.320043, 69.262534]}
                                        zoom={17}
                                        className="rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <a
                                    href="https://yandex.uz/maps/?ll=69.262534%2C41.320043&z=16&pt=69.262534,41.320043,pm2ywm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-secondary font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-lg"
                                >
                                    <span className="material-symbols-outlined">open_in_new</span>
                                    <span>Open in Yandex Maps</span>
                                </a>
                            </div>
                        </div>

                        {/* Contact Details Card */}
                        <div className="order-1 lg:order-2">
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-xl">
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    Visit Our Office
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                                            <span className="material-symbols-outlined">location_on</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white mb-1">Address</h3>
                                            <p className="text-blue-100">
                                                Alisher Navoi Street, 11A
                                                <br />
                                                Shaykhontohur District
                                                <br />
                                                Tashkent, 100011, Uzbekistan
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                                            <span className="material-symbols-outlined">schedule</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white mb-1">Working Hours</h3>
                                            <p className="text-blue-100">
                                                Monday - Friday: 9:00 AM - 6:00 PM
                                                <br />
                                                Saturday: 10:00 AM - 2:00 PM
                                                <br />
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                                            <span className="material-symbols-outlined">directions</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white mb-1">Getting Here</h3>
                                            <p className="text-blue-100">
                                                Near Webster University and Great Gatsby restaurant. Easily accessible by metro via Pakhtakor station (10 min walk).
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <a
                                        href="https://yandex.uz/maps/?rtext=~41.320043,69.262534&rtt=auto"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                                    >
                                        <span className="material-symbols-outlined">navigation</span>
                                        <span>Get Directions</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
