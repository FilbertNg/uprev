"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function TeamHero() {
    const { t } = useLanguage();
    const text = t("Arsitek di Balik Transformasi Anda.", "The Architects Behind Your Transformation.");

    return (
        <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-32 pb-32 bg-[var(--color-carbon)]">
            <h1 className="font-display text-[40px] md:text-[56px] font-extrabold text-[#F5F5F5] leading-[1.2] text-center">
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.03, ease: "easeOut" }}
                        className="inline-block"
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </h1>
        </section>
    );
}
