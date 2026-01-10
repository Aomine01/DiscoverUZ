"use client";

import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(
            "Thank you for your message! We'll get back to you within 24 hours.\n\nNote: Form submission will be implemented in the backend phase."
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
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
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <select
                                        required
                                        value={formData.subject}
                                        onChange={(e) =>
                                            setFormData({ ...formData, subject: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="booking">Booking Question</option>
                                        <option value="partnership">Partnership Opportunity</option>
                                        <option value="support">Technical Support</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({ ...formData, message: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Tell us how we can help..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full h-12 bg-secondary text-white font-bold rounded-lg hover:bg-blue-900 transition-colors"
                                >
                                    Send Message
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

            {/* Map Placeholder */}
            <section className="py-16 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="h-96 bg-gray-200 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                            <span className="material-symbols-outlined text-6xl text-gray-400 mb-4 block">
                                map
                            </span>
                            <p className="text-gray-500">
                                Map integration will be added in future update
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
