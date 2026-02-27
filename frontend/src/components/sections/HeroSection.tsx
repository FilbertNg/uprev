"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { SpotlightGrid } from "../effects/SpotlightGrid";
import { useLanguage } from "@/contexts/LanguageContext";
import { openChatWithGreeting } from "@/lib/chatOpener";

export function HeroSection() {
    const { t } = useLanguage();

    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20 text-center px-4 sm:px-6">
            <SpotlightGrid />

            {/* Circuit Wireframe with Moving Data Pulses */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="circuit" width="600" height="600" patternUnits="userSpaceOnUse">
                            {/* Base Wireframe */}
                            <g className="text-[var(--color-smoke)]" opacity="0.15" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M 0 100 L 150 100 L 200 150 L 400 150 L 450 100 L 600 100" />
                                <path d="M 100 0 L 100 150 L 150 200 L 150 400 L 100 450 L 100 600" />
                                <path d="M 0 400 L 150 400 L 200 350 L 400 350 L 450 400 L 600 400" />
                                <path d="M 400 0 L 400 150 L 350 200 L 350 400 L 400 450 L 400 600" />
                                <circle cx="150" cy="100" r="4" />
                                <circle cx="450" cy="100" r="4" />
                                <circle cx="100" cy="150" r="4" />
                                <circle cx="400" cy="150" r="4" />
                                <circle cx="150" cy="400" r="4" />
                                <circle cx="450" cy="400" r="4" />
                                <circle cx="100" cy="450" r="4" />
                                <circle cx="400" cy="450" r="4" />
                            </g>

                            {/* Data Pulses */}
                            <motion.path
                                d="M 0 100 L 150 100 L 200 150 L 400 150 L 450 100 L 600 100"
                                fill="none" stroke="#FF5722" strokeWidth="1.5" opacity="0.6"
                                filter="url(#glow)"
                                strokeDasharray="25 900"
                                animate={{ strokeDashoffset: [925, 0] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.path
                                d="M 100 0 L 100 150 L 150 200 L 150 400 L 100 450 L 100 600"
                                fill="none" stroke="#FF5722" strokeWidth="1.5" opacity="0.5"
                                filter="url(#glow)"
                                strokeDasharray="15 800"
                                animate={{ strokeDashoffset: [815, 0] }}
                                transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 1 }}
                            />
                            <motion.path
                                d="M 600 400 L 450 400 L 400 350 L 200 350 L 150 400 L 0 400"
                                fill="none" stroke="#FF5722" strokeWidth="1.5" opacity="0.6"
                                filter="url(#glow)"
                                strokeDasharray="30 1100"
                                animate={{ strokeDashoffset: [1130, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2.5 }}
                            />
                        </pattern>

                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
            </div>

            <div className="z-10 flex max-w-[900px] flex-col items-center gap-6">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex items-center gap-2 rounded-full border border-[#FF5722]/30 bg-transparent px-3 py-1 text-[12px] font-bold text-[#FF5722] backdrop-blur-md"
                >
                    <Sparkles className="h-3 w-3" />
                    <span>{t("Mitra Transformasi Digital Anda", "Your Digital Transformation Partner")}</span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    className="font-display text-[48px] sm:text-[64px] font-extrabold leading-[1.1] tracking-tight"
                >
                    <span className="text-[#F5F5F5]">Revolutionize your business <br className="hidden sm:block" /> with </span>
                    <span className="bg-gradient-to-r from-[var(--color-tiger-flame)] to-[#FF8A65] bg-clip-text text-transparent">
                        AI.
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.h2
                    className="max-w-[700px] font-inter text-[18px] text-[#A3A3A3]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                >
                    {t(
                        "Automate Operations. Maximize Profits.",
                        "Automate Operations. Maximize Profits."
                    )}
                </motion.h2>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                    className="mt-4 flex flex-col gap-4 sm:flex-row relative z-20"
                >
                    <Button size="lg" className="group" onClick={() => window.open("https://demo1.uprev.id", "_blank")}>
                        {t("Coba Template Demo", "Try Demo Template")}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button size="lg" variant="secondary" className="group" onClick={() => openChatWithGreeting("Halo! Langkah yang tepat untuk mulai merevolusi bisnis Anda. 🚀\n\nJika Anda mengutamakan kecepatan, silakan amankan jadwal konsultasi langsung dengan tim kami melalui tautan ini:\nhttps://uprev.id/api/meet/schedule\n\nAtau, ceritakan sedikit tantangan operasional Anda di sini, dan saya akan buatkan analisa singkat untuk bahan diskusi kita nanti! ✨")}>
                        <Bot className="mr-2 h-5 w-5" />
                        {t("Mulai Konsultasi", "Start Consultation")}
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
