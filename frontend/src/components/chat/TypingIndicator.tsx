"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
    return (
        <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-none border border-[var(--color-border-light)] bg-[#222222] px-4 py-3">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="h-2 w-2 rounded-full bg-[var(--color-muted)]"
                    animate={{
                        y: [0, -4, 0],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
