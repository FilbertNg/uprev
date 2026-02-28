"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users } from "lucide-react";

export function AiCsHumanControl() {
    const { t } = useLanguage();

    return (
        <section className="py-24 px-4 sm:px-6 bg-[var(--color-carbon)] relative overflow-hidden">
            <div className="max-w-[800px] mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-[#222222] border border-[#333333] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg"
                >
                    <Users className="w-8 h-8 text-[#FF5722]" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-display text-[32px] md:text-[40px] font-bold text-[#F5F5F5] leading-tight mb-6"
                >
                    {t(
                        "Manual Booking Routing & Human Handoff.",
                        "Manual Booking Routing & Human Handoff."
                    )}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="font-inter text-[18px] text-[#A3A3A3] leading-relaxed max-w-[650px] mx-auto"
                >
                    {t(
                        "Teknologi tidak menghilangkan sentuhan manusia. Staf Anda memiliki akses monitor untuk memantau percakapan secara live dan dapat langsung mengambil alih chat jika ada request khusus dari tamu VIP.",
                        "Technology doesn't eliminate the human touch. Your staff has monitor access to view conversations live and can instantly take over the chat for special requests from VIP guests."
                    )}
                </motion.p>
            </div>

            {/* Subtle background glow to emphasize the human element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FFFFFF] rounded-full blur-[150px] opacity-[0.03] pointer-events-none z-0" />
        </section>
    );
}
