"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function MagneticCursor() {
    const { x, y } = useMousePosition();
    const isTouchDevice = useMediaQuery("(pointer: coarse)");
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Use springs for smooth following
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        if (x !== 0 || y !== 0) setIsVisible(true);

        // Offset by cursor visual center
        const size = isHovering ? 48 : 6;
        cursorX.set(x - size / 2);
        cursorY.set(y - size / 2);
    }, [x, y, isHovering, cursorX, cursorY]);

    useEffect(() => {
        // Global listener to detect hover on interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering a link, button, or element with data-magnetic
            const isInteractive = target.closest("a, button, [data-magnetic]");
            setIsHovering(!!isInteractive);
        };

        window.addEventListener("mouseover", handleMouseOver);
        return () => window.removeEventListener("mouseover", handleMouseOver);
    }, []);

    if (isTouchDevice || !isVisible) return null;

    return (
        <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full mix-blend-difference"
            style={{
                x: smoothX,
                y: smoothY,
                width: isHovering ? 48 : 6,
                height: isHovering ? 48 : 6,
                backgroundColor: isHovering ? "transparent" : "var(--color-tiger-flame)",
                border: isHovering ? "1px solid var(--color-tiger-flame)" : "none",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        />
    );
}
