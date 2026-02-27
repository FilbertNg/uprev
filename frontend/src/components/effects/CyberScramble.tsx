"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CyberScrambleProps {
    finalNumber: number;
    duration?: number;
    className?: string;
    prefix?: string;
}

export function CyberScramble({ finalNumber, duration = 1.5, className = "", prefix = "" }: CyberScrambleProps) {
    const [displayValue, setDisplayValue] = useState("0");
    const [isScrambling, setIsScrambling] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;
        const scrambleChars = "0123456789!@#$%^&*";
        const scrambleDuration = 400; // 0.4s cyber scramble phase

        const updateValue = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            if (progress < scrambleDuration) {
                // Scramble phase
                setIsScrambling(true);
                const randomStr = Array.from({ length: finalNumber.toString().length }, () =>
                    scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
                ).join("");
                setDisplayValue(randomStr);
                animationFrame = requestAnimationFrame(updateValue);
            } else if (progress < duration * 1000) {
                // Counting phase
                setIsScrambling(false);
                const countProgress = (progress - scrambleDuration) / ((duration * 1000) - scrambleDuration);
                const easeOutQuart = 1 - Math.pow(1 - countProgress, 4);
                const currentNum = Math.floor(easeOutQuart * finalNumber);

                // Format with dots, e.g., 1.500.000
                setDisplayValue(currentNum.toLocaleString("id-ID"));
                animationFrame = requestAnimationFrame(updateValue);
            } else {
                // Complete
                setDisplayValue(finalNumber.toLocaleString("id-ID"));
            }
        };

        animationFrame = requestAnimationFrame(updateValue);

        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, finalNumber, duration]);

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {prefix} {displayValue}
        </motion.div>
    );
}
