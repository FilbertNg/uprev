"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function CareersHero() {
    const { t } = useLanguage();

    return (
        <section className="relative flex min-h-[50vh] flex-col items-center justify-center px-4 sm:px-6 py-32 bg-[var(--color-carbon)]">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-display text-[40px] md:text-[56px] font-extrabold text-[#F5F5F5] leading-[1.2] text-center mb-6"
            >
                {t("Tumbuh Bersama UpRev.", "Grow with UpRev.")}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="font-inter text-[18px] text-[#A3A3A3] text-center max-w-[600px]"
            >
                {t(
                    "Kami selalu mencari talenta brilian dan mitra strategis untuk bersama-sama membangun masa depan digital.",
                    "We're always looking for brilliant talent and strategic partners to build the digital future together."
                )}
            </motion.p>
        </section>
    );
}
