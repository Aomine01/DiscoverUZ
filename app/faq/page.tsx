"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
    {
        question: "Do I need a visa to visit Uzbekistan?",
        answer:
            "Citizens of 90+ countries can visit Uzbekistan visa-free for up to 30 days for tourism purposes. This includes USA, Canada, UK, EU countries, Japan, South Korea, and many others. For longer stays or other purposes, you may need to apply for a visa. Check our visa information page or contact us for specific requirements based on your nationality.",
    },
    {
        question: "What is the best time to visit Uzbekistan?",
        answer:
            "The best times to visit are Spring (April-June) and Fall (September-November) when temperatures are mild and pleasant. Summer (July-August) can be very hot (35-40°C), while winter (December-February) can be cold, especially in the north. Spring is particularly beautiful with blossoming trees and green landscapes.",
    },
    {
        question: "Is Uzbekistan safe for tourists?",
        answer:
            "Yes! Uzbekistan is considered one of the safest countries in Central Asia for tourists. Crime rates are low, and locals are known for their hospitality. As with any destination, exercise common sense: keep valuables secure, use official taxis, and stay in well-lit areas at night. Women can travel safely, including solo.",
    },
    {
        question: "What currency is used in Uzbekistan?",
        answer:
            "The official currency is the Uzbekistani Som (UZS). ATMs are widely available in cities, and many accept international cards. Credit cards (Visa, Mastercard) are accepted in hotels, restaurants, and shops in major cities, but it's recommended to carry cash for smaller establishments and rural areas. US Dollars and Euros can be exchanged at banks and official exchange offices.",
    },
    {
        question: "How do I get around Uzbekistan?",
        answer:
            "Transportation options include: High-speed trains (Afrosiyob) connect Tashkent, Samarkand, and Bukhara - comfortable and fast. Domestic flights between major cities. Shared taxis for shorter distances. Rental cars with driver (recommended) or self-drive. Metro in Tashkent - cheap and beautiful stations.",
    },
    {
        question: "What languages are spoken?",
        answer:
            "Uzbek is the official language, but Russian is widely spoken, especially in cities. In tourist areas, you'll find English-speaking guides and hotel staff. Learning a few basic Uzbek or Russian phrases will be appreciated by locals. Our platform provides English-speaking guides for all tours.",
    },
    {
        question: "How can I book tours through Discover Uz?",
        answer:
            "Currently, you can browse our available tours on the \"For Tourists\" page. Our online booking system will be launched soon! For now, please contact us via email (info@discoveruz.com) or phone (+998 71 123 45 67) to reserve tours. Our team will assist you with customizing your itinerary, accommodation, and all arrangements.",
    },
    {
        question: "What should I pack for my trip?",
        answer:
            "Essential items: Comfortable walking shoes (lots of sightseeing!), sun protection (hat, sunglasses, sunscreen), light, modest clothing for religious sites, power adapter (220V, Type C/F plugs), any prescription medications, camera for incredible photo opportunities! Uzbekistan has four distinct seasons, so pack according to when you're visiting.",
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-600">
                        Find answers to common questions about traveling to Uzbekistan
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-bold text-lg">{faq.question}</span>
                                    <span
                                        className="material-symbols-outlined text-secondary transition-transform"
                                        style={{
                                            transform:
                                                openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                                        }}
                                    >
                                        expand_more
                                    </span>
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Still Have Questions */}
            <section className="py-16 bg-secondary text-white">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Our team is here to help you plan the perfect trip
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex h-14 px-8 bg-primary text-secondary font-bold rounded-lg hover:bg-yellow-400 transition-colors items-center gap-2"
                    >
                        <span>Contact Us</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </section>
        </div>
    );
}
