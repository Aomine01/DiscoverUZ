"use client";

import { useState } from "react";
import { ZodError } from "zod";
import YandexMap from "@/components/YandexMap";
import { contactFormSchema } from "@/lib/validations/inputs";
import { sanitizeFormData } from "@/lib/utils/sanitize";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Helper to clear field-specific errors (prevents stale errors in Playwright tests)
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
            // 1. Sanitize input first (dynamic import, browser-only)
            const sanitized = await sanitizeFormData(formData);

            // 2. Validate with Zod
            const validated = contactFormSchema.parse(sanitized);

            // 3. Call the API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(validated)
            });

            // DEBUG: Log raw response (TEMP)
            let resultText: string;
            try {
                resultText = await response.text();
                console.debug('[DEBUG][CLIENT] /api/contact response', {
                    status: response.status,
                    statusText: response.statusText,
                    textPreview: resultText.substring(0, 200)
                });
            } catch (e) {
                console.error('[DEBUG][CLIENT] Failed to read response text', e);
                resultText = '';
            }

            // Parse JSON
            let result: any;
            try {
                result = resultText ? JSON.parse(resultText) : null;
            } catch (e) {
                console.error('[DEBUG][CLIENT] Failed to parse JSON', e);
                result = null;
            }

            if (!response.ok) {
                // Handle API errors (including rate limiting and validation)
                console.debug('[DEBUG][CLIENT] Handling error response', {
                    status: response.status,
                    result
                });

                if (response.status === 429) {
                    const errorMsg = result?.error || "Too many requests. Please wait and try again later.";
                    console.debug('[DEBUG][CLIENT] Setting 429 error', { errorMsg });
                    setErrors({ general: errorMsg });
                } else if (response.status === 400) {
                    // Handle validation errors with field mapping
                    if (result?.fields) {
                        console.debug('[DEBUG][CLIENT] Setting field errors', result.fields);
                        setErrors(result.fields);
                    } else {
                        const errorMsg = result?.error || "Invalid form data.";
                        console.debug('[DEBUG][CLIENT] Setting general 400 error', { errorMsg });
                        setErrors({ general: errorMsg });
                    }
                } else {
                    const errorMsg = result?.error || "Something went wrong. Please try again.";
                    console.debug('[DEBUG][CLIENT] Setting general error', { errorMsg });
                    setErrors({ general: errorMsg });
                }
                setIsSubmitting(false);
                return;
            }

            // Success!
            alert(result.message || "Thank you for your message! We'll get back to you within 24 hours.");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error: any) {
            // Handle Zod validation errors
            if (error instanceof ZodError) {
                // Extract field-specific error messages from Zod issues
                const fieldErrors: Record<string, string> = {};

                error.issues.forEach((issue) => {
                    const fieldName = issue.path[0] as string;
                    if (fieldName) {
                        // Use the first error message for each field
                        if (!fieldErrors[fieldName]) {
                            fieldErrors[fieldName] = issue.message;
                        }
                    }
                });

                setErrors(fieldErrors);
                setIsSubmitting(false);
                return; // Early return - keep errors visible
            } else {
                // Unknown error - show generic message
                setErrors({ general: "Network error. Please try again." });
                setIsSubmitting(false);
                return;
            }
        }
        // No finally block - explicit state management per branch
    };

    return (
        <div className="pt-20">
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
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                    {errors.general}
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
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
                                            setFormData({ ...formData, subject: e.target.value });
                                            clearError('subject');
                                        }}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.subject ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="booking">Booking Question</option>
                                        <option value="partnership">Partnership Opportunity</option>
                                        <option value="support">Technical Support</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.subject && (
                                        <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.message ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Tell us how we can help..."
                                    ></textarea>
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full h-12 font-bold rounded-lg transition-colors ${isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-secondary text-white hover:bg-blue-900'
                                        }`}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
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
                                {/* Gradient overlay for premium effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/20 pointer-events-none z-10"></div>

                                {/* Yandex Map */}
                                <div className="relative h-[450px] w-full">
                                    <YandexMap
                                        center={[41.320043, 69.262534]}
                                        zoom={17}
                                        className="rounded-xl"
                                    />
                                </div>
                            </div>

                            {/* Open in Yandex Maps Button */}
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

                                {/* Get Directions Button */}
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
