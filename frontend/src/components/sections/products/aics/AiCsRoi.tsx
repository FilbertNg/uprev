"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2 } from "lucide-react";

export function AiCsRoi() {
    const { t } = useLanguage();

    return (
        <section className="py-24 px-4 sm:px-6 bg-[#111111] relative overflow-hidden border-y border-[#333333]/50">
            <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16">

                {/* Left side text */}
                <div className="lg:w-1/2">
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="font-display text-[36px] md:text-[48px] font-bold text-[#F5F5F5] leading-tight mb-6"
                    >
                        {t("Pemotongan Biaya Operasional Signifikan.", "Significant Operational Cost Cutting.")}
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-20 h-1 bg-[#FF5722] rounded-full"
                    />
                </div>

                {/* Right side bullet points */}
                <div className="lg:w-1/2 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex gap-4 items-start bg-[#1A1A1A] p-6 rounded-2xl border border-[#333333] shadow-lg"
                    >
                        <CheckCircle2 className="w-8 h-8 text-[#FF5722] shrink-0 mt-1" />
                        <div>
                            <h4 className="font-display text-[20px] font-bold text-[#F5F5F5] mb-2">Zero Extra Headcount</h4>
                            <p className="font-inter text-[#A3A3A3] leading-relaxed">
                                {t(
                                    "Menghilangkan kebutuhan rekrutmen, gaji bulanan, lembur, dan asuransi untuk tambahan staf CS shift malam.",
                                    "Eliminates the need for recruitment, monthly salaries, overtime, and insurance for additional night shift CS staff."
                                )}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex gap-4 items-start bg-[#1A1A1A] p-6 rounded-2xl border border-[#333333] shadow-lg"
                    >
                        <CheckCircle2 className="w-8 h-8 text-[#FF5722] shrink-0 mt-1" />
                        <div>
                            <h4 className="font-display text-[20px] font-bold text-[#F5F5F5] mb-2">Zero Human Error</h4>
                            <p className="font-inter text-[#A3A3A3] leading-relaxed">
                                {t(
                                    "Meniadakan kerugian akibat kesalahan input data atau miskomunikasi dengan pelanggan yang berujung pada komplain.",
                                    "Eliminates losses due to data input errors or miscommunication with customers leading to complaints."
                                )}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
