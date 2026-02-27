"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Target, Wallet, TrendingUp } from "lucide-react";

const cards = [
    {
        icon: Target,
        titleId: "Needs-Based Solution",
        titleEn: "Needs-Based Solution",
        descId: "Kami mendiagnosa masalah utama bisnis Anda, lalu memberikan solusi yang tepat.",
        descEn: "We diagnose the core problems of your business, then provide the right solution.",
    },
    {
        icon: Wallet,
        titleId: "Budget-Flexible Options",
        titleEn: "Budget-Flexible Options",
        descId: "Kami menyesuaikan teknologi dengan anggaran Anda.",
        descEn: "We tailor technology to your budget.",
    },
    {
        icon: TrendingUp,
        titleId: "Result-Oriented",
        titleEn: "Result-Oriented",
        descId: "Fokus kami adalah membuat website yang efektif menghasilkan penjualan dan sistem efisiensi operasional.",
        descEn: "Our focus is building websites that generate sales and systems that drive operational efficiency.",
    },
];

export function PhilosophyCards() {
    const { t } = useLanguage();

    return (
        <section className="pt-8 pb-32 px-4 sm:px-6 bg-[var(--color-carbon)]">
            <div className="mx-auto max-w-[1200px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                className="group relative overflow-hidden bg-[#222222] border border-[#333333] rounded-[24px] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#FF5722]/50 cursor-default"
                            >
                                {/* Glassy sheen on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                                    <div
                                        className="absolute w-[40px] h-[200%] bg-white/10 rotate-45 -translate-x-[200px] group-hover:translate-x-[400px] transition-transform duration-[400ms]"
                                    />
                                </div>

                                {/* Icon */}
                                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF5722]/10 mb-5 transition-colors duration-300 group-hover:bg-[#FF5722]/20">
                                    <Icon className="h-6 w-6 text-[#FF5722]" />
                                </div>

                                <h3 className="font-display text-[24px] font-bold text-[#F5F5F5] mb-4 relative z-10">
                                    {t(card.titleId, card.titleEn)}
                                </h3>
                                <p className="font-inter text-[16px] text-[#A3A3A3] relative z-10">
                                    {t(card.descId, card.descEn)}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
