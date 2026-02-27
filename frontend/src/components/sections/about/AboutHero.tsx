"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutHero() {
    const { t } = useLanguage();

    return (
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-32 pb-12">
            {/* Background */}
            <div className="absolute inset-0 bg-[#1A1A1A]" />

            {/* Rotating Globe Wireframe */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Radial glow */}
                <div className="absolute w-[400px] h-[400px] rounded-full bg-[#FF5722] opacity-[0.15] blur-[100px]" />

                <svg
                    viewBox="0 0 400 400"
                    className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] opacity-40 animate-globe-spin"
                    fill="none"
                    stroke="#333333"
                    strokeWidth="1"
                >
                    {/* Outer circle */}
                    <circle cx="200" cy="200" r="180" />
                    {/* Horizontal lines */}
                    <ellipse cx="200" cy="200" rx="180" ry="60" />
                    <ellipse cx="200" cy="200" rx="180" ry="120" />
                    <ellipse cx="200" cy="140" rx="140" ry="30" />
                    <ellipse cx="200" cy="260" rx="140" ry="30" />
                    {/* Vertical meridians */}
                    <ellipse cx="200" cy="200" rx="60" ry="180" />
                    <ellipse cx="200" cy="200" rx="120" ry="180" />
                    {/* Center meridian */}
                    <line x1="200" y1="20" x2="200" y2="380" />
                    <line x1="20" y1="200" x2="380" y2="200" />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-[900px]">
                <motion.h1
                    initial={{ filter: "blur(10px)", opacity: 0 }}
                    animate={{ filter: "blur(0px)", opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-display text-[40px] md:text-[56px] font-extrabold text-[#F5F5F5] leading-[1.2] mb-6"
                >
                    {t("Menjembatani Teknologi dengan Potensi Manusia.", "Bridging Technology with Human Potential.")}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="font-inter text-[18px] text-[#A3A3A3] max-w-[700px] mx-auto"
                >
                    {t(
                        "UpRev adalah mitra transformasi digital untuk bisnis modern. Kami membantu perusahaan dari berbagai industri—mulai dari retail, jasa, hingga korporasi—untuk mengotomatisasi pekerjaan manual menggunakan kecerdasan buatan (AI).",
                        "UpRev is a digital transformation partner for modern businesses. We help companies across industries—from retail, services, to corporations—automate manual work using artificial intelligence (AI)."
                    )}
                </motion.p>
            </div>
        </section>
    );
}
