"use client";

import { useEffect, useRef } from "react";

interface YandexMapProps {
    center: [number, number];
    zoom?: number;
    className?: string;
}

declare global {
    interface Window {
        ymaps: any;
    }
}

export default function YandexMap({
    center,
    zoom = 16,
    className = "",
}: YandexMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);

    useEffect(() => {
        // Load Yandex Maps API
        const loadYandexMaps = () => {
            // Check if API is already loaded
            if (typeof window.ymaps !== "undefined") {
                initMap();
                return;
            }

            // Check if script is already being loaded (prevent duplicates)
            const existingScript = document.querySelector(
                'script[src*="api-maps.yandex.ru"]'
            );
            if (existingScript) {
                // Script exists, wait for it to load
                existingScript.addEventListener("load", () => {
                    window.ymaps?.ready(initMap);
                });
                return;
            }

            // Create and add script
            const script = document.createElement("script");
            script.src =
                "https://api-maps.yandex.ru/2.1/?apikey=&lang=en_US";
            script.async = true;
            script.onload = () => {
                window.ymaps.ready(initMap);
            };
            document.head.appendChild(script);
        };

        const initMap = () => {
            if (!mapRef.current || mapInstanceRef.current) return;

            // Create map with custom dark theme
            const map = new window.ymaps.Map(
                mapRef.current,
                {
                    center: center,
                    zoom: zoom,
                    controls: ["zoomControl"],
                },
                {
                    suppressMapOpenBlock: true,
                    // Apply dark custom map style
                    restrictMapArea: false,
                }
            );

            // Custom map style for dark blue theme (like Aloqa Ventures)
            const customStyle = [
                {
                    tags: {
                        all: ["landscape"],
                    },
                    stylers: {
                        color: "#0a1929", // Very dark blue background
                        saturation: -0.1,
                    },
                },
                {
                    tags: {
                        all: ["water"],
                    },
                    stylers: {
                        color: "#0d2238", // Slightly lighter blue for water
                    },
                },
                {
                    tags: {
                        all: ["road"],
                    },
                    stylers: {
                        color: "#1e3a5c", // Medium dark blue for roads
                        visibility: "on",
                    },
                },
                {
                    tags: {
                        all: ["road", "highway"],
                    },
                    stylers: {
                        color: "#2a4a6f", // Lighter blue for highways
                    },
                },
                {
                    tags: {
                        all: ["building"],
                    },
                    stylers: {
                        color: "#152638", // Dark blue for buildings
                        visibility: "on",
                    },
                },
                {
                    tags: {
                        all: ["poi"],
                    },
                    stylers: {
                        visibility: "off",
                    },
                },
                {
                    tags: {
                        all: ["transit"],
                    },
                    stylers: {
                        visibility: "off",
                    },
                },
            ];

            // Try to set custom map type (if available)
            try {
                const customMapType = new window.ymaps.MapType("Custom", [
                    "yandex#map",
                ]);
                map.options.set("customization", customStyle);
            } catch (e) {
                // Fallback to setting options directly
                console.log("Custom style applied via options");
            }

            // Create custom placemark with branded colors
            const placemark = new window.ymaps.Placemark(
                center,
                {
                    balloonContentHeader:
                        '<div style="font-weight: bold; font-size: 16px; color: #1E3A8A;">DiscoverUz</div>',
                    balloonContentBody:
                        '<div style="color: #4B5563;">Alisher Navoi Street, 11A<br>Shaykhontohur District<br>Tashkent, 100011, Uzbekistan</div>',
                    balloonContentFooter:
                        '<div style="color: #6B7280; font-size: 12px; margin-top: 8px;">Near Webster University · Pakhtakor Metro</div>',
                    hintContent: "DiscoverUz - Alisher Navoi St, 11A",
                },
                {
                    preset: "islands#circleIcon",
                    iconColor: "#f2cc0d", // Your yellow brand color for the pin
                }
            );

            map.geoObjects.add(placemark);

            // Store map instance
            mapInstanceRef.current = map;

            // Clean premium styling for controls only (light theme)
            const style = document.createElement("style");
            style.textContent = `
        /* Container background */
        .ymaps-2-1-79-map {
          background: #f8f9fa !important;
        }
        
        /* Style zoom controls with brand colors */
        .ymaps-2-1-79-zoom {
          background: white !important;
          border: 1px solid rgba(30, 58, 138, 0.15) !important;
          border-radius: 8px !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
        }
        
        .ymaps-2-1-79-zoom__button {
          background: transparent !important;
          color: #1E3A8A !important;
          border: none !important;
          font-weight: 500 !important;
          transition: all 0.2s ease;
        }
        
        .ymaps-2-1-79-zoom__button:hover {
          background: rgba(242, 204, 13, 0.1) !important;
          color: #1E3A8A !important;
        }
        
        .ymaps-2-1-79-zoom__minus,
        .ymaps-2-1-79-zoom__plus {
          border-color: rgba(30, 58, 138, 0.1) !important;
        }
        
        /* Style balloon/popup */
        .ymaps-2-1-79-balloon__content {
          background: white !important;
          border-radius: 8px;
          padding: 4px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }
        
        .ymaps-2-1-79-balloon__tail {
          background: white !important;
        }
        
        /* Copyright styling */
        .ymaps-2-1-79-copyrights-pane {
          opacity: 0.6;
        }
        
        /* Style controls */
        .ymaps-2-1-79-controls__control {
          background: white !important;
        }
      `;
            document.head.appendChild(style);
        };

        loadYandexMaps();

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.destroy();
                mapInstanceRef.current = null;
            }
        };
    }, [center, zoom]);

    return (
        <div
            ref={mapRef}
            className={className}
            style={{ width: "100%", height: "100%" }}
        />
    );
}
