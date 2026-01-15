import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ===== EXTERNAL PACKAGES =====
  // Handle packages that need to be external (not bundled)
  serverExternalPackages: ['isomorphic-dompurify'],

  // ===== TURBOPACK CONFIGURATION =====
  // Empty config to silence Turbopack warning
  turbopack: {},

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/aida-public/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 60, // 60 days
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ===== SECURITY HEADERS =====
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Strict Transport Security (HSTS) - Force HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          // Prevent clickjacking attacks
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN"
          },
          // Prevent MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          // Control referrer information
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          // Feature/Permissions Policy - Disable dangerous features
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), payment=()"
          },
          // XSS Protection (legacy, but doesn't hurt)
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          // Content Security Policy
          // Note: In production, replace 'unsafe-inline' with nonces
          // For now, allowing Yandex Maps scripts
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' api-maps.yandex.ru *.yandex.ru",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' *.yandex.ru api-maps.yandex.ru",
              "frame-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
            ].join("; ")
          }
        ],
      },
    ];
  },
};

export default nextConfig;


