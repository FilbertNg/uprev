"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function SpotlightGrid() {
    const { x, y } = useMousePosition();
    const isMobile = useMediaQuery("(max-width: 768px)");

    // Provide a fallback center position for mobile/initial load
    const posX = isMobile ? "50%" : `${x}px`;
    const posY = isMobile ? "30%" : `${y}px`;

    return (
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-[var(--color-carbon)]">
            {/* Radial Gradient Spotlight */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(400px circle at ${posX} ${posY}, rgba(255, 87, 34, 0.15), transparent 80%)`,
                }}
            />

            {/* Dot Matrix Layer */}
            <div
                className="absolute inset-0 z-0 h-full w-full"
                style={{
                    backgroundImage: "radial-gradient(var(--color-border-light) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                    opacity: 0.5
                }}
            />

            {/* Top and Bottom Fade masks so grid blends into content */}
            <div className="absolute inset-x-0 bottom-0 top-auto z-10 h-32 bg-gradient-to-t from-[var(--color-carbon)] to-transparent" />
            <div className="absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[var(--color-carbon)] to-transparent" />
        </div>
    );
}
