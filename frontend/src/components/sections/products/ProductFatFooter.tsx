"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function ProductFatFooter() {
    const { t } = useLanguage();

    return (
        <section className="bg-[var(--color-carbon)] py-32 px-4 sm:px-6 relative overflow-hidden border-t border-[#333333]/30">
            {/* Background Grain/Noise */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />

            <div className="max-w-[800px] mx-auto text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-display text-[48px] md:text-[64px] font-bold text-[#F5F5F5] leading-tight mb-6"
                >
                    {t("Let's Scale Your Direct Bookings.", "Let's Scale Your Direct Bookings.")}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="font-inter text-[18px] text-[#A3A3A3] mb-12 max-w-[600px] mx-auto leading-relaxed"
                >
                    {t(
                        "UpRev hadir bukan sekadar sebagai penyedia perangkat lunak, melainkan mitra pertumbuhan yang benar-benar memecahkan masalah efisiensi operasional bisnis Anda.",
                        "UpRev is here not just as a software provider, but as a growth partner that truly solves your business's operational efficiency problems."
                    )}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <a
                        href="https://uprev.id/api/meet/schedule"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-[#FF5722] text-[#F5F5F5] font-inter font-semibold text-[16px] px-8 py-4 rounded-full hover:bg-[#E64A19] hover:-translate-y-1 transition-all duration-300 shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:shadow-[0_0_30px_rgba(255,87,34,0.5)] gap-2 group"
                    >
                        {t("Jadwalkan Konsultasi Gratis", "Schedule Free Consultation")}
                        <span className="group-hover:translate-x-1 transition-transform duration-300">➔</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
