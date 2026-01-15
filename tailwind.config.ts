import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#f2cc0d", // Sunny Yellow
                secondary: "#1E3A8A", // Deep Blue
                "background-light": "#FFFFFF",
                "background-subtle": "#F8F9FA",
                "background-dark": "#111827",
                "text-main": "#1F2937",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                display: ["Inter", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.375rem",
                lg: "0.5rem",
                xl: "0.75rem",
                "2xl": "1rem",
                full: "9999px",
            },
        },
    },
    plugins: [],
} satisfies Config;
