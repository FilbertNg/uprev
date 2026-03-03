"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function ProductFatFooter() {
    const { t } = useLanguage();

    return (
        <section className="bg-tiger-flame py-24 px-4 sm:px-6 relative overflow-hidden border-t border-[#333333]/30">
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
                        className="group relative inline-flex items-center gap-3 bg-carbon hover:bg-black text-white px-8 py-5 rounded-full font-display font-bold text-[18px] transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:-translate-y-1"
                    >
                        {t("Jadwalkan Konsultasi Gratis", "Schedule Free Consultation")}
                        <span className="group-hover:translate-x-1 transition-transform duration-300">➔</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
