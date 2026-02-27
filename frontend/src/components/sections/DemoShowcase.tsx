"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useLanguage } from "@/contexts/LanguageContext";

export function DemoShowcase() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

    // 3D Tilt based on mouse
    const { x, y } = useMousePosition();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const winH = typeof window !== 'undefined' ? window.innerHeight : 0;
    const winW = typeof window !== 'undefined' ? window.innerWidth : 0;

    const rotateX = !isMounted || isMobile ? 0 : (y - winH / 2) * -0.005;
    const rotateY = !isMounted || isMobile ? 0 : (x - winW / 2) * 0.005;

    return (
        <section ref={containerRef} className="bg-[#111111] py-32 px-4 sm:px-6 relative overflow-hidden">
            <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-16 text-center">

                <h2 className="font-display text-[32px] md:text-[36px] font-extrabold text-[var(--color-smoke)]">
                    {t("Jangan hanya bayangkan. Rasakan performanya sekarang.", "Don't just imagine. Experience the performance right now.")}
                </h2>

                {/* Mockup Browser */}
                <motion.div
                    className="relative w-full rounded-[16px] border border-[var(--color-border-light)] bg-black shadow-[0_0_40px_rgba(255,87,34,0.15)] overflow-hidden"
                    style={{
                        y: yParallax,
                        rotateX: rotateX,
                        rotateY: rotateY,
                        transformPerspective: 1000
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 30 }}
                >
                    {/* Header */}
                    <div className="flex h-10 w-full items-center gap-2 bg-[#222222] px-4">
                        <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                        <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                        <div className="h-3 w-3 rounded-full bg-[#27C93F]" />
                        <div className="absolute left-1/2 -translate-x-1/2 rounded-md bg-black/40 px-4 py-1 text-xs text-[var(--color-muted)]">
                            demo1.uprev.id
                        </div>
                    </div>

                    {/* Video Placeholder */}
                    <div className="aspect-video w-full bg-[var(--color-carbon)] flex items-center justify-center relative overflow-hidden">
                        {/* Fake UI elements for placeholder demo */}
                        <div className="absolute left-10 top-10 flex flex-col gap-4 opacity-50">
                            <div className="h-4 w-32 rounded bg-[var(--color-border-light)]" />
                            <div className="h-8 w-64 rounded bg-[var(--color-surface)]" />
                            <div className="h-8 w-48 rounded bg-[var(--color-surface)]" />
                        </div>
                        <motion.div
                            animate={{ x: [0, 50, 0], y: [0, 20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="pointer-events-none absolute h-6 w-6 rounded-full bg-[var(--color-tiger-flame)]/50 blur-[2px]"
                        />
                        <span className="text-[var(--color-muted)] text-sm">Video Loop Placeholder</span>
                    </div>
                </motion.div>

                {/* CTA */}
                <Button
                    size="lg"
                    className="mt-8 px-8 py-4 bg-[var(--color-smoke)] text-[var(--color-carbon)] hover:bg-white flex items-center gap-2 group"
                    onClick={() => window.open("https://demo1.uprev.id", "_blank")}
                >
                    {t("Akses demo Langsung", "Access demo Directly")}
                    <motion.span
                        className="inline-block transition-transform group-hover:translate-x-2"
                    >
                        ➔
                    </motion.span>
                </Button>
            </div>
        </section>
    );
}
