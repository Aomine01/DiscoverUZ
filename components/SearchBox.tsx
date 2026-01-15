"use client";

import React from "react";

export default function SearchBox() {
    return (
        <div className="relative z-20 mx-auto -mt-8 w-full max-w-5xl px-6">
            <div className="flex flex-col gap-2 rounded-xl bg-white p-3 shadow-2xl shadow-black/10 sm:flex-row sm:items-center">
                {/* Search Input */}
                <div className="flex flex-1 items-center gap-3 border-b border-gray-100 px-4 py-3 sm:border-b-0 sm:border-r">
                    <span className="material-symbols-outlined text-primary text-2xl">search</span>
                    <div className="flex w-full flex-col">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            Search
                        </label>
                        <input
                            className="w-full border-0 bg-transparent p-0 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                            placeholder="Destinations, tours, or hotels..."
                            type="text"
                        />
                    </div>
                </div>

                {/* Dates Input */}
                <div className="flex flex-1 items-center gap-3 border-b border-gray-100 px-4 py-3 sm:border-b-0 sm:border-r">
                    <span className="material-symbols-outlined text-primary text-2xl">calendar_month</span>
                    <div className="flex w-full flex-col">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            Dates
                        </label>
                        <input
                            className="w-full border-0 bg-transparent p-0 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                            placeholder="Add dates"
                            type="text"
                        />
                    </div>
                </div>

                {/* Guests Input */}
                <div className="flex flex-1 items-center gap-3 px-4 py-3">
                    <span className="material-symbols-outlined text-primary text-2xl">group</span>
                    <div className="flex w-full flex-col">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            Guests
                        </label>
                        <input
                            className="w-full border-0 bg-transparent p-0 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                            placeholder="Add guests"
                            type="text"
                        />
                    </div>
                </div>

                {/* Search Button */}
                <button className="h-12 w-full sm:w-auto rounded-lg bg-secondary px-8 font-bold text-white shadow-md hover:bg-blue-900 transition-colors sm:h-14">
                    Search
                </button>
            </div>
        </div>
    );
}

