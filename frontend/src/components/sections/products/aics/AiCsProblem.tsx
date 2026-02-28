"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function AiCsProblem() {
    const { t } = useLanguage();

    return (
        <section className="py-32 px-4 sm:px-6 bg-[var(--color-carbon)] relative overflow-hidden">
            <div className="max-w-[800px] mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block mb-4"
                >
                    <span className="font-inter text-[14px] font-bold text-[#FF5722] tracking-[0.2em] relative before:absolute before:inset-0 before:bg-[#FF5722]/10 before:rounded-full before:-m-1 before:z-[-1]">
                        {t("THE 5-MINUTE RULE", "THE 5-MINUTE RULE")}
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-display text-[32px] md:text-[40px] font-bold text-[#F5F5F5] leading-tight mb-8"
                >
                    {t(
                        "Mengapa Anda Kehilangan Momentum Penjualan Setiap Hari?",
                        "Why Are You Losing Sales Momentum Every Single Day?"
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
                        "Calon pelanggan yang tidak mendapat balasan di bawah 5 menit memiliki rasio drop-off yang sangat tinggi. Keterlambatan respons staf karena human error atau di luar jam kerja sama dengan kehilangan pendapatan.",
                        "Prospective customers who do not receive a reply under 5 minutes have an extremely high drop-off ratio. Delayed staff responses due to human error or being outside working hours equals lost revenue."
                    )}
                </motion.p>
            </div>
        </section>
    );
}
