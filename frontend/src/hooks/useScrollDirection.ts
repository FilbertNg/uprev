"use client";

import { useEffect, useState } from "react";

export function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const updateScrollDirection = () => {
            const scrollY = window.scrollY;
            const direction = scrollY > lastScrollY ? "down" : "up";

            if (typeof window !== "undefined") {
                setIsAtTop(scrollY < 50);
            }

            if (
                direction !== scrollDirection &&
                (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
            ) {
                setScrollDirection(direction);
            }
            setLastScrollY(scrollY > 0 ? scrollY : 0);
        };

        // Use passive listener for performance
        window.addEventListener("scroll", updateScrollDirection, { passive: true });
        return () => {
            window.removeEventListener("scroll", updateScrollDirection);
        };
    }, [scrollDirection, lastScrollY]);

    return { scrollDirection, isAtTop };
}
