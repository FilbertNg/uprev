"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import createGlobe from "cobe";

export function GlobalBase() {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);

    const headingText = t("Base: Surabaya & Malaysia (Sepang)", "Base: Surabaya & Malaysia (Sepang)");

    useEffect(() => {
        let phi = 4.0; // Start rotated near Indonesia
        let width = 0;

        const onResize = () => {
            if (canvasRef.current) {
                width = canvasRef.current.offsetWidth;
                if (width === 0 && canvasRef.current.parentElement) {
                    width = canvasRef.current.parentElement.offsetWidth;
                }
            }
        };
        window.addEventListener("resize", onResize);
        onResize();
        setTimeout(onResize, 100); // Trigger again after layout paints

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: -0.1,
            dark: 1, // Dark mode
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [1, 1, 1],
            markerColor: [255 / 255, 87 / 255, 34 / 255], // #FF5722
            glowColor: [1.2, 1.2, 1.2],
            markers: [
                { location: [-7.2504, 112.7688], size: 0.1 }, // Surabaya
                { location: [2.7456, 101.6995], size: 0.1 }, // Sepang
            ],
            onRender: (state) => {
                // Auto-rotate if not interacting
                if (!pointerInteracting.current) {
                    phi += 0.003;
                }
                state.phi = phi + pointerInteractionMovement.current;
                state.width = width * 2;
                state.height = width * 2;
            },
        });

        return () => {
            globe.destroy();
            window.removeEventListener("resize", onResize);
        };
    }, []);

    // Paths for the data streams flowing into the globe
    const streamLines = [
        { id: 1, d: "M 0 100 Q 150 200 250 250", delay: 0 },
        { id: 2, d: "M 600 150 Q 450 250 350 300", delay: 0.6 },
        { id: 3, d: "M 100 600 Q 200 450 280 400", delay: 1.2 },
        { id: 4, d: "M 550 550 Q 400 450 350 350", delay: 1.8 },
        { id: 5, d: "M 300 0 Q 350 150 310 200", delay: 0.3 },
        { id: 6, d: "M 0 400 Q 150 350 220 320", delay: 1.5 },
    ];

    return (
        <section className="pt-8 pb-32 px-4 sm:px-6 bg-[var(--color-carbon)] relative overflow-hidden">
            <div className="mx-auto max-w-[700px] text-center">
                {/* Animated Heading */}
                <div className="mb-12 relative z-10">
                    <h3 className="font-display text-[24px] font-bold text-[#F5F5F5] flex justify-center gap-[6px] flex-wrap">
                        {headingText.split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                                className="inline-block"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h3>
                </div>

                {/* Globe container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative mx-auto flex items-center justify-center w-full max-w-[600px] aspect-square"
                >
                    {/* SVG Interconnection Wires / Data Streams */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
                        viewBox="0 0 600 600"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        {/* Glow sitting behind the globe to simulate energy core */}
                        <defs>
                            <radialGradient id="globe-glow-core" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#FF5722" stopOpacity="0.15" />
                                <stop offset="60%" stopColor="#FF5722" stopOpacity="0.05" />
                                <stop offset="100%" stopColor="#FF5722" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="tail-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FF5722" stopOpacity="0" />
                                <stop offset="100%" stopColor="#FF5722" stopOpacity="1" />
                            </linearGradient>
                        </defs>
                        <circle cx="300" cy="300" r="240" fill="url(#globe-glow-core)" />

                        {streamLines.map((line) => (
                            <g key={line.id}>
                                {/* Faint permanent wire track */}
                                <path d={line.d} fill="none" stroke="#333333" strokeWidth="1" opacity="0.4" />
                                {/* Bright pulsing tail flowing along the line */}
                                <motion.path
                                    d={line.d}
                                    fill="none"
                                    stroke="url(#tail-gradient)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                                    animate={{
                                        pathLength: [0, 0.2, 0.2, 0],
                                        pathOffset: [0, 0, 0.8, 1],
                                        opacity: [0, 1, 1, 0]
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        delay: line.delay,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </g>
                        ))}
                    </svg>

                    <canvas
                        ref={canvasRef}
                        className="w-full h-full cursor-grab active:cursor-grabbing opacity-90 transition-opacity duration-1000 hover:opacity-100 relative z-10"
                        style={{ width: '100%', height: '100%', aspectRatio: '1 / 1' }}
                        onPointerDown={(e) => {
                            pointerInteracting.current = e.clientX;
                            if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
                        }}
                        onPointerUp={() => {
                            pointerInteracting.current = null;
                            if (canvasRef.current) canvasRef.current.style.cursor = "grab";
                        }}
                        onPointerOut={() => {
                            pointerInteracting.current = null;
                            if (canvasRef.current) canvasRef.current.style.cursor = "grab";
                        }}
                        onMouseMove={(e) => {
                            if (pointerInteracting.current !== null) {
                                const delta = e.clientX - pointerInteracting.current;
                                pointerInteractionMovement.current = delta * 0.01;
                            }
                        }}
                        onTouchMove={(e) => {
                            if (pointerInteracting.current !== null && e.touches[0]) {
                                const delta = e.touches[0].clientX - pointerInteracting.current;
                                pointerInteractionMovement.current = delta * 0.01;
                            }
                        }}
                    />

                    {/* Gradient Overlay for blending into background */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[var(--color-carbon)] pointer-events-none z-20" />

                    {/* Floating Labels (absolutely positioned over the globe) */}
                    <div className="absolute top-[18%] left-[8%] md:left-[5%] bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#333333] px-4 py-2 rounded-full flex items-center gap-3 animate-bounce-slow z-30">
                        <div className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5722] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF5722]"></span>
                        </div>
                        <span className="font-inter text-[14px] font-semibold text-[#F5F5F5]">Sepang, MY</span>
                    </div>

                    <div className="absolute bottom-[18%] right-[8%] md:right-[5%] bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#333333] px-4 py-2 rounded-full flex items-center gap-3 animate-bounce-slow z-30" style={{ animationDelay: "1s" }}>
                        <div className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5722] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF5722]"></span>
                        </div>
                        <span className="font-inter text-[14px] font-semibold text-[#F5F5F5]">Surabaya, ID</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
