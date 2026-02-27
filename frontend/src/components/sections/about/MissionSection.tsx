"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingDown, TrendingUp } from "lucide-react";

export function MissionSection() {
    const { t } = useLanguage();

    return (
        <section className="py-16 px-4 sm:px-6 bg-[var(--color-carbon)]">
            <div className="mx-auto max-w-[800px] text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="font-inter text-[14px] font-semibold uppercase tracking-[3px] text-[#FF5722] mb-4">
                        Our Mission
                    </p>

                    <h2 className="font-display text-[28px] md:text-[36px] font-bold text-[#F5F5F5] leading-[1.3] mb-8">
                        {t(
                            "Membantu bisnis Anda memangkas biaya operasional sekaligus meningkatkan konversi penjualan secara signifikan.",
                            "Help your business cut operational costs while significantly increasing sales conversion."
                        )}
                    </h2>

                    {/* Two pillars */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex items-center gap-4 bg-[#222222] border border-[#333333] rounded-[16px] px-6 py-5 flex-1 max-w-[340px] mx-auto sm:mx-0"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FF5722]/10">
                                <TrendingDown className="h-6 w-6 text-[#FF5722]" />
                            </div>
                            <div className="text-left">
                                <p className="font-display text-[16px] font-bold text-[#F5F5F5]">Cost Efficiency</p>
                                <p className="font-inter text-[13px] text-[#A3A3A3]">
                                    {t("Otomatisasi cerdas yang memangkas biaya operasional", "Smart automation that cuts operational costs")}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex items-center gap-4 bg-[#222222] border border-[#333333] rounded-[16px] px-6 py-5 flex-1 max-w-[340px] mx-auto sm:mx-0"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FF5722]/10">
                                <TrendingUp className="h-6 w-6 text-[#FF5722]" />
                            </div>
                            <div className="text-left">
                                <p className="font-display text-[16px] font-bold text-[#F5F5F5]">Sales Conversion</p>
                                <p className="font-inter text-[13px] text-[#A3A3A3]">
                                    {t("Strategi digital terukur yang meningkatkan konversi", "Measurable digital strategy that boosts conversion")}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
